const {
    pickStone,
} = require("../../src/other/day03");

describe("pickStone", () => {
    it("should pass", () => {
        const result = pickStone(10);
        console.log(result);
        
        expect(result).toBe(4);
    })
})