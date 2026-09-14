/**
 * Root entry point. Exports only the framework-agnostic core so that
 * consumers who don't use React or Vue never pull those adapters into
 * their bundle. See also the `./react`, `./vue`, and `./vanilla` subpaths.
 */
export * from './core';
export { VARIANTS } from './variants';
export type { VariantDefinition } from './variants';
