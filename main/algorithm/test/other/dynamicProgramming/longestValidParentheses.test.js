const longestValidParentheses = require("../../../src/other/dynamicProgramming/longestValidParentheses");

describe("longestValidParentheses", () => {
  it("should pass", () => {
    expect(longestValidParentheses(")()())")).toEqual(4);
  });
});
