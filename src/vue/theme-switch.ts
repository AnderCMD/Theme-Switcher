import { defineComponent, h, type PropType } from 'vue';
import type { ThemeSwitchVariant } from '../core/types';
import { VARIANTS } from '../variants';
import { useTheme } from './use-theme';

let autoId = 0;

/**
 * Ready-to-use dark/light toggle switch for Vue 3. Renders one of the 10
 * built-in variants and wires it to `useTheme()` internally.
 *
 * ```vue
 * <script setup>
 * import '@andercmd/theme-switcher/styles/classic-sky.css';
 * import { ThemeSwitch } from '@andercmd/theme-switcher/vue';
 * </script>
 * <template>
 *   <ThemeSwitch variant="classic-sky" />
 * </template>
 * ```
 *
 * The decorative markup for each variant is static content authored by
 * this library (never user-supplied) and is rendered via the DOM
 * `innerHTML` prop so a single source of truth can be shared with the
 * vanilla/React adapters.
 */
export const ThemeSwitch = defineComponent({
  name: 'ThemeSwitch',
  props: {
    variant: { type: String as PropType<ThemeSwitchVariant>, default: 'classic-sky' },
    ariaLabel: { type: String, default: 'Toggle dark mode' },
  },
  setup(props) {
    const { state, toggleTheme } = useTheme();
    const id = `theme-switch-${(autoId += 1)}`;

    return () => {
      const definition = VARIANTS[props.variant];
      return h('label', { for: id, class: ['theme-switch', `theme-switch--${props.variant}`] }, [
        h('input', {
          type: 'checkbox',
          id,
          class: 'theme-switch__checkbox',
          'aria-label': props.ariaLabel,
          checked: state.theme === 'dark',
          onChange: toggleTheme,
        }),
        h('div', { class: 'theme-switch__visual', innerHTML: definition.markup }),
      ]);
    };
  },
});
