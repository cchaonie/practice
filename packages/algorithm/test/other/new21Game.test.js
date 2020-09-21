const new21Game = require("../../src/other/new21Game");

describe("new21Game", () => {
  it("should pass", () => {
    expect(new21Game(10, 1, 10)).toEqual(1.0);
    expect(new21Game(6, 1, 10)).toEqual(0.6);
  });
});
