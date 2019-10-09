const { threeSum } = require("./threeSum");

describe("threeSum", () => {
  test("[-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0]", () => {
    const result = threeSum([-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0]);
    console.log(result)
    expect(result).toEqual([
      [-5,1,4],[-4,0,4],[-4,1,3],[-2,-2,4],[-2,1,1],[0,0,0]
    ]);
  })
})