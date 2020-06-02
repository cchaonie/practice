const { isMatch } = require("../../../src/other/backTracking/isMatch");

describe("isMatch", () => {
  it("should pass", () => {
    expect(isMatch("aasbs", "a*s.*")).toBeTruthy();
  });
});
