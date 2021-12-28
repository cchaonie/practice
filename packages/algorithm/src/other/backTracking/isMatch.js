/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    if (!p.length) return !s.length;// 模式串为空
    const firstMatch = s.length && (s.charAt(0) === p.charAt(0) || p.charAt(0) === '.');
    if (p.charAt(1) === '*') {
      return (isMatch(s, p.substring(2)) || firstMatch && isMatch(s.substring(1), p));
    } else {
      return firstMatch && isMatch(s.substring(1), p.substring(1));
    }
};

module.exports = {
    isMatch
}