/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  let g = [];
  g[0] = 1;
  g[1] = 1;
  for (let i = 2; i <= n; ++i) {
    for (let j = 1; j <= i; ++j) {
      g[i] = g[i] ? g[i] + g[j - 1] * g[i - j] : g[j - 1] * g[i - j];
    }
  }
  return g[n];
};

console.log(numTrees(10))