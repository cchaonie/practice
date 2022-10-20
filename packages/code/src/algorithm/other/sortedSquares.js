module.exports = function sortedSquares(A) {
    const merge = (arr, low) => {
        const temp = [];
        let lp = low;
        let rp = low + 1;
        while (lp > -1 && rp < A.length) {
            if (Math.pow(arr[lp], 2) < Math.pow(arr[rp], 2)) {
                temp.push(Math.pow(arr[lp--], 2));
            } else {
                temp.push(Math.pow(arr[rp++], 2));
            }
        }
        while (lp > -1) {
            temp.push(Math.pow(arr[lp--], 2));
        }
        while (rp < A.length) {
            temp.push(Math.pow(arr[rp++], 2));
        }
        return temp;
    };
    let left = 0;
    while (left < A.length) {
        if (A[left] < 0) {
            left++;
        } else {
            break;
        }
    }
    return merge(A, left - 1);
};
