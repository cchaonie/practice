/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  if (!s) return 0;
  let dp = [0];
  let result = 0;
  for (let i = 1; i < s.length; i++) {
    if (s.charAt(i) === "(") {
      dp[i] = 0;
    } else {
      if (s.charAt(i - 1) === "(") {
        dp[i] = i > 2 ? dp[i - 2] + 2 : 2;
      } else {
        if (s.charAt(i - dp[i - 1] - 1) === "(") {
          dp[i] =
            i - dp[i - 1] - 2 > 0
              ? dp[i - dp[i - 1] - 2] + dp[i - 1] + 2
              : dp[i - 1] + 2;
        } else {
          dp[i] = 0;
        }
      }
    }
    result = Math.max(result, dp[i]);
  }
  return result;
};

module.exports = longestValidParentheses;
