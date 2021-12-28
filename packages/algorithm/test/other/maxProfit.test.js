const { maxProfit } = require("../../src/other/maxProfit");

describe("maxProfit", () => {
  test("[7,1,5,3,6,4]", () => {
    expect(maxProfit([7,1,5,3,6,4])).toEqual(5);
  })
});