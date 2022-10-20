/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const row = obstacleGrid.length;
  const col = obstacleGrid[0].length;
  let dp = new Array(row);
  for (let i = 0; i < row; i++) {
    dp[i] = new Array(col).fill(0);
  }
  for (let i = 0; i < row; i++) {
    if (obstacleGrid[i][0] === 0) {
      dp[i][0] = 1;
    } else {
      break;
    }
  }
  for (let j = 0; j < col; j++) {
    if (obstacleGrid[0][j] === 0) {
      dp[0][j] = 1;
    } else {
      break;
    }
  }

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[row - 1][col - 1];
};

module.exports = uniquePathsWithObstacles;
