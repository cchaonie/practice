/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (!s.length) return 0;
    const stack = [];
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === '(') {
            stack.push(s.charAt(i));
        }
        if (stack.length && s.charAt(i) === ')') {
            stack.pop();
            count++;
        }
    }
    return count * 2;
};

module.exports = longestValidParentheses;