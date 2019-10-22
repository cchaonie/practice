/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let result = [];
  while (nums1.length > 0 && nums2.length > 0) {
    if (nums1[0] > nums2[0]) {
      result.push(nums2.shift());
    } else {
      result.push(nums1.shift());
    }
  }
  result = result.concat(nums1).concat(nums2);
  let len = result.length;
  if (len % 2 == 1) {
    return result[Math.floor(len / 2)];
  } else {
    let mid = Math.floor(len / 2);
    return (result[mid] + result[mid - 1]) / 2;
  }
};

module.exports = {
  findMedianSortedArrays
}