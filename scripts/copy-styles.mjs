// Copies the hand-authored CSS (which tsup does not bundle) into `dist/`
// so `theme-switcher/styles/*.css` resolves after a build.
import { cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(rootDir, '..', 'src', 'styles');
const dest = path.join(rootDir, '..', 'dist', 'styles');

await cp(src, dest, { recursive: true });
console.log('Copied CSS styles to dist/styles');
