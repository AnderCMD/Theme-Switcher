import { inject, onScopeDispose, reactive, readonly } from 'vue';
import { ThemeController } from '../core/theme-controller';
import type { ThemeControllerOptions, ThemePreference } from '../core/types';
import { THEME_CONTROLLER_INJECTION_KEY } from './theme-provider';

export interface UseThemeResult {
  /** Reactive object with `theme` (resolved) and `preference` (raw). */
  state: { readonly theme: 'light' | 'dark'; readonly preference: ThemePreference };
  setTheme: (preference: ThemePreference) => void;
  toggleTheme: () => void;
  controller: ThemeController;
}

/**
 * Vue 3 composable exposing the current theme and helpers to change it.
 *
 * If called within a subtree that used `provideTheme()` / `<ThemeProvider>`,
 * reuses that shared controller. Otherwise lazily creates its own,
 * disposed automatically via `onScopeDispose`.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTheme } from 'theme-switcher-ts/vue';
 * const { state, toggleTheme } = useTheme();
 * </script>
 * <template>
 *   <button @click="toggleTheme">Current: {{ state.theme }}</button>
 * </template>
 * ```
 */
export function useTheme(options?: ThemeControllerOptions): UseThemeResult {
  const injected = inject<ThemeController | null>(THEME_CONTROLLER_INJECTION_KEY, null);
  const controller = injected ?? new ThemeController(options);
  const owned = !injected;

  const state = reactive({
    theme: controller.getResolvedTheme(),
    preference: controller.getPreference(),
  });

  const unsubscribe = controller.subscribe((next) => {
    state.theme = next.resolved;
    state.preference = next.preference;
  });

  onScopeDispose(() => {
    unsubscribe();
    if (owned) controller.destroy();
  });

  return {
    state: readonly(state) as UseThemeResult['state'],
    setTheme: (preference) => controller.setPreference(preference),
    toggleTheme: () => controller.toggle(),
    controller,
  };
}
