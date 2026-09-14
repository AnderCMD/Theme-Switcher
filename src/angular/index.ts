import {
  DestroyRef,
  InjectionToken,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  signal,
  type EnvironmentProviders,
  type Signal,
} from '@angular/core';
import { ThemeController } from '../core/theme-controller';
import type { ResolvedTheme, ThemeControllerOptions, ThemePreference } from '../core/types';

/**
 * DI token for the shared `ThemeController`. Register it once with
 * `provideThemeSwitcher()` in your app config, then read it anywhere with
 * `injectTheme()` or `inject(THEME_CONTROLLER)` directly.
 *
 * This package intentionally ships **no** `@Component`/`@Directive` classes:
 * Angular libraries built from plain TypeScript (rather than compiled with
 * ng-packagr's Ivy partial compiler) cannot safely ship decorated
 * components — only plain classes, functions, and injection tokens, which
 * is exactly what this module is built from. Compose the tiny amount of
 * template markup yourself; see the Angular section of the README for a
 * complete `ThemeSwitchComponent` you can paste directly into your app.
 */
export const THEME_CONTROLLER = new InjectionToken<ThemeController>('THEME_CONTROLLER');

/**
 * Registers a single, app-wide `ThemeController` for `THEME_CONTROLLER`.
 * Add it to your `ApplicationConfig.providers` (or `bootstrapApplication`'s
 * providers array).
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { provideThemeSwitcher } from 'theme-switcher-ts/angular';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideThemeSwitcher({ defaultPreference: 'system' })],
 * };
 * ```
 */
export function provideThemeSwitcher(options?: ThemeControllerOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: THEME_CONTROLLER,
      useFactory: () => new ThemeController(options),
    },
  ]);
}

export interface InjectedTheme {
  /** Reactive signal with the theme currently applied to the DOM. */
  theme: Signal<ResolvedTheme>;
  /** Reactive signal with the raw preference ('light' | 'dark' | 'system'). */
  preference: Signal<ThemePreference>;
  setTheme: (preference: ThemePreference) => void;
  toggleTheme: () => void;
  controller: ThemeController;
}

/**
 * Functional injection helper exposing the current theme as Angular
 * signals. Must be called from an injection context — a component/
 * directive field initializer or constructor, same rules as `inject()`.
 *
 * @example
 * ```ts
 * @Component({ ... })
 * export class HeaderComponent {
 *   protected readonly theme = injectTheme();
 * }
 * ```
 * ```html
 * <button (click)="theme.toggleTheme()">{{ theme.theme() }}</button>
 * ```
 */
export function injectTheme(): InjectedTheme {
  const controller = inject(THEME_CONTROLLER, { optional: true }) ?? new ThemeController();
  if (isDevMode() && !inject(THEME_CONTROLLER, { optional: true })) {
    // eslint-disable-next-line no-console
    console.warn(
      '[theme-switcher] No THEME_CONTROLLER provider found — falling back to a ' +
        "component-local ThemeController. Add provideThemeSwitcher() to your app's " +
        'providers to share one instance across the whole app.',
    );
  }

  const theme = signal<ResolvedTheme>(controller.getResolvedTheme());
  const preference = signal<ThemePreference>(controller.getPreference());

  const unsubscribe = controller.subscribe((state) => {
    theme.set(state.resolved);
    preference.set(state.preference);
  });

  inject(DestroyRef).onDestroy(unsubscribe);

  return {
    theme: theme.asReadonly(),
    preference: preference.asReadonly(),
    setTheme: (next) => controller.setPreference(next),
    toggleTheme: () => controller.toggle(),
    controller,
  };
}

export { ThemeController } from '../core/theme-controller';
export * from '../core/types';
export { VARIANTS, VARIANT_IDS } from '../variants';
export type { VariantDefinition } from '../variants';
