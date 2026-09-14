/**
 * A resolved, applicable theme. This is always either 'light' or 'dark' —
 * never 'system' — because 'system' is resolved to one of these before it
 * is ever applied to the DOM.
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * A theme preference as chosen by the user. 'system' means "follow the
 * operating system / browser preference" via `prefers-color-scheme`.
 */
export type ThemePreference = ResolvedTheme | 'system';

/** One of the 10 built-in visual designs shipped with this package. */
export type ThemeSwitchVariant =
  | 'classic-sky'
  | 'minimal-pill'
  | 'macos'
  | 'neumorphic'
  | 'glassmorphism'
  | 'retro-led'
  | 'gradient-orb'
  | 'icon-button'
  | 'terminal'
  | 'line';

/** Snapshot of the controller's state, passed to listeners. */
export interface ThemeState {
  /** The raw preference the user (or default) selected: 'light' | 'dark' | 'system'. */
  preference: ThemePreference;
  /** The concrete theme actually applied to the DOM right now. */
  resolved: ResolvedTheme;
}

/** A listener invoked whenever the resolved theme (or preference) changes. */
export type ThemeChangeListener = (state: ThemeState) => void;

/** Unsubscribe function returned by `subscribe`. */
export type Unsubscribe = () => void;

export interface ThemeControllerOptions {
  /**
   * Key used to persist the user's preference in `localStorage`.
   * @default 'theme-switcher:theme'
   */
  storageKey?: string;
  /**
   * The DOM element that receives the theme class/attribute.
   * Defaults to `document.documentElement` (the `<html>` tag), which is
   * also what Tailwind CSS's `darkMode: 'class'` strategy expects.
   */
  target?: HTMLElement;
  /**
   * CSS class applied to `target` when the resolved theme is 'dark'.
   * Set to `null` to disable class-based theming entirely.
   * @default 'dark'
   */
  darkClassName?: string | null;
  /**
   * CSS class applied to `target` when the resolved theme is 'light'.
   * Set to `null` (the default) to omit a light class — most designs
   * (including Tailwind's) only need a single `dark` class and treat the
   * absence of it as light.
   * @default null
   */
  lightClassName?: string | null;
  /**
   * When set, also mirrors the resolved theme into a `data-*` attribute
   * (e.g. `data-theme="dark"`) on `target`. Useful for plain CSS that
   * selects on `[data-theme="dark"]` instead of a class.
   * @default 'data-theme'
   */
  attribute?: string | null;
  /**
   * Default preference to use the very first time a visitor arrives, i.e.
   * when nothing is stored in `localStorage` yet.
   * @default 'system'
   */
  defaultPreference?: ThemePreference;
  /**
   * Disable reading/writing `localStorage`. Useful for private/incognito
   * contexts or when you want to manage persistence yourself.
   * @default false
   */
  disablePersistence?: boolean;
  /**
   * Disable following `prefers-color-scheme` changes when the preference
   * is (or becomes) 'system'.
   * @default false
   */
  disableSystemPreference?: boolean;
  /**
   * Disable synchronizing the theme across browser tabs/windows via the
   * `storage` event.
   * @default false
   */
  disableCrossTabSync?: boolean;
  /**
   * Briefly disable CSS transitions on the whole document while the theme
   * is applied, to avoid a "flash" of animated colors on every element.
   * Adds/removes a `.theme-switcher-no-transition` class on `target`.
   * @default true
   */
  suppressTransitionOnChange?: boolean;
}
