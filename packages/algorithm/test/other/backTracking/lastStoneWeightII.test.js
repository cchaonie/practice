import { lastStoneWeightII } from "../../../src/other/backTracking/lastStoneWeightII";
describe("lastStoneWeightII", () => {
    it("should return 1", () => {
        expect(
            lastStoneWeightII([
                1,
                1,
                2,
                3,
                5,
                8,
                13,
                21,
                34,
                55,
                89,
                14,
                23,
                37,
                61,
                98,
            ]),
        ).toBe(1);
    });

    it("should return 0", () => {
        expect(lastStoneWeightII([1, 1, 2])).toBe(0);
    });
});
