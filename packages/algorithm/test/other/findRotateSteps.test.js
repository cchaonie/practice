import { findRotateSteps } from "../../src/other/findRotateSteps";

describe("findRotateSteps", () => {
    it("case 0", () => {
        expect(findRotateSteps("godding", "gd")).toBe(4);
    });
    it("case 1", () => {
        expect(findRotateSteps("godding", "godding")).toBe(13);
    });
    it("case 2", () => {
        expect(findRotateSteps("nyngl", "yyynnnnnnlllggg")).toBe(19);
    });

    it("case 3", () => {
        expect(
            findRotateSteps(
                "caotmcaataijjxi",
                "oatjiioicitatajtijciocjcaaxaaatmctxamacaamjjx",
            ),
        ).toBe(137);
    });
});
