/**
 * @param {number[][]} triangle
 * @return {number}
 */
export function minimumTotalInBackTrack(triangle: number[][]): number {
    if (!triangle.length) return 0;
    let result = Infinity;
    const backtrack = (optionStart: number, selection: number[]) => {
        const selectionLevel = selection.length;
        if (selectionLevel === triangle.length) {
            const pathSum = selection.reduce((sum, c) => (sum += c), 0);
            result = Math.min(result, pathSum);
            return;
        }
        for (let i = optionStart; i <= Math.min(optionStart + 1, triangle[selectionLevel].length - 1); ++i) {
            selection.push(triangle[selectionLevel][i]);
            backtrack(i, selection);
            selection.pop();
        }
    };
    backtrack(0, []);
    return result;
}

export function minimumTotal(triangle: number[][]): number {
    if (!triangle.length) return 0;
    let result = Infinity;
    const dp = new Array(triangle.length);
    for (let i = 0; i < triangle.length; ++i) {
        dp[i] = new Array(triangle[i].length);
    }
    dp[0][0] = triangle[0][0];
    for (let i = 1; i < triangle.length; ++i) {
        for (let j = 0; j < dp[i].length; ++j) {
            if (j === 0) {
                dp[i][j] = dp[i - 1][j] + triangle[i][j];
            } else if (j < dp[i].length - 1) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
            } else {
                dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
            }
        }
    }
    for (let i = 0; i < dp[dp.length - 1].length; ++i) {
        result = Math.min(result, dp[dp.length - 1][i]);
    }
    return result;
}
