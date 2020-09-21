/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let max = 0;
    if (prices.length < 2) return 0;
    let min = prices[0];
    for (let i = 1; i < prices.length; ++i) {
      max = Math.max(max, prices[i] - min);
      min = Math.min(min, prices[i]);
    }
    return max;
}

function getMin(arr) {
  let mins = [];
  for (let i = 0; i < arr.length; ++i) {
    if (i === 0) {
      mins[i] = arr[i];
    } else {
      mins[i] = Math.min(mins[i - 1], arr[i]);
    }
  }
  return mins;
}

module.exports = {
  maxProfit
}