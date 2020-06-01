const { rob } = require("../../src/other/dynamicProgramming");

describe("rob", () => {
  it("should pass", () => {
    expect(rob([4,1,2,7,5,3,1])).toEqual(14);
  });
});