const {
  containsNearbyAlmostDuplicate,
} = require("../../../src/data-structure/tree/containsNearbyAlmostDuplicate");

describe("containsNearbyAlmostDuplicate", () => {
  test("[1,2,3,1], 3, 0", () => {
    expect(containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0)).toEqual(true);
  });
});
