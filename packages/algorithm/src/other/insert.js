export var insert = function (intervals, newInterval) {
    const addNew = (intervals, newInterval) => {
        const [start] = newInterval;
        let index = 0;
        while (index < intervals.length) {
            if (intervals[index][0] < start) {
                index++;
            } else {
                break;
            }
        }
        if (index === 0) {
            intervals.unshift(newInterval);
        } else if (index === intervals.length) {
            intervals.push(newInterval);
        } else {
            intervals.splice(index > 0 ? index - 1 : 0, 0, newInterval);
        }
    };

    // aS 一定 在最左边
    const checkIntervals = (a, b) => {
        const [aS, aE] = a;
        const [bS, bE] = b;
        if (bS > aE) {
            return 1; // aS, aE, bS, bE
        } else if (bS <= aE && bE > aE) {
            return 2; // aS, bS, aE, bE
        } else {
            return 3; // aS, bS, bE, aE
        }
    };

    const merge = (intervals, start, end) => {
        if (start === end) return intervals;
        for (let i = end - 1; i >= start; i--) {
            const ret = checkIntervals(intervals[i], intervals[i + 1]);
            if (ret === 3) {
                intervals.splice(i + 1, 1);
                merge(intervals, i, Math.min(intervals.length - 1, end));
            } else if (ret === 2) {
                intervals[i] = [intervals[i][0], intervals[i + 1][1]];
                intervals.splice(i + 1, 1);
                merge(intervals, i, Math.min(intervals.length - 1, end));
            }
        }
    };

    addNew(intervals, newInterval);
    merge(intervals, 0, intervals.length - 1);
    return intervals;
};
