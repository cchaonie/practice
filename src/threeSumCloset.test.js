const { threeSumCloset } = require("./threeSumCloset");

describe("threeSum", () => {
  test("[1,2,4,8,16,32,64,128], 82 => 82", () => {
    expect(threeSumCloset([1,2,4,8,16,32,64,128], 82)).toEqual(82);
  })
})