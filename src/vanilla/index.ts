import { ThemeController } from '../core/theme-controller';
import type { ThemeControllerOptions, ThemeSwitchVariant } from '../core/types';
import { VARIANTS } from '../variants';

export { ThemeController } from '../core/theme-controller';
export * from '../core/types';

export interface MountThemeSwitchOptions extends ThemeControllerOptions {
  /** Which of the 10 built-in designs to render. @default 'classic-sky' */
  variant?: ThemeSwitchVariant;
  /** Accessible label for the checkbox input. @default 'Toggle dark mode' */
  ariaLabel?: string;
  /** Reuse an existing controller instead of creating a new one. */
  controller?: ThemeController;
  /** id applied to the checkbox input (and referenced by the label's `for`). */
  id?: string;
}

export interface ThemeSwitchHandle {
  /** The mounted `<label>` root element. */
  element: HTMLLabelElement;
  /** The underlying `<input type="checkbox">`. */
  input: HTMLInputElement;
  /** The `ThemeController` instance driving this switch. */
  controller: ThemeController;
  /** Unmounts the switch and removes all listeners. */
  destroy: () => void;
}

let autoId = 0;

/**
 * Mounts a fully-functional, accessible dark-mode toggle switch into
 * `container` using one of the 10 built-in variants, with zero required
 * configuration and no framework dependency.
 *
 * @example
 * ```ts
 * import { mountThemeSwitch } from 'theme-switcher-ts/vanilla';
 * import 'theme-switcher-ts/styles/classic-sky.css';
 *
 * mountThemeSwitch(document.getElementById('theme-switch')!);
 * ```
 */
export function mountThemeSwitch(
  container: HTMLElement,
  options: MountThemeSwitchOptions = {},
): ThemeSwitchHandle {
  const {
    variant = 'classic-sky',
    ariaLabel = 'Toggle dark mode',
    controller,
    id,
    ...controllerOptions
  } = options;
  const definition = VARIANTS[variant];
  const themeController = controller ?? new ThemeController(controllerOptions);
  const inputId = id ?? `theme-switch-${(autoId += 1)}`;

  const label = document.createElement('label');
  label.className = `theme-switch theme-switch--${variant}`;
  label.setAttribute('for', inputId);

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'theme-switch__checkbox';
  input.id = inputId;
  input.setAttribute('aria-label', ariaLabel);
  input.checked = themeController.getResolvedTheme() === 'dark';

  const visual = document.createElement('div');
  visual.className = 'theme-switch__visual';
  visual.innerHTML = definition.markup;

  label.appendChild(input);
  label.appendChild(visual);
  container.appendChild(label);

  const handleChange = (): void => themeController.toggle();
  input.addEventListener('change', handleChange);

  const unsubscribe = themeController.subscribe((state) => {
    input.checked = state.resolved === 'dark';
  });

  return {
    element: label,
    input,
    controller: themeController,
    destroy: () => {
      input.removeEventListener('change', handleChange);
      unsubscribe();
      label.remove();
      if (!controller) themeController.destroy();
    },
  };
}
