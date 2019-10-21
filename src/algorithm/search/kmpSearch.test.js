const { next, customIndexOf } = require("./kmpSearch");

describe("kmpSearch", () => {
  test("next", () => {
    let result = next('abcdabde');
    expect(result).toEqual([-1, 0, 0, 0, 0, 1, 2, 0]);
  });
  test("customIndexOf", () => {
    let result = customIndexOf('abcdabde', 'abd');
    expect(result).toEqual(4);
  })
})