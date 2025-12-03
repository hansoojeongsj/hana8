import { isDeepStrictEqual } from 'util';
import { BRET } from './data.test';
import { fetchUser, sum } from './sum';

describe('mock - sum', async () => {
  // mock setUp
  beforeAll(() => {
    // mock -> 객체 리턴, 모듈 단위
    vi.mock('./sum', () => ({
      sum: vi.fn(),
      fetchUser: vi.fn(),
    }));

    const sumX = vi.mocked(sum);
    sumX.mockImplementation((...args: number[]) => {
      // if (args[0] === 1 && args[1] === 2) return 3;
      // if (args[0] === 10 && args[1] === 2) return 12;
      if (isDeepStrictEqual(args, [1, 2])) return 3;
      if (isDeepStrictEqual(args, [10, 2])) return 12;

      // if (isDeepStrictEqual(args, [1, 2, 3, 4, 5])) return 15;

      return 0;
    });
    // sumX.mockReturnValue(3);
    // promise인 경우는 rejectValue, resolveValue

    vi.mocked(fetchUser).mockResolvedValue(BRET);
    // .mockResolvedValueOnce -> 처음 한번만 주고 이후 undefined
  });

  test('sum - 3 with 1, 2', async () => {
    expect(sum(1, 2)).toBe(3);
  });

  test.skip('sum - 12 with 10, 2', async () => {
    expect(sum(10, 2)).toBe(12);
  });

  test('fetchUser', async () => {
    const user = await fetchUser(1);
    console.log('🚀 ~ user:', user);
    expect(user).toStrictEqual(BRET);
  });
  {
    /* 
  // 15를 기대하는데, 3을 received
  test('sum - 5 args', () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });
  */
  }
});
