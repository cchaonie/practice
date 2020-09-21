/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
  const row = dungeon.length;
  const col = dungeon[0].length;
  let dp = new Array(row);
  for (let i = 0; i < row; i++) {
    dp[i] = new Array(col).fill(0);
  }

  for (let i = 0; i < row; i++) {
    dp[i][0] = i === 0 ? dungeon[0][0] : dp[i - 1][0] + dungeon[i][0];
  }
  for (let j = 1; j < col; j++) {
    dp[0][j] = dp[0][j - 1] + dungeon[0][j];
  }

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + dungeon[i][j];
    }
  }
  return dp[row - 1][col - 1] < 0 ? - dp[row - 1][col - 1] : 0;
};

module.exports = calculateMinimumHP;
