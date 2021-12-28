const { pathSum } = require("../../../src/data-structure/tree/pathSum");
const { binaryTreeLayerGenerator }  = require("../../../src/data-structure/tree/definition");

describe("pathSum", () => {
  test("[5,4,8,11,null,13,4,7,2,null,null,5,1]", () => {
    let t = binaryTreeLayerGenerator([5,4,8,11,null,13,4,7,2,null,null,5,1])
    expect(pathSum(t, 22)).toEqual([
      [5,4,11,2],
      [5,8,4,5]
   ]);
  })
})