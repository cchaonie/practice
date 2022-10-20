/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
  let windowLength = Infinity;
  let left = 0,
    right = 0,
    sum = 0;
  while (right < nums.length) {
    sum += nums[right];
    while (left <= right && sum >= s) {
      windowLength = Math.min(windowLength, right - left + 1);
      sum -= nums[left++];
    }
    right++;
  }
  return windowLength === Infinity ? 0 : windowLength;
};

function minSubArrayLen1(s, nums) {
    debugger;
  let size = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let prevMid = 0;
    let mid = Math.floor((i + nums.length) / 2);
    while (prevMid != mid) {
      let sum = 0;
      for (let j = i; j < mid + 1; j++) {
        sum += nums[j];
      }
      if (sum < s) {
        prevMid = mid;
        mid = Math.floor((mid + 1 + nums.length) / 2);
      } else {
        size = Math.min(size, mid - i + 1);
        prevMid = mid;
        mid = Math.floor((i + mid) / 2);
      }
    }
  }
  return size === Infinity ? 0 : size;
}

module.exports = {
  minSubArrayLen,
  minSubArrayLen1,
};
