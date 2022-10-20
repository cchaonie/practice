export var kClosest = function (points, K) {
    function PQ(size) {
        this._data = new Array(size + 1);
        this._size = 0;
    }
    PQ.prototype.size = function () {
        return this._size;
    };
    PQ.prototype.isFull = function () {
        return this._data[this._data.length - 1] !== undefined;
    };
    PQ.prototype.left = function (i) {
        return i << 1;
    };
    PQ.prototype.right = function (i) {
        return this.left(i) + 1;
    };
    PQ.prototype.parent = function (i) {
        return i >> 1;
    };
    PQ.prototype.dequeue = function () {
        const max = this._data[1];
        if (this.size() === 1) {
            this._data[1] = undefined;
            this._size = 0;
        } else {
            this._data[1] = this._data[this.size()];
            this._data[this.size()] = undefined;
            this._size--;
            this._sink(1);
        }
        return max;
    };

    PQ.prototype.inqueue = function (key) {
        if (this.isFull()) {
            if (biggerThan(this._data[1], key)) {
                this.dequeue();
            } else {
                return false;
            }
        }
        this._size++;
        this._data[this.size()] = key;
        if (this.size() !== 1) {
            this._floatUp(this.parent(this.size()));
        }
        return true;
    };
    PQ.prototype._floatUp = function (j) {
        let maxIndex = j;
        let maxChild = this.left(j);
        if (
            this.right(j) <= this.size() &&
            biggerThan(this._data[this.right(j)], this._data[this.left(j)])
        ) {
            maxChild = this.right(j);
        }
        if (biggerThan(this._data[maxChild], this._data[maxIndex])) {
            maxIndex = maxChild;
        }
        if (maxIndex !== j) {
            const tmp = this._data[maxIndex];
            this._data[maxIndex] = this._data[j];
            this._data[j] = tmp;
            if (j !== 1) {
                this._floatUp(this.parent(j));
            }
        }
    };
    PQ.prototype._sink = function (j) {
        let maxIndex = j;
        let maxChild;
        if (this.left(j) <= this.size()) {
            maxChild = this.left(j);
            if (
                this.right(j) <= this.size() &&
                biggerThan(this._data[this.right(j)], this._data[this.left(j)])
            ) {
                maxChild = this.right(j);
            }
        }
        if (maxChild && biggerThan(this._data[maxChild], this._data[maxIndex])) {
            maxIndex = maxChild;
        }
        if (maxIndex !== j) {
            const tmp = this._data[maxIndex];
            this._data[maxIndex] = this._data[j];
            this._data[j] = tmp;
            this._sink(maxIndex);
        }
    };
    function biggerThan(a, b) {
        const [ax, ay] = points[a];
        const [bx, by] = points[b];
        return Math.pow(ax, 2) + Math.pow(ay, 2) - Math.pow(bx, 2) - Math.pow(by, 2) > 0;
    }
    const pq = new PQ(K);
    for (let i = 0; i < points.length; i++) {
        pq.inqueue(i);
    }
    const ret = [];
    while (pq.size()) {
        ret.push(points[pq.dequeue()]);
    }
    return ret;
};
