var ladderLength_1 = function (beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return 0;

    const getWordOptions = (w, wordList) => {
        const ret = [];
        const restWord = wordList;
        for (let j = 0; j < restWord.length; j++) {
            if (w.length === restWord[j].length) {
                let diffCount = 0;
                for (let i = 0; i < w.length; i++) {
                    if (w.charAt(i) !== restWord[j].charAt(i)) {
                        diffCount++;
                    }
                    if (diffCount > 1) {
                        break;
                    }
                }
                if (diffCount === 1) {
                    ret.push(j);
                }
            }
        }
        return ret;
    };

    const map = new Map();
    for (let i = 0; i < wordList.length; i++) {
        map.set(wordList[i], i);
    }
    map.set(beginWord, wordList.length);

    const graph = new Array(wordList.length + 1);
    for (let i = 0; i < graph.length - 1; i++) {
        graph[i] = getWordOptions(wordList[i], wordList);
    }
    graph[graph.length - 1] = getWordOptions(beginWord, wordList);

    let ret = 0;
    let currs = [[graph.length - 1]];
    const visited = [];
    while (currs.length) {
        const layerCount = currs.length;
        ret = layerCount;
        const layer = currs[layerCount - 1];
        for (const curr of layer) {
            if (visited.includes(curr)) {
                continue;
            }
            visited.push(curr);
            const options = graph[curr].filter((c) => !visited.includes(c));
            if (options.indexOf(map.get(endWord)) > -1) {
                return ret + 1;
            } else {
                if (!currs[layerCount]) {
                    currs[layerCount] = options;
                } else {
                    currs[layerCount] = currs[layerCount].concat(options);
                }
            }
        }
        if (currs[layerCount] && currs[layerCount].length === 0) {
            return 0;
        }
    }
    return ret;
};

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
export var ladderLength = function (beginWord, endWord, wordList) {
    if (wordList.indexOf(endWord) === -1) return 0;
    let getCount = 0;
    const getWordOptions = (w, wordList) => {
        getCount++;
        const ret = [];
        const restWord = wordList;
        for (let j = 0; j < restWord.length; j++) {
            if (w.length === restWord[j].length) {
                let diffCount = 0;
                for (let i = 0; i < w.length; i++) {
                    if (w.charAt(i) !== restWord[j].charAt(i)) {
                        diffCount++;
                    }
                    if (diffCount > 1) {
                        break;
                    }
                }
                if (diffCount === 1) {
                    ret.push(restWord[j]);
                }
            }
        }
        return ret;
    };
    let ret = 0;
    let currs = [[beginWord]];
    while (currs.length) {
        const layerCount = currs.length;
        ret = layerCount;
        const layer = currs[layerCount - 1];
        for (const curr of layer) {
            const currWordList = wordList.filter((word) => {
                for (let i = 0; i < currs.length; i++) {
                    const l = currs[i];
                    if (l.includes(word)) {
                        return false;
                    }
                }
                return true;
            });
            const options = getWordOptions(curr, currWordList);
            if (options.indexOf(endWord) > -1) {
                return ret + 1;
            } else {
                if (!currs[layerCount]) {
                    currs[layerCount] = options;
                } else {
                    currs[layerCount] = currs[layerCount].concat(options);
                }
            }
        }
        if (currs[layerCount] && currs[layerCount].length === 0) {
            return 0;
        }
    }
    console.log(getCount);
    return ret;
};
