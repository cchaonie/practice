var lastStoneWeightII = function (stones) {
    const n = stones.length;
    if (n === 1) return stones[0];

    const sum = stones.reduce((a, c) => a + c, 0);
    const size = sum >> 1;

    const f = new Array(n + 1).fill(0).map((_) => new Array(size + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= size; j++) {
            f[i][j] = f[i - 1][j];
            const weight = stones[i - 1];
            if (weight <= j) {
                f[i][j] = Math.max(f[i][j], weight + f[i - 1][j - weight]);
            }
        }
    }
    return sum - 2 * f[n][size];
};

module.exports = { lastStoneWeightII };
