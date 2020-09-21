const a = new Array(30),
    b = new Array(30);
a.fill(0);
b.fill(1);
// console.log(a, b);
let i = 0, j = 0;
let result = [];
let answer = [];
while(i < 6 && j < 9) {
    if (!answer[i]) answer[i] = [];
}
/**
 * 
 * @param {*} arr 待检测目标二维数组
 * @param {*} i 第i行
 * @param {*} j 第j列
 * @returns 是否符合，true为符合，false为不符合
 */
function check(arr, i, j) {
    if (i - 1 > -1 && j - 1 > -1) return arr[i][j] !== arr[i-1][j] || arr[i][j] !== arr[i][j-1] || arr[i][j] !== arr[i+1][j] || arr[i][j] !== arr[i][j+1];
    if (i - 1 > -1) return arr[i][j] !== arr[i-1][j] || arr[i][j] !== arr[i+1][j] || arr[i][j] !== arr[i][j+1];
    if (j - 1 > -1) return arr[i][j] !== arr[i][j-1] || arr[i][j] !== arr[i+1][j] || arr[i][j] !== arr[i][j+1];
    return arr[i][j] !== arr[i+1][j] || arr[i][j] !== arr[i][j+1];
}
