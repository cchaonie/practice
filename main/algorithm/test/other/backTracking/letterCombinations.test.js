const {
  letterCombinations,
} = require("../../../src/other/backTracking/letterCombinations");

describe("letterCombinations", () => {
  it("should pass", () => {
    expect(letterCombinations("")).toEqual([]);
    expect(letterCombinations("29")).toEqual([
      "aw",
      "ax",
      "ay",
      "az",
      "bw",
      "bx",
      "by",
      "bz",
      "cw",
      "cx",
      "cy",
      "cz",
    ]);
  });
});
