const { next } = require("./kmpSearch");

describe("kmpSearch", () => {
  test("next", () => {
    let result = next('abcdabde');
    console.log(result);
    expect(result).toEqual([-1, 0, 0, 0, 0, 1, 2, 0]);
  })
})