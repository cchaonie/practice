const {
    getMoneyAmount,
} = require("../../../src/other/dynamicProgramming/getMoneyAmount");

describe("getMoneyAmount", () => {
    it("should pass", () => {
        expect(getMoneyAmount(10)).toEqual(16);
    });
});
