/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findSubArray = function(A, B) {
    let temp = [];
    let answer = 0;
    for (let i = 0; i < A.length; i++) {
        let tempI = temp[i] || (temp[i] = []);
        for (let j = 0; j < B.length; j++) {
            if (i === j && i == 0) {
                if (A[i] == A[j]) {
                    tempI[j] = 1
                } else {
                    tempI[j] = 0;
                }
            }
        }
    }
};

module.exports = findSubArray;