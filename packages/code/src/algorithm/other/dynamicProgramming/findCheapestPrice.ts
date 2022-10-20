export function findCheapestPrice1(
    n: number,
    flights: number[][],
    src: number,
    dst: number,
    K: number,
): number {
    const memo: {
        [index: string]: number;
    } = {};
    const findPrice = (s: number, d: number, k: number): number => {
        if (memo[`${s}${d}${k}`]) return memo[`${s}${d}${k}`];
        if (k === 0) {
            const prices = flights
                .filter(([start, end]) => s === start && d === end)
                .map((f) => f[2]);
            return prices.length > 0 ? Math.min(...prices) : -1;
        }
        const lastPrices = flights
            .filter(([start, end]) => end === d)
            .map(([start, end, price]) => {
                if (start === s) {
                    return price;
                }
                const p = findPrice(s, start, k - 1);
                memo[`${s}${start}${k - 1}`] = p;
                return p === -1 ? -1 : p + price;
            })
            .filter((p) => p !== -1);
        return lastPrices.length > 0 ? Math.min(...lastPrices) : -1;
    };

    return findPrice(src, dst, K);
}

export function findCheapestPrice(
    n: number,
    flights: number[][],
    src: number,
    dst: number,
    K: number,
): number {
    const dp: number[][][] = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            dp[i][j] = new Array(K + 1);
        }
    }
    const findDst = (src: number) => flights.filter((f) => f[0] === src);
    const calculate = (src: number, dst: number, k: number): number => {
        if (dp[src][dst][k]) return dp[src][dst][k];
        const stops = findDst(src);
        let min = -1;
        if (k === 0) {
            const ends = stops.filter((f) => f[1] === dst);
            if (ends.length === 0) {
                return -1;
            } else {
                ends.forEach((f) => {
                    min = min === -1 ? f[2] : Math.min(min, f[2]);
                });
                return min;
            }
        } else {
            for (const d of stops) {
                if (d[1] === dst) {
                    dp[src][dst][0] = d[2];
                }
                const nextSegmentPrice = calculate(d[1], dst, k - 1);
                if (nextSegmentPrice !== -1) {
                    min =
                        min === -1
                            ? nextSegmentPrice + d[2]
                            : Math.min(d[2] + nextSegmentPrice, min);
                }
            }
        }
        return min;
    };

    for (let k = 0; k <= K; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                dp[i][j][k] = calculate(i, j, k);
            }
        }
    }

    let cheapest = -1;
    for (let k = 0; k <= K; k++) {
        if (dp[src][dst][k] != -1) {
            cheapest =
                cheapest === -1 ? dp[src][dst][k] : Math.min(dp[src][dst][k], cheapest);
        }
    }

    return cheapest;
}
