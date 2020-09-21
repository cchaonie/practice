const respace = require("../../src/other/respace");

describe("respace", () => {
  it("should pass", () => {
    const dictionary = ["looked", "just", "like", "her", "brother"];
    const sentence = "jesslookedjustliketimherbrother";
    expect(respace(dictionary, sentence)).toBe(7);
  });
});
