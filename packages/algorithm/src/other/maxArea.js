/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;
  for (let i = 1; i < height.length; i++) {
    for (let j = i; j >= 0; j--) {
      let tmp = Math.min(height[i], height[j]) * (i - j);
      max = max > tmp ? max : tmp;
    }
  }
  return max;
};

module.exports = {
  maxArea
}