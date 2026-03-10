import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const layoutPath = path.resolve(process.cwd(), 'src/layouts/MainLayout.astro');
const layoutSource = fs.readFileSync(layoutPath, 'utf8');

describe('header brand logo', () => {
  it('renders the white logo image in the top navigation brand area', () => {
    expect(layoutSource).toMatch(/class=\"brand-logo\"/);
    expect(layoutSource).toMatch(/src=\"\/logo-white\.png\"/);
  });
});
