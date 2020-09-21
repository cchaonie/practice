/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n <= 0) return [];
  let cache = [];
  const generate = n => {
    if (cache[n]) {
      return cache[n];
    }
    const result = [];
    if (n === 0) {
      result.push("");
    } else {
      for (let i = 0; i < n; ++i) {
        for (let left of generate(i)) {
          for (let right of generate(n - 1 - i)) {
            result.push(`(${left})${right}`);
          }
        }
      }
    }
    cache[n] = result;
    return result;
  };
  return generate(n);
};

module.exports = generateParenthesis;
