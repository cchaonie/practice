const findSubArray = require("../../../src/other/dynamicProgramming/findSubArray");

describe("findSubArray", () => {
  it("should pass", () => {
    expect(findSubArray([1,2,3,2,1], [3,2,1,4,7])).toBe(3);
  });
});
