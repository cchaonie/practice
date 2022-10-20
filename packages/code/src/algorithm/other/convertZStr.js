// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convertZStr = function (s, numRows) {
    if (numRows === 1) return s;
    const rows = Math.min(s.length, numRows);
    const ret = new Array(rows);
    for (let i = 0; i < rows; i++) {
        ret[i] = new Array();
    }
    let rowPointer = 0;
    let direction = 1; // 增加
    for (const c of s) {
        ret[rowPointer].push(c);
        if (direction === 1) {
            rowPointer++;
        }
        if (direction === 0) {
            rowPointer--;
        }
        if (rowPointer === rows && direction === 1) {
            rowPointer = rows - 2;
            direction = 0;
        }
        if (rowPointer === -1 && direction === 0) {
            rowPointer = 1;
            direction = 1;
        }
    }
    return ret.reduce((arr, rowStrArray) => {
        arr += rowStrArray.join("");
        return arr;
    }, "");
};

module.exports = {
    convertZStr,
};
