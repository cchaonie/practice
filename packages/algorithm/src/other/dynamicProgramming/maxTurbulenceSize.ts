export function maxTurbulenceSize(A: number[]): number {
    if (!A.length) return 0;
    const dp: number[] = new Array(A.length).fill(1);
    let maxSize = 1;
    for (let i = 1; i < A.length; i++) {
        if (dp[i - 1] === 1 && A[i] !== A[i - 1]) {
            dp[i] = 2;
        }
        if (
            dp[i - 1] > 1 &&
            ((A[i - 1] < A[i - 2] && A[i] > A[i - 1]) ||
                (A[i - 1] > A[i - 2] && A[i] < A[i - 1]))
        ) {
            dp[i] = dp[i - 1] + 1;
        } else if (A[i] !== A[i - 1]) {
            dp[i] = 2;
        }
        maxSize = Math.max(maxSize, dp[i]);
    }
    return maxSize;
}

export function maxTurbulenceSizeSpaceDepressed(A: number[]): number {
    if (!A.length) return 0;
    let pre = 1,
        maxSize = 1;
    for (let i = 1; i < A.length; i++) {
        if (pre === 1 && A[i] !== A[i - 1]) {
            pre = 2;
        }
        if (
            pre > 1 &&
            ((A[i - 1] < A[i - 2] && A[i] > A[i - 1]) ||
                (A[i - 1] > A[i - 2] && A[i] < A[i - 1]))
        ) {
            pre++;
        } else if (A[i] !== A[i - 1]) {
            pre = 2;
        }
        maxSize = Math.max(maxSize, pre);
    }
    return maxSize;
}
