const { isLongPressedName } = require("../../src/other/isLongPressedName");

describe("isLongPressedName", () => {
    it("should pass", () => {
        expect(isLongPressedName("vtkgn", "vttkgnn")).toBeTruthy();
    });

    it("should pass", () => {
        expect(isLongPressedName("alex", "alexxr")).toBeFalsy();
    });

    it("should pass", () => {
        expect(isLongPressedName("pyplrz", "ppyypllr")).toBeFalsy();
    });
});
