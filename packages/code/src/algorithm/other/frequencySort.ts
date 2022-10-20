export function frequencySort(s: string): string {
    const calc = (str: string): Map<string, number> => {
        const map = new Map();
        for (let i = 0; i < str.length; ++i) {
            const c = str.charAt(i);
            const count = map.get(c);
            if (count) {
                map.set(c, count + 1);
            } else {
                map.set(c, 1);
            }
        }
        return map;
    };
    const map = calc(s);
    const entries = map.entries();
    const sorted = [...entries].sort((a, b) => {
        const [k1, v1] = a;
        const [k2, v2] = b;
        return v2 - v1;
    });
    return sorted.reduce<string>((a, b) => {
        const [k, v] = b;
        for (let i = 0; i < v; ++i) {
            a += k;
        }
        return a;
    }, "");
};