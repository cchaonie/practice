/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    let order = 0; // 0: toRight, 1: toBottom, 2: toLeft, 3: toTop
    const nextOrder = (currOrder) => (currOrder === 3 ? 0 : currOrder + 1);
    let result = [];
    while (matrix.length) {
      let row = matrix.length;
      let col = matrix[0].length;
      switch (order) {
        case 0: {
          matrix[0].forEach((n) => result.push(n));
          matrix.splice(0, 1);
          break;
        }
        case 1: {
          for (let r = 0; r < matrix.length; r++) {
            if (matrix[r]) {
              result.push(matrix[r].splice(col - 1, 1)[0]);
              if (!matrix[r].length) {
                matrix.splice(r, 1);
                r--;
              }
            }
          }
          break;
        }
        case 2: {
          for (let c = col - 1; c > -1; c--) {
            result.push(matrix[row - 1][c]);
          }
          matrix.splice(row - 1, 1);
          break;
        }
        case 3: {
          for (let r = row - 1; r > -1; r--) {
            if (matrix[r]) {
              result.push(matrix[r].splice(0, 1)[0]);
              if (!matrix[r].length) {
                matrix.splice(r, 1);
                r++;
              }
            }
          }
          break;
        }
      }
      order = nextOrder(order);
    }
    return result;
};

module.exports = spiralOrder;
