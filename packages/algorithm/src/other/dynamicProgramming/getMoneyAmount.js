/**
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function (n) {
    const dp = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }
    for (let range = 2; range <= n; range++) {
        for (let i = 1; i <= n - range + 1; i++) {
            let min;
            for (let j = i; j < i + range - 1; j++) {
                const curr = j + Math.max(dp[i][j - 1], dp[j + 1][i + range - 1]);
                min = min ? Math.min(min, curr) : curr;
            }
            dp[i][i + range - 1] = min;
        }
    }
    return dp[1][n];
};

module.exports = {
    getMoneyAmount,
};
