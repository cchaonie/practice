const { findNumber } = require("../../src/other/findNumber");

describe("findNumber", () => {
  test("1", () => {
    expect(findNumber([5
      , 1
      , 2
      , 3
      , 4
      , 5
      , 1], 5)).toEqual("YES");
      expect(findNumber([5
        , 1
        , 2
        , 3
        , 4
        , 5
        , 1], 6)).toEqual("NO");
  })
})