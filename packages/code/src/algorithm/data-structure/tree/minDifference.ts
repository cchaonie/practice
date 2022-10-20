/**
 * @param {number[]} nums
 * @return {number}
 */
export const minDifference = function (nums: number[]) {
    if (nums.length <= 4) return 0;
    const left = (i: number) => i * 2 + 1;
    const right = (i: number) => left(i) + 1;
    const maxHeapify = (arr: number[], start: number, end: number) => {
        const l = left(start);
        const r = right(start);
        let max = start;
        if (l <= end && arr[max] < arr[l]) {
            max = l;
        }
        if (r <= end && arr[max] < arr[r]) {
            max = r;
        }
        if (max > start) {
            const t = arr[start];
            arr[start] = arr[max];
            arr[max] = t;
            maxHeapify(arr, max, end);
        }
    };

    const buildHeap = (arr: number[]) => {
        for (let i = (arr.length >> 1) + 1; i >= 0; i--) {
            maxHeapify(arr, i, arr.length - 1);
        }
    };

    const heapSort = (arr: number[]) => {
        buildHeap(arr);
        for (let i = 0; i < arr.length; i++) {
            const last = arr[arr.length - 1 - i];
            arr[arr.length - 1 - i] = arr[0];
            arr[0] = last;
            maxHeapify(arr, 0, arr.length - 1 - i - 1);
        }
    };

    heapSort(nums);
    let min = -1;
    for (let i = 0; i < 4; i++) {
        const maxIndex = nums.length - (4 - i);
        const abs = Math.abs(nums[maxIndex] - nums[i]);
        console.log(i, maxIndex, abs);
        min = min === -1 ? abs : Math.min(min, abs);
    }
    return min;
};
