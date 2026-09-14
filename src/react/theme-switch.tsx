import React, { useId } from 'react';
import type { ThemeSwitchVariant } from '../core/types';
import { VARIANTS } from '../variants';
import { useTheme } from './use-theme';

export interface ThemeSwitchProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Which of the 10 built-in designs to render. @default 'classic-sky' */
  variant?: ThemeSwitchVariant;
  /** Accessible label for the checkbox input. @default 'Toggle dark mode' */
  ariaLabel?: string;
}

/**
 * Ready-to-use dark/light toggle switch. Renders one of the 10 built-in
 * variants and wires it to `useTheme()` internally — no state management
 * required on your end. Import the matching stylesheet once (globally):
 *
 * ```tsx
 * import 'theme-switcher-ts/styles/classic-sky.css';
 * import { ThemeSwitch } from 'theme-switcher-ts/react';
 *
 * <ThemeSwitch variant="classic-sky" />
 * ```
 *
 * The decorative markup for each variant (icons, clouds, track, etc.) is
 * static content authored by this library — no user-supplied data is ever
 * interpolated into it — rendered via `dangerouslySetInnerHTML` purely to
 * share a single source of truth across the vanilla/React/Vue adapters.
 */
export function ThemeSwitch({
  variant = 'classic-sky',
  ariaLabel = 'Toggle dark mode',
  className,
  ...labelProps
}: ThemeSwitchProps): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const id = useId();
  const definition = VARIANTS[variant];

  return (
    <label
      {...labelProps}
      htmlFor={id}
      className={['theme-switch', `theme-switch--${variant}`, className].filter(Boolean).join(' ')}
    >
      <input
        type="checkbox"
        id={id}
        className="theme-switch__checkbox"
        aria-label={ariaLabel}
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <div
        className="theme-switch__visual"
        dangerouslySetInnerHTML={{ __html: definition.markup }}
      />
    </label>
  );
}
