export var sortString = function (s) {
    const findMinChar = (charArray, start, end, target) => {
        let minIndex = -1;
        for (let i = start; i < end; i++) {
            if (!target) {
                if (minIndex === -1) {
                    minIndex = i;
                } else {
                    minIndex = charArray[minIndex] < charArray[i] ? minIndex : i;
                }
            } else {
                if (charArray[i] > target) {
                    if (minIndex === -1) {
                        minIndex = i;
                    } else {
                        minIndex = charArray[minIndex] < charArray[i] ? minIndex : i;
                    }
                }
            }
        }
        return minIndex;
    };

    const findMaxChar = (charArray, start, end, target) => {
        let maxIndex = -1;
        for (let i = start; i < end; i++) {
            if (!target) {
                if (maxIndex === -1) {
                    maxIndex = i;
                } else {
                    maxIndex = charArray[maxIndex] > charArray[i] ? maxIndex : i;
                }
            } else {
                if (charArray[i] < target) {
                    if (maxIndex === -1) {
                        maxIndex = i;
                    } else {
                        maxIndex = charArray[maxIndex] > charArray[i] ? maxIndex : i;
                    }
                }
            }
        }
        return maxIndex;
    };
    const charArray = s.split("");
    let step = 1;
    let isFirst = true;
    for (let i = charArray.length; i > 0; i--) {
        if (step) {
            const minIndex = findMinChar(
                charArray,
                0,
                i,
                isFirst ? undefined : charArray[charArray.length - 1],
            );
            if (minIndex != -1) {
                const char = charArray[minIndex];
                charArray.splice(minIndex, 1);
                charArray.push(char);
                if (isFirst) {
                    isFirst = false;
                }
            } else {
                step = 0;
                isFirst = true;
                i++;
            }
        } else {
            const maxIndex = findMaxChar(
                charArray,
                0,
                i,
                isFirst ? undefined : charArray[charArray.length - 1],
            );
            if (maxIndex != -1) {
                const char = charArray[maxIndex];
                charArray.splice(maxIndex, 1);
                charArray.push(char);
                if (isFirst) {
                    isFirst = false;
                }
            } else {
                step = 1;
                isFirst = true;
                i++;
            }
        }
    }
    return charArray.join("");
};
