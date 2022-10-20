export function numberOfBST(n: number): number {
    const dp = new Array(n + 1);
    dp[0] = 1;
    for (let i = 1; i <= n; ++i) {
        dp[i] = 0;
        for (let j = 1; j <= i; ++j) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];
}
