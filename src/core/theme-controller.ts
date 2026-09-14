import {
  DEFAULT_ATTRIBUTE,
  DEFAULT_DARK_CLASS,
  DEFAULT_STORAGE_KEY,
  MEDIA_QUERY_DARK,
  NO_TRANSITION_CLASS,
} from './constants';
import type {
  ResolvedTheme,
  ThemeChangeListener,
  ThemeControllerOptions,
  ThemePreference,
  ThemeState,
  Unsubscribe,
} from './types';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

function isResolvedTheme(value: unknown): value is ResolvedTheme {
  return value === 'light' || value === 'dark';
}

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || isResolvedTheme(value);
}

/**
 * Framework-agnostic engine that owns theme state: it resolves the
 * effective 'light' | 'dark' theme from a user preference (which may be
 * 'system'), applies it to the DOM, persists it, and keeps everything in
 * sync across tabs and OS-level preference changes.
 *
 * This class has no dependency on React, Vue, or any other framework —
 * it works with plain `addEventListener`/DOM APIs so it can run anywhere
 * (including being wrapped by framework-specific adapters).
 *
 * @example
 * ```ts
 * const controller = new ThemeController();
 * controller.subscribe((state) => console.log(state.resolved));
 * controller.toggle();
 * ```
 */
export class ThemeController {
  private readonly options: Required<Omit<ThemeControllerOptions, 'target'>> & {
    target: HTMLElement | null;
  };

  private preference: ThemePreference;
  private resolved: ResolvedTheme;
  private readonly listeners = new Set<ThemeChangeListener>();
  private mediaQuery: MediaQueryList | null = null;
  private readonly handleMediaChange = (event: MediaQueryListEvent): void => {
    if (this.preference === 'system') {
      this.applyResolved(event.matches ? 'dark' : 'light');
    }
  };
  private readonly handleStorageEvent = (event: StorageEvent): void => {
    if (event.key !== this.options.storageKey || event.newValue === null) return;
    if (isThemePreference(event.newValue)) {
      this.setPreference(event.newValue, { persist: false, broadcast: false });
    }
  };

  constructor(options: ThemeControllerOptions = {}) {
    this.options = {
      storageKey: options.storageKey ?? DEFAULT_STORAGE_KEY,
      target: options.target ?? (isBrowser ? document.documentElement : null),
      darkClassName:
        options.darkClassName === undefined ? DEFAULT_DARK_CLASS : options.darkClassName,
      lightClassName: options.lightClassName ?? null,
      attribute: options.attribute === undefined ? DEFAULT_ATTRIBUTE : options.attribute,
      defaultPreference: options.defaultPreference ?? 'system',
      disablePersistence: options.disablePersistence ?? false,
      disableSystemPreference: options.disableSystemPreference ?? false,
      disableCrossTabSync: options.disableCrossTabSync ?? false,
      suppressTransitionOnChange: options.suppressTransitionOnChange ?? true,
    };

    this.preference = this.readInitialPreference();
    this.resolved = this.resolve(this.preference);

    if (isBrowser) {
      this.applyToDom(this.resolved);

      if (!this.options.disableSystemPreference && window.matchMedia) {
        this.mediaQuery = window.matchMedia(MEDIA_QUERY_DARK);
        this.mediaQuery.addEventListener('change', this.handleMediaChange);
      }

      if (!this.options.disableCrossTabSync) {
        window.addEventListener('storage', this.handleStorageEvent);
      }
    }
  }

  /** The raw preference: 'light' | 'dark' | 'system'. */
  getPreference(): ThemePreference {
    return this.preference;
  }

  /** The concrete theme currently applied to the DOM. */
  getResolvedTheme(): ResolvedTheme {
    return this.resolved;
  }

  /** Full state snapshot, handy for logging or hydration. */
  getState(): ThemeState {
    return { preference: this.preference, resolved: this.resolved };
  }

  /**
   * Sets an explicit preference ('light', 'dark', or 'system') and applies
   * it immediately.
   */
  setPreference(
    preference: ThemePreference,
    internalOptions: { persist?: boolean; broadcast?: boolean } = {},
  ): void {
    const { persist = true, broadcast = true } = internalOptions;
    this.preference = preference;
    if (persist && !this.options.disablePersistence && isBrowser) {
      try {
        window.localStorage.setItem(this.options.storageKey, preference);
      } catch {
        // Storage can throw in private-browsing / quota-exceeded scenarios.
        // Theming still works in-memory for the current page load.
      }
    }
    this.applyResolved(this.resolve(preference), broadcast);
  }

  /** Convenience for `setPreference('dark')`. */
  setDark(): void {
    this.setPreference('dark');
  }

  /** Convenience for `setPreference('light')`. */
  setLight(): void {
    this.setPreference('light');
  }

  /** Convenience for `setPreference('system')`. */
  useSystemPreference(): void {
    this.setPreference('system');
  }

  /** Flips between 'light' and 'dark'. If currently 'system', resolves first. */
  toggle(): void {
    this.setPreference(this.resolved === 'dark' ? 'light' : 'dark');
  }

  /**
   * Registers a listener invoked on every theme change. Returns an
   * unsubscribe function. The listener is NOT called immediately with the
   * current state — read `getState()` for that.
   */
  subscribe(listener: ThemeChangeListener): Unsubscribe {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Removes all listeners and DOM/media/storage event bindings. */
  destroy(): void {
    this.listeners.clear();
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.handleMediaChange);
      this.mediaQuery = null;
    }
    if (isBrowser) {
      window.removeEventListener('storage', this.handleStorageEvent);
    }
  }

  private readInitialPreference(): ThemePreference {
    if (isBrowser && !this.options.disablePersistence) {
      try {
        const stored = window.localStorage.getItem(this.options.storageKey);
        if (isThemePreference(stored)) return stored;
      } catch {
        // Ignore inaccessible storage and fall through to the default.
      }
    }
    return this.options.defaultPreference;
  }

  private resolve(preference: ThemePreference): ResolvedTheme {
    if (preference !== 'system') return preference;
    if (!isBrowser || this.options.disableSystemPreference || !window.matchMedia) {
      return 'light';
    }
    return window.matchMedia(MEDIA_QUERY_DARK).matches ? 'dark' : 'light';
  }

  private applyResolved(resolved: ResolvedTheme, broadcast = true): void {
    const changed = resolved !== this.resolved;
    this.resolved = resolved;
    this.applyToDom(resolved);
    if (changed && broadcast) {
      const state = this.getState();
      this.listeners.forEach((listener) => listener(state));
    }
  }

  private applyToDom(resolved: ResolvedTheme): void {
    const { target, darkClassName, lightClassName, attribute, suppressTransitionOnChange } =
      this.options;
    if (!target) return;

    const withoutTransitions = (work: () => void): void => {
      if (!suppressTransitionOnChange || !isBrowser) {
        work();
        return;
      }
      target.classList.add(NO_TRANSITION_CLASS);
      work();
      // Force a reflow so the class removal happens on the next frame,
      // after the browser has painted the new (transition-less) styles.
      window.getComputedStyle(target).getPropertyValue('opacity');
      requestAnimationFrame(() => target.classList.remove(NO_TRANSITION_CLASS));
    };

    withoutTransitions(() => {
      if (darkClassName) target.classList.toggle(darkClassName, resolved === 'dark');
      if (lightClassName) target.classList.toggle(lightClassName, resolved === 'light');
      if (attribute) target.setAttribute(attribute, resolved);
    });
  }
}
