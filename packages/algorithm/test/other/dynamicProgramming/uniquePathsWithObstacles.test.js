const uniquePathsWithObstacles = require("../../../src/other/dynamicProgramming/uniquePathsWithObstacles");

describe("uniquePathsWithObstacles", () => {
  it("should pass", () => {
    expect(
      uniquePathsWithObstacles([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ])
    ).toEqual(2);
  });
  it("should pass", () => {
    expect(uniquePathsWithObstacles([[1]])).toEqual(0);
  });
  it("should pass", () => {
    expect(uniquePathsWithObstacles([[0]])).toEqual(1);
  });
  it("should pass", () => {
    expect(uniquePathsWithObstacles([[1, 0]])).toEqual(0);
  });
  it("should pass", () => {
    expect(uniquePathsWithObstacles([[0], [1]])).toEqual(0);
  });
});
