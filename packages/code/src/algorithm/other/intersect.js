/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    const map = new Map();
    const result = [];
    for (let i = 0; i < nums1.length; ++i) {
        if (map.get(nums1[i])) {
            map.set(nums1[i], map.get(nums1[i]) + 1);
        } else {
            map.set(nums1[i], 1);
        }
    }

    for (let j = 0; j < nums2.length; ++j) {
        if (map.get(nums2[j])) {
            result.push(nums2[j]);
            map.set(nums2[j], map.get(nums2[j]) - 1);
        }
    }

    return result;
};

module.exports = intersect;
