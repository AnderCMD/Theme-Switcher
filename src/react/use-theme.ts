import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ThemeController } from '../core/theme-controller';
import type { ResolvedTheme, ThemeControllerOptions, ThemePreference } from '../core/types';
import { ThemeControllerContext } from './theme-provider';

export interface UseThemeResult {
  /** The concrete theme currently applied to the DOM. */
  theme: ResolvedTheme;
  /** The raw preference: 'light' | 'dark' | 'system'. */
  preference: ThemePreference;
  /** Sets an explicit preference. */
  setTheme: (preference: ThemePreference) => void;
  /** Flips between 'light' and 'dark'. */
  toggleTheme: () => void;
  /** The underlying framework-agnostic controller, for advanced use cases. */
  controller: ThemeController;
}

/**
 * React hook exposing the current theme and helpers to change it.
 *
 * If used inside a `<ThemeProvider>`, all `useTheme()` calls in the tree
 * share a single `ThemeController` instance. Otherwise, this hook lazily
 * creates its own controller scoped to the component that calls it.
 *
 * @example
 * ```tsx
 * function MyToggle() {
 *   const { theme, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>Current: {theme}</button>;
 * }
 * ```
 */
export function useTheme(options?: ThemeControllerOptions): UseThemeResult {
  const providedController = useContext(ThemeControllerContext);
  const ownControllerRef = useRef<ThemeController | null>(null);
  if (!providedController && !ownControllerRef.current) {
    ownControllerRef.current = new ThemeController(options);
  }
  const controller = providedController ?? (ownControllerRef.current as ThemeController);

  const [state, setState] = useState(() => controller.getState());

  useEffect(() => {
    setState(controller.getState());
    return controller.subscribe(setState);
  }, [controller]);

  useEffect(
    () => () => {
      // Only tear down controllers this hook created itself; a controller
      // coming from context is owned (and disposed) by its provider.
      if (!providedController) ownControllerRef.current?.destroy();
    },
    [providedController],
  );

  const setTheme = useCallback(
    (preference: ThemePreference) => controller.setPreference(preference),
    [controller],
  );
  const toggleTheme = useCallback(() => controller.toggle(), [controller]);

  return {
    theme: state.resolved,
    preference: state.preference,
    setTheme,
    toggleTheme,
    controller,
  };
}
