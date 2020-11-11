/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
export var findRotateSteps = function (ring, key) {
    const n = ring.length;
    const m = key.length;
    const mapper = new Map();
    for (let i = 0; i < n; i++) {
        if (mapper.has(ring[i])) {
            mapper.get(ring[i]).push(i);
        } else {
            mapper.set(ring[i], [i]);
        }
    }
    const dp = new Array(m)
        .fill(0)
        .map((v) => new Array(n).fill(Number.MAX_SAFE_INTEGER));
    for (const i of mapper.get(key[0])) {
        dp[0][i] = Math.min(i, n - i) + 1;
    }
    for (let i = 1; i < m; ++i) {
        for (const j of mapper.get(key[i])) {
            for (const k of mapper.get(key[i - 1])) {
                dp[i][j] = Math.min(
                    dp[i][j],
                    dp[i - 1][k] + Math.min(Math.abs(j - k), n - Math.abs(j - k)) + 1,
                );
            }
        }
    }
    return dp[m - 1].reduce((pre, cur) => Math.min(pre, cur), Number.MAX_SAFE_INTEGER);
};
