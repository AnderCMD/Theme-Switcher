import { defineComponent, onScopeDispose, provide, type InjectionKey, type PropType } from 'vue';
import { ThemeController } from '../core/theme-controller';
import type { ThemeControllerOptions } from '../core/types';

export const THEME_CONTROLLER_INJECTION_KEY: InjectionKey<ThemeController> = Symbol(
  'theme-switcher:controller',
);

/**
 * Optional provider component that creates a single `ThemeController`
 * shared by every `useTheme()` / `<ThemeSwitch>` in its default slot.
 *
 * @example
 * ```vue
 * <ThemeProvider default-preference="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = defineComponent({
  name: 'ThemeProvider',
  props: {
    storageKey: String,
    darkClassName: { type: String as PropType<string | null>, default: undefined },
    lightClassName: { type: String as PropType<string | null>, default: undefined },
    attribute: { type: String as PropType<string | null>, default: undefined },
    defaultPreference: String as PropType<ThemeControllerOptions['defaultPreference']>,
    disablePersistence: Boolean,
    disableSystemPreference: Boolean,
    disableCrossTabSync: Boolean,
    suppressTransitionOnChange: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    const controller = new ThemeController(props as ThemeControllerOptions);
    provide(THEME_CONTROLLER_INJECTION_KEY, controller);
    onScopeDispose(() => controller.destroy());
    return () => (slots.default ? slots.default() : null);
  },
});

/** Imperatively provide a controller from within `setup()`, as an alternative to `<ThemeProvider>`. */
export function provideTheme(options?: ThemeControllerOptions): ThemeController {
  const controller = new ThemeController(options);
  provide(THEME_CONTROLLER_INJECTION_KEY, controller);
  onScopeDispose(() => controller.destroy());
  return controller;
}
