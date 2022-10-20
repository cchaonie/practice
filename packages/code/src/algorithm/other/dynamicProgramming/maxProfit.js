/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (!prices.length) return 0;
    const dp = new Array(prices.length);
    // init dp[][] elements to 0
    // dp[i][0] for frozen, dp[i][1] for have, dp[i][2] for dont have
    for (let i = 0; i < dp.length; ++i) {
        dp[i] = new Array(3).fill(0);
    }
    for (let i = 0; i < prices.length; ++i) {
        if (i === 0) {
            dp[i][1] = -prices[i];
        } else {
            dp[i][0] = dp[i - 1][1] + prices[i];
            dp[i][1] = Math.max(dp[i - 1][2] - prices[i], dp[i - 1][1]);
            dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][2]);
        }
    }
    return Math.max(dp[prices.length - 1][0], dp[prices.length - 1][2]);
};

module.exports = maxProfit;
