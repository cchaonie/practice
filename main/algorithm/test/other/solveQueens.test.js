const { solveNQueens, positionFine } = require("../../src/other/solveQueens");

describe("solveNQueens", () => {
  
  it("should positionFine", () => {
    expect(positionFine(0, [])).toBe(true);
    expect(positionFine(0, [0])).toBe(false);
    expect(positionFine(1, [0])).toBe(false);
    expect(positionFine(0, [1])).toBe(false);
    expect(positionFine(2, [1])).toBe(false);
    expect(positionFine(0, [1, 3])).toBe(true);
  })

  it("should pass", () => {
    expect(solveNQueens(4)).toEqual([
      [1, 3, 0, 2],
      [2, 0, 3, 1],
    ]);
  });
});
