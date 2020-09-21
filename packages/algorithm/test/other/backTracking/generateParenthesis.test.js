const generateParenthesis = require("../../../src/other/backTracking/generateParenthesis");

describe("generateParenthesis", () => {
  it.only("should pass", () => {
    const result = generateParenthesis(3);
    expect(result.includes("((()))")).toBeTruthy();
    expect(result.includes("((()))")).toBeTruthy();
    expect(result.includes("(()())")).toBeTruthy();
    expect(result.includes("(())()")).toBeTruthy();
    expect(result.includes("()(())")).toBeTruthy();
    expect(result.includes("()()()")).toBeTruthy();
  });
});
