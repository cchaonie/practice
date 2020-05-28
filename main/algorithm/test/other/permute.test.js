const { permute, permuteUnique } = require("../../src/other/permute");

describe("permute", () => {
  it("should pass", () => {
    expect(permute([1, 2, 3])).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });
});

describe("permuteUnique", () => {
  it("should pass", () => {
    expect(permuteUnique([1, 1, 3])).toEqual([
      [1, 1, 3],
      [1, 3, 1],
      [3, 1, 1],
    ]);
  });
});


