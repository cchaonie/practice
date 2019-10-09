/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let result = [];
  let tmp = nums.sort((a, b) => a - b);
  for (let i = 0; i < tmp.length - 2; i++) {
    if (tmp[i] > 0) break;
    if(i > 0 && tmp[i] == tmp[i-1]) continue;
    let j = i + 1,
      k = tmp.length - 1;
    while (j < k) {
      let sum = tmp[i] + tmp[j] + tmp[k];
      if (sum === 0) {
        result.push([tmp[i], tmp[j], tmp[k]]);
        while(j < k && tmp[j] === tmp[++j]);
        while(j < k && tmp[k] === tmp[--k]);
      } else if (sum > 0) {
        while(j < k && tmp[k] === tmp[--k]);
      } else {
        while(j < k && tmp[j] === tmp[++j]);
      }
    }
  }
  return result;
};

module.exports = {
  threeSum
}