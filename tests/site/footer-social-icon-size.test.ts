import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
const css = fs.readFileSync(cssPath, 'utf8');

describe('footer social icon size', () => {
  it('renders footer social svg icons at 20px for better legibility', () => {
    const iconRule = css.match(/\.site-social-link svg\s*\{([\s\S]*?)\n\}/);
    expect(iconRule).not.toBeNull();

    const iconStyles = iconRule?.[1] ?? '';
    expect(iconStyles).toMatch(/width\s*:\s*20px/i);
    expect(iconStyles).toMatch(/height\s*:\s*20px/i);
  });
});
