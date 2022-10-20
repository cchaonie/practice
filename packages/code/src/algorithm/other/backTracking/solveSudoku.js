/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  function isCorrect(board) {
    for (let row of board) {
      if (row.includes(".")) {
        return false;
      }
    }
    return true;
  }
  function isFine(op, row, col, board) {
    if (board[row].includes(op)) return false;
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === op) {
        return false;
      }
    }
    const startRow = Math.floor(row / 3) * 3;
    const endRow = startRow + 2;
    const startCol = Math.floor(col / 3) * 3;
    const endCol = startCol + 2;
    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; i < endCol; i++) {
        if (board[i][j] === op) {
          return false;
        }
      }
    }
    return true;
  }
  function getOptions(row, col, board) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  let result = [];
  let level = 9;
  const backtrack = (startRow, startCol, board) => {
      console.log(board)
    if (isCorrect(board)) {
      result.push(board.map(row => row.slice()));
      return;
    }
    for (let row = startRow; row < level; row++) {
      for (let col = startCol; col < level; col++) {
        if (board[row][col] === ".") {
          let options = getOptions(row, col, board);
          for (let op of options) {
            if (isFine(op, row, col, board)) {
              board[row][col] = op;
              backtrack(row, col + 1, board);
              board[row][col] = ".";
            }
          }
        }
      }
    }
  };
  backtrack(0, 0, board);
};

module.exports = solveSudoku;
