/**
 * @param {number[][]} grid
 * @return {number}
 */
export const minPathSum = function (grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const dp = new Array(m);
    for (let i = 0; i < m; ++i) {
        dp[i] = new Array(n);
    }
    for (let i = 0; i < m; ++i) {
        if (i === 0) {
            dp[i][0] = grid[0][0];
        } else {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }
    }

    for (let j = 1; j < n; ++j) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let i = 1; i < m; ++i) {
        for (let j = 1; j < n; ++j) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[m - 1][n - 1];
};
