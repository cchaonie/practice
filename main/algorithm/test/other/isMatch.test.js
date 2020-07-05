const isMatch = require("../../src/other/isMatch");

describe("isMatch", () => {
  it("should pass", () => {
    expect(isMatch("aa", "a")).toEqual(false);
  });
  it("should pass", () => {
    expect(isMatch("aa", "*")).toEqual(true);
  });
  it("should pass", () => {
    expect(isMatch("cb", "?a")).toEqual(false);
  });
  it("should pass", () => {
    expect(isMatch("adceb", "*a*b")).toEqual(true);
  });
  it("should pass", () => {
    expect(isMatch("acdcb", "a*c?b")).toEqual(false);
  });
  it("should pass", () => {
    expect(isMatch("", "**")).toEqual(true);
  });
  it("should pass", () => {
    expect(isMatch("mississippi", "m??*ss*?i*pi")).toEqual(false);
  });
  it("should pass", () => {
    expect(
      isMatch(
        "aaabbbaabaaaaababaabaaabbabbbbbbbbaabababbabbbaaaaba",
        "a*******b"
      )
    ).toEqual(false);
  });
});
