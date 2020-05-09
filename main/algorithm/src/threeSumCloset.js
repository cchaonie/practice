function threeSumCloset(nums, target) {
  let closetSum = null,
    left = null,
    right = null;
  let tmp = nums.sort((a, b) => a - b);
  for (let i = 0; i < tmp.length - 2; ++i) {
    left = i + 1;
    right = tmp.length - 1;
    let minSum = tmp[i] + tmp[left] + tmp[left + 1];
    let maxSum = tmp[i] + tmp[right] + tmp[right - 1];
    if (minSum >= target || maxSum <= target) {
      if (minSum >= target) {
        closetSum = changeClosetSum(closetSum, minSum, target);
      }
      if (maxSum <= target) {
        closetSum = changeClosetSum(closetSum, maxSum, target);
      }
    } else {
      while (left < right) {
        let sum = tmp[i] + tmp[left] + tmp[right];
        closetSum = changeClosetSum(closetSum, sum, target);
        if (sum - target > 0) {
          while (left < right && tmp[right] === tmp[--right]);
        } else if (sum - target < 0) {
          while (left < right && tmp[left] === tmp[++left]);
        } else {
          return closetSum;
        }
      }
    }
  }
  return closetSum;
}

function changeClosetSum(closetSum, sum, target) {
  if (closetSum === null) {
    closetSum = sum;
  } else if (Math.abs(closetSum - target) > Math.abs(sum - target)) {
    closetSum = sum;
  }
  return closetSum;
}

module.exports = {
  threeSumCloset
}