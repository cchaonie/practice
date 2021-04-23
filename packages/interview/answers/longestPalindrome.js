/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (typeof s != "string") throw new Error("expect a string as parameter");
    const len = s.length;
    const f = new Array(len);
    for (let i = 0; i < len; i++) {
        f[i] = [];
    }
    let max = "";
    for (let i = 0; i < len; i++) {
        for (let j = 0; j <= i; j++) {
            if (i == j) {
                f[i][j] = true;
            } else if (i - j == 1) {
                f[i][j] = s[i] == s[j];
            } else {
                f[i][j] = s[i] == s[j] && f[i - 1][j + 1];
            }
            if (f[i][j]) {
                max = max.length > i - j + 1 ? max : s.substring(j, i + 1);
            }
        }
    }
    return max;
};
