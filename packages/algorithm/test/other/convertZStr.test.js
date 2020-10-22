const { convertZStr } = require("../../src/other/convertZStr");

describe("convertZStr", () => {
    it("should pass", () => {
        expect(convertZStr("LEETCODEISHIRING", 3)).toEqual("LCIRETOESIIGEDHN");
    });
});
