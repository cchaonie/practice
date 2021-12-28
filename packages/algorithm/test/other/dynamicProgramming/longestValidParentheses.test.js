const longestValidParentheses = require("../../../src/other/dynamicProgramming/longestValidParentheses");

describe("longestValidParentheses", () => {
  it("should pass", () => {
    expect(longestValidParentheses(")()())")).toEqual(4);
  });
  it("should pass", () => {
    expect(longestValidParentheses("(()")).toEqual(2);
  });
  it.only("should pass", () => {
    expect(longestValidParentheses("(()())")).toEqual(6);
  });
  it("should pass", () => {
    expect(longestValidParentheses( "()(()")).toEqual(2);
  });
});
