/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
export var isIsomorphic = function (s: string, t: string) {
    const calc = (str: string): Map<string, Array<number>> => {
        const map = new Map();
        for (let i = 0; i < str.length; ++i) {
            const c = str.charAt(i);
            const indexArray = map.get(c);
            if (indexArray) {
                indexArray.push(i);
            } else {
                map.set(c, [i]);
            }
        }
        return map;
    };

    const v1 = [...calc(s).values()];
    const v2 = [...calc(t).values()];

    console.log(v1, v2);

    if (v1.length != v2.length) return false;

    for (let i = 0; i < v1.length; ++i) {
        for (let j = 0; j < v1[i].length; ++j) {
            if (v1[i].length != v2[i].length) return false;
            if (v1[i][j] !== v2[i][j]) return false;
        }
    }
    return true;
};
