/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    if (!nums.length) return 0;
    const dp = new Array(nums.length + 1);
    let answer = (dp[0] = -Infinity);
    for (let i = 1; i <= nums.length; ++i) {
        if (dp[i - 1] < 0) {
            dp[i] = nums[i - 1];
        } else {
            dp[i] = dp[i - 1] + nums[i - 1];
        }
        answer = Math.max(answer, dp[i]);
    }
    return answer;
};

module.exports = maxSubArray;
