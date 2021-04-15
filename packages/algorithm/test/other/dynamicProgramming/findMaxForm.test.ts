import { findMaxForm, findMaxFormSpaceCompress, maxValue } from "../../../src/other/dynamicProgramming/findMaxForm";

describe("findMaxForm", () => {
    it("should pass", () => {
        expect(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)).toBe(4);
    });
    it("should pass", () => {
        expect(findMaxFormSpaceCompress(["10", "0001", "111001", "1", "0"], 5, 3)).toBe(4);
    });
    it.only("should pass", () => {
        expect(
            maxValue(5, [
                {
                    value: 1,
                    volume: 1,
                },
                {
                    value: 1.5,
                    volume: 3,
                },
                {
                    value: 2,
                    volume: 3,
                },
                {
                    value: 3,
                    volume: 4,
                },
            ])
        ).toBe(4);
    });
});
