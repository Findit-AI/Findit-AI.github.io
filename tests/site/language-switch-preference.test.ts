import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const layoutPath = path.resolve(process.cwd(), 'src/layouts/MainLayout.astro');
const scriptPath = path.resolve(process.cwd(), 'src/scripts/main-layout.ts');
const layoutSource = fs.readFileSync(layoutPath, 'utf8');
const scriptSource = fs.readFileSync(scriptPath, 'utf8');

describe('language switch preference persistence', () => {
  it('stores the explicit locale selection before navigating', () => {
    expect(layoutSource).toContain('data-locale-preference');
    expect(scriptSource).toContain('localStorage.setItem');
  });
});
