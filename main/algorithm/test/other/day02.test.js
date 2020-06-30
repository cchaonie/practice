const {
  checkRomanNumber,
  calculateTicketPrice,
} = require("../../src/other/day02");

describe("checkRomanNumber", () => {
    it("should pass", () => {
        expect(checkRomanNumber("IV")).toBe(4);
    })
})

describe("calculateTicketPrice", () => {
    it("should pass", () => {
        expect(calculateTicketPrice({
            age: 50,
            gender: "F",
            isBringChildren: true
        }, 5)).toBe(108);
    })
})