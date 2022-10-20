const initDp = (i: number, j: number, k: number) => {
    const dp: number[][][] = new Array(i);
    for (let d1 = 0; d1 < i; d1++) {
        dp[d1] = new Array(j);
        for (let d2 = 0; d2 < j; d2++) {
            dp[d1][d2] = new Array(k).fill(0);
        }
    }
    return dp;
};
const countZero = (s: string) => {
    let count = 0;
    for (let c of s) {
        if (c === "0") {
            count++;
        }
    }
    return count;
};
export function findMaxForm(strs: string[], m: number, n: number): number {
    const dp = initDp(strs.length, m + 1, n + 1);
    for (let i = 0; i < strs.length; i++) {
        const zeroCount = countZero(strs[i]);
        const oneCount = strs[i].length - zeroCount;
        for (let j = 0; j <= m; j++) {
            for (let k = 0; k <= n; k++) {
                if (zeroCount > j || oneCount > k) {
                    dp[i][j][k] = i > 0 ? dp[i - 1][j][k] : 0;
                } else {
                    dp[i][j][k] = i > 0 ? Math.max(dp[i - 1][j][k], 1 + dp[i - 1][j - zeroCount][k - oneCount]) : 1;
                }
            }
        }
    }
    return dp[strs.length - 1][m][n];
}

export function findMaxFormSpaceCompress(strs: string[], m: number, n: number) {
    const dp: number[][] = new Array(m + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }

    for (const s of strs) {
        const zeroCount = countZero(s);
        const oneCount = s.length - zeroCount;
        for (let i = m; zeroCount <= i; i--) {
            for (let j = n; oneCount <= j; j--) {
                dp[i][j] = Math.max(dp[i][j], 1 + dp[i - zeroCount][j - oneCount]);
            }
        }
    }
    return dp[m][n];
}

interface Item {
    volume: number;
    value: number;
}

export function maxValue(volume: number, items: Item[]): number {
    const dp = new Array(volume + 1).fill(0);
    for (const item of items) {
        for (let i = volume; i >= item.volume; i--) {
            dp[i] = Math.max(dp[i], item.value + dp[i - item.volume]);
        }
    }
    return dp[volume];
}
