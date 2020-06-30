const { minSubArrayLen1 } = require("../../src/other/minSubArrayLen");

describe("minSubArrayLen1", () => {
  it.skip("should pass", () => {
    expect(minSubArrayLen1(7, [1, 2, 3, 1, 3, 4])).toBe(2);
  });
});
