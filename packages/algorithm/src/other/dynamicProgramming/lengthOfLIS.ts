export function lengthOfLIS(nums: number[]): number {
    let maxLength = 0;
    const dp: number[] = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; i++) {
        for (let j = i - 1; j > -1; j--) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(dp[i], maxLength);
    }
    return maxLength;
}
