const maxProfit = require("../../../src/other/dynamicProgramming/maxProfit");

describe("maxProfit", () => {
    it("should pass", () => {
        expect(maxProfit([1,2,3,0,2])).toBe(3)
    })
    it("should pass", () => {
        expect(maxProfit([4,2,1])).toBe(0)
    })
})