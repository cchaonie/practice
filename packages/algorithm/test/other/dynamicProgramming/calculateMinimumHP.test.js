const calculateMinimumHP = require("../../../src/other/dynamicProgramming/calculateMinimumHP");

describe("calculateMinimumHP", () => {
  it("should pass", () => {
    expect(
      calculateMinimumHP([
        [-2, -3, 3],
        [-5, -10, 1],
        [10, 30, -5],
      ])
    ).toEqual(7);
  });
});
