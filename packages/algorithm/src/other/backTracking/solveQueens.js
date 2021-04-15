/**
 * @param {number} n
 * @return {string[][]}
 */

var solveNQueens = function (n) {
  const result = [];
  function backtrack(options, choice) {
    if (choice.length === n) {
      result.push(choice.slice());
      return;
    }
    for (let col = 0; col < options; col++) {
      if (positionFine(col, choice)) {
        choice.push(col);
        backtrack(options, choice);
        choice.pop(col);
      }
    }
  }
  backtrack(n, []);
  return result;
};

function positionFine(col, choice) {
  if (choice.includes(col)) return false;
  for (let count = 1; count <= choice.length; count++) {
    if (choice[choice.length - count] === col - count) return false;
  }
  for (let count = 1; count <= choice.length; count++) {
    if (choice[choice.length - count] === col + count) return false;
  }
  return true;
}

module.exports = {
  solveNQueens,
  positionFine,
};
