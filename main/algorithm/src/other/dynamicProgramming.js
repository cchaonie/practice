/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let resultMap = [];
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      resultMap[i] = nums[0];
    } else if (i === 1) {
      resultMap[i] = Math.max(nums[0], nums[1]);
    } else {
      resultMap[i] = Math.max(resultMap[i - 2] + nums[i], resultMap[i - 1]);
    }
  }
  return nums.length ? resultMap[nums.length - 1] : 0;
};

module.exports = {
  rob,
};
