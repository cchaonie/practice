/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  buildMaxHeap(nums);
  for (let i = 0; i < nums.length; i++) {
      deleteMax(nums, nums.length - i);
  }
  return nums[nums.length - k];
};

function leftChildIndex(index) {
  return 2 * index + 1;
}

function buildMaxHeap(nums) {
  for (let i = nums.length >> (2 - 1); i > -1; i--) {
    sift_down(nums, i, nums.length);
  }
}

function sift_down(array, index, size) {
  let tmp = array[index];
  while (leftChildIndex(index) < size) {
    let maxIndex = leftChildIndex(index);
    if (maxIndex != size - 1 && array[maxIndex] < array[maxIndex + 1]) {
      ++maxIndex;
    }
    let max = array[maxIndex];
    if (tmp < max) {
      array[index] = max;
      index = maxIndex;
    } else {
      break;
    }
  }
  array[index] = tmp;
}

function deleteMax(maxHeap, size) {
  let max = maxHeap[0];
  maxHeap[0] = maxHeap[size - 1];
  maxHeap[size - 1] = max;
  sift_down(maxHeap, 0, size - 1);
}

module.exports = findKthLargest;
