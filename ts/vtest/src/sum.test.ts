import { describe, expect, test } from 'vitest';
import { sum } from './sum';

describe('sum - ', () => {
  test('3 with 1,2', () => {
    const tot = sum(1, 2);
    expect(tot).toBe(3);
  });
});
