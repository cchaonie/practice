const maxSubArray = require("../../../src/other/dynamicProgramming/maxSubArray");

describe("maxSubArray", () => {
  it("should pass", () => {
    expect(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])).toBe(6);
  });
  it("should pass", () => {
    expect(maxSubArray([-1])).toBe(-1);
  });
});
