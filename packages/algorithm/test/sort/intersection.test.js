const {
  intersection
} = require("../../src/sort/intersection")

describe("intersection", () => {
  test("[2]", () => {
    let nums1 = [1, 2, 2, 1],
      nums2 = [2, 2];
    let result = intersection(nums1, nums2);
    expect(result).toEqual([2]);
  })
})