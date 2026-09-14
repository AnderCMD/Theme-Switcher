import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeController } from '../src/core/theme-controller';

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
});

describe('ThemeController', () => {
  it('defaults to system preference and resolves it via matchMedia', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);

    const controller = new ThemeController();
    expect(controller.getPreference()).toBe('system');
    expect(controller.getResolvedTheme()).toBe('dark');
    controller.destroy();
  });

  it('applies the dark class to the target element', () => {
    const controller = new ThemeController({ defaultPreference: 'dark' });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    controller.destroy();
  });

  it('toggles between light and dark', () => {
    const controller = new ThemeController({ defaultPreference: 'light' });
    expect(controller.getResolvedTheme()).toBe('light');
    controller.toggle();
    expect(controller.getResolvedTheme()).toBe('dark');
    controller.toggle();
    expect(controller.getResolvedTheme()).toBe('light');
    controller.destroy();
  });

  it('persists the preference to localStorage', () => {
    const controller = new ThemeController({
      storageKey: 'test-theme',
      defaultPreference: 'light',
    });
    controller.setDark();
    expect(window.localStorage.getItem('test-theme')).toBe('dark');
    controller.destroy();
  });

  it('reads a previously persisted preference on construction', () => {
    localStorage.setItem('theme-switcher:theme', 'dark');
    const controller = new ThemeController();
    expect(controller.getPreference()).toBe('dark');
    expect(controller.getResolvedTheme()).toBe('dark');
    controller.destroy();
  });

  it('notifies subscribers only when the resolved theme changes', () => {
    const controller = new ThemeController({ defaultPreference: 'light' });
    const listener = vi.fn();
    const unsubscribe = controller.subscribe(listener);

    controller.setLight(); // no-op, already light
    expect(listener).not.toHaveBeenCalled();

    controller.setDark();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ preference: 'dark', resolved: 'dark' });

    unsubscribe();
    controller.setLight();
    expect(listener).toHaveBeenCalledTimes(1);

    controller.destroy();
  });

  it('respects a custom storage key, attribute, and class names', () => {
    const controller = new ThemeController({
      storageKey: 'custom-key',
      darkClassName: 'is-dark',
      lightClassName: 'is-light',
      attribute: 'data-mode',
      defaultPreference: 'dark',
    });
    expect(document.documentElement.classList.contains('is-dark')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
    controller.destroy();

    document.documentElement.className = '';
    const light = new ThemeController({
      darkClassName: 'is-dark',
      lightClassName: 'is-light',
      defaultPreference: 'light',
    });
    expect(document.documentElement.classList.contains('is-light')).toBe(true);
    light.destroy();
  });

  it('does not touch localStorage when persistence is disabled', () => {
    const controller = new ThemeController({
      disablePersistence: true,
      defaultPreference: 'light',
    });
    controller.setDark();
    expect(window.localStorage.getItem('theme-switcher:theme')).toBeNull();
    controller.destroy();
  });
});
