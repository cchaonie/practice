const { findMedianSortedArrays } = require("../../src/search/findMedianSortedArrays");

describe("findMedianSortedArrays", () => {
  // test("2.5", () => {
  //   expect(findMedianSortedArrays([1, 2, 3], [2, 3, 4]))
  //   .toEqual(2.5);
  // });
  test("1.5", () => {
    expect(findMedianSortedArrays([1, 2], [-1, 3]))
    .toEqual(1.5);
  });
})