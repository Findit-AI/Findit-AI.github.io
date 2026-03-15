import { describe, expect, it } from 'vitest';
import { dictionaries } from '../../src/i18n/dictionaries.js';

describe('home demo copy', () => {
  it('uses product-specific approved messaging in english and chinese', () => {
    expect(dictionaries.en.home_demo_body).toBe(
      'See how FinDIT turns a rough idea into usable footage, then sends the selected clip straight into the edit timeline.',
    );

    expect(dictionaries.zh.home_demo_body).toBe(
      '查看 FinDIT 如何把一个模糊需求转成可用素材，并将选中片段直接送入剪辑时间线。',
    );
  });
});
