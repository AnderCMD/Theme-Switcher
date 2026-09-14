import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      'react/index': 'src/react/index.ts',
      'vue/index': 'src/vue/index.ts',
      'angular/index': 'src/angular/index.ts',
      'vanilla/index': 'src/vanilla/index.ts',
      'tailwind/index': 'src/tailwind/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    treeshake: true,
    external: ['react', 'react-dom', 'vue', '@angular/core'],
  },
]);
