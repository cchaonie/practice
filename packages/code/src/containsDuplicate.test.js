const { containsDuplicate } = require("./containsDuplicate")

describe("containsDuplicate", () => {
  // test("[0]", () => {
  //   expect(containsDuplicate([0])).toEqual(false);
  // });
  test("[2,14,18,22,22]", () => {
    expect(containsDuplicate([2,14,18,22,22])).toEqual(true);
  })
})