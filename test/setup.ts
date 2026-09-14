// Node 20+ ships an experimental global `localStorage` that is undefined
// unless started with `--localstorage-file`, and it shadows jsdom's own
// (perfectly usable) Storage implementation because vitest's jsdom
// environment treats `window` as an alias for `globalThis`. Replace it
// with a small in-memory polyfill so tests behave the same on every Node
// version and CI runner, without depending on any Node CLI flag.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new MemoryStorage(),
  configurable: true,
  writable: true,
});
