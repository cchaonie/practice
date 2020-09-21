const spiralOrder = require("../../src/other/spiralOrder");

describe("spiralOrder", () => {
  it("should pass", () => {
    expect(
      spiralOrder([[2,5],[8,4],[0,-1]])
    ).toEqual([2,5,4,-1,0,8]);
  });
});
