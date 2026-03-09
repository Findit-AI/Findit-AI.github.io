import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

describe('about page routes', () => {
  it('provides both english and chinese about pages', () => {
    const enPath = path.join(root, 'src/pages/about.astro');
    const zhPath = path.join(root, 'src/pages/zh/about.astro');

    expect(fs.existsSync(enPath)).toBe(true);
    expect(fs.existsSync(zhPath)).toBe(true);
  });
});
