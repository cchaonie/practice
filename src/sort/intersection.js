/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersection(nums1, nums2) {
  let result = [];
  const comparator = (a, b) => a - b;
  nums1.sort(comparator);
  nums2.sort(comparator);
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] == nums2[j]) {
      if (!result.includes(nums1[i])) {
        result.push(nums1[i]);
      } else {
        ++i;
        ++j;
      }
    } else if (nums1[i] < nums2[j]) {
      ++i;
    } else {
      ++j;
    }
  }
  return result;
}

module.exports = {
  intersection
}