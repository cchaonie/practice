/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch1 = function (s, p) {
  if (!s) return !p || /^\*+$/.test(p);
  if (/[a-z]/.test(p.charAt(0)) && s.charAt(0) !== p.charAt(0)) return false;
  if (s.charAt(0) === p.charAt(0) || p.charAt(0) === "?") {
    return isMatch(s.substring(1), p.substring(1));
  }
  if (p.charAt(0) === "*") {
    if (p.length === 1) return true;
    for (let i = 0; i < s.length; i++) {
      if (isMatch(s.substring(i), p.substring(1))) {
        return true;
      } else {
        continue;
      }
    }
  }
  return false;
};

var isMatch = function (s, p) {
  let dp = [];
  dp[0] = [];
  for (let j = 0; j <= p.length; j++) {
    if (j == 0) {
      dp[0][j] = true;
    } else {
      if (p.charAt(j - 1) === "*") {
        dp[0][j] = dp[0][j-1];
      } else {
        dp[0][j] = false
      }
    }
  }
  for (let i = 1; i <= s.length; i++) {
    dp[i] = dp[i] || [];
    for (let j = 0; j <= p.length; j++) {
      if (j == 0) {
        dp[i][j] = i == 0;
      } else if (i == 0) {
        dp[i][j] = p.charAt(j - 1) === "*";
      } else {
        if (p.charAt(j - 1) === "*") {
          dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
        } else if (
          p.charAt(j - 1) === s.charAt(i - 1) ||
          p.charAt(j - 1) == "?"
        ) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = false;
        }
      }
    }
  }
  return dp[s.length][p.length];
};

module.exports = isMatch;
