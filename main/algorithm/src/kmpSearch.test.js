const { next } = require("./kmpSearch");

describe("kmpSearch", () => {
  test("next", () => {
    let result = next('abcdabde');
    expect(result).toEqual([-1, 0, 0, 0, 0, 1, 2, 0]);
  })
})