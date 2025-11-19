// keyPair, O(N) || O(logN)
// loop 두 번이면 N^2
const assert = require("assert");
const { isDeepStrictEqual } = require("util");

const keyPair = (arr, sum) => {
  // const myPairIndex = {};
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) return [i, j];
    }
  }
};

assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
const x = keyPair([1, 2, 3, 4, 5, 7], 9);
assert.ok(isDeepStrictEqual(x, [3, 4]) || isDeepStrictEqual(x, [1, 5]));
keyPair([1, 3, 4, 5], 7); // [1, 2]
keyPair([1, 4, 45, 6, 10, 8], 16); // [3, 4]
keyPair([1, 2, 4, 3, 6], 10); // [2, 4]
keyPair([1, 2, 3, 4, 5, 7], 9); // [3, 4]  or [1, 5]

// ----
// 키페어는 쉬운 문제라고 하심.

const assert = require("assert");
const { isDeepStrictEqual } = require("util");

const keyPair1 = (arr, sum) => {
  const myPairIndex = {};
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const PairIdx = myPairIndex[val];
    if (PairIdx) return [PairIdx, i];
    myPairIndex[sum - val] = i;
  }
};

assert.deepStrictEqual(keyPair1([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair1([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair1([1, 2, 4, 3, 6], 10), [2, 4]);
const x1 = keyPair1([1, 2, 3, 4, 5, 7], 9);
assert.ok(isDeepStrictEqual(x1, [3, 4]) || isDeepStrictEqual(x1, [1, 5]));
keyPair1([1, 3, 4, 5], 7); // [1, 2]
keyPair1([1, 4, 45, 6, 10, 8], 16); // [3, 4]
keyPair1([1, 2, 4, 3, 6], 10); // [2, 4]
keyPair1([1, 2, 3, 4, 5, 7], 9); // [3, 4]  or [1, 5]
