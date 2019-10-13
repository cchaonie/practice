const { minDepth } = require("./minDepth");
const { binaryTreeLayerGenerator }  = require("./definition");

describe("minDepth", () => {
  test("[3,9]", () => {
    let t = binaryTreeLayerGenerator([3,9])
    expect(minDepth(t)).toEqual(2);
  })
})