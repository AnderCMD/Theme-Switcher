import React, { createContext, useContext, useEffect, useRef } from 'react';
import { ThemeController } from '../core/theme-controller';
import type { ThemeControllerOptions } from '../core/types';

export const ThemeControllerContext = createContext<ThemeController | null>(null);

export interface ThemeProviderProps extends ThemeControllerOptions {
  children: React.ReactNode;
}

/**
 * Optional provider that creates a single `ThemeController` shared by every
 * `useTheme()` / `<ThemeSwitch>` in its subtree. Wrap your app with it once
 * if you have multiple toggles that must stay perfectly in sync (they stay
 * in sync across tabs and components even without this, via `localStorage`
 * and the `storage` event — this just avoids creating N controllers).
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultPreference="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...options }: ThemeProviderProps): React.JSX.Element {
  const controllerRef = useRef<ThemeController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new ThemeController(options);
  }

  useEffect(() => {
    const controller = controllerRef.current;
    return () => controller?.destroy();
  }, []);

  return (
    <ThemeControllerContext.Provider value={controllerRef.current}>
      {children}
    </ThemeControllerContext.Provider>
  );
}

/** Returns the shared controller from the nearest `<ThemeProvider>`, or `null`. */
export function useThemeContext(): ThemeController | null {
  return useContext(ThemeControllerContext);
}
