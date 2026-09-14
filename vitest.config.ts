import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        // jsdom disables localStorage on the default "about:blank" origin;
        // a real-looking URL enables it so persistence can be tested.
        url: 'http://localhost/',
      },
    },
    include: ['test/**/*.test.ts'],
  },
});
