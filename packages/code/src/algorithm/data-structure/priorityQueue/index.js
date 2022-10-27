const { run } = require('../../utils/runner');

function MinHeap() {
  this.data = [undefined];
}

MinHeap.prototype.getSize = function () {
  return this.data.length - 1;
};

MinHeap.prototype.addNum = function (num) {
  this.data.push(num);
  this.lift(this.data.length - 1);
};

MinHeap.prototype.peek = function () {
  return this.data[1];
};

MinHeap.prototype.takeMin = function () {
  if (this.getSize() > 0) {
    if (this.getSize() === 1) {
      return this.data.pop();
    }
    const ret = this.data[1];
    this.data[1] = this.data.pop();
    this.sink(1);
    return ret;
  }
  return null;
};

MinHeap.prototype.exchange = function (i, j) {
  let tmp = this.data[i];
  this.data[i] = this.data[j];
  this.data[j] = tmp;
};

MinHeap.prototype.lift = function (index) {
  while (index > 1 && this.data[index] < this.data[Math.floor(index / 2)]) {
    this.exchange(index, Math.floor(index / 2));
    index = Math.floor(index / 2);
  }
};

MinHeap.prototype.sink = function (index) {
  while (index * 2 <= this.getSize()) {
    let j = index * 2;
    if (j < this.getSize() && this.data[j] > this.data[j + 1]) {
      j += 1;
    }
    if (this.data[index] > this.data[j]) {
      this.exchange(index, j);
      index = j;
    } else {
      break;
    }
  }
};

function MaxHeap() {
  this.data = [undefined];
}

MaxHeap.prototype.getSize = function () {
  return this.data.length - 1;
};

MaxHeap.prototype.addNum = function (num) {
  this.data.push(num);
  this.lift(this.data.length - 1);
};

MaxHeap.prototype.peek = function () {
  return this.data[1];
};

MaxHeap.prototype.takeMax = function () {
  if (this.getSize() > 0) {
    if (this.getSize() === 1) {
      return this.data.pop();
    }
    const ret = this.data[1];
    this.data[1] = this.data.pop();
    this.sink(1);
    return ret;
  }
  return null;
};

MaxHeap.prototype.exchange = function (i, j) {
  let tmp = this.data[i];
  this.data[i] = this.data[j];
  this.data[j] = tmp;
};

MaxHeap.prototype.lift = function (index) {
  while (index > 1 && this.data[index] > this.data[Math.floor(index / 2)]) {
    this.exchange(index, Math.floor(index / 2));
    index = Math.floor(index / 2);
  }
};

MaxHeap.prototype.sink = function (index) {
  while (index * 2 <= this.getSize()) {
    let j = index * 2;
    if (j < this.getSize() && this.data[j] < this.data[j + 1]) {
      j += 1;
    }
    if (this.data[index] < this.data[j]) {
      this.exchange(index, j);
      index = j;
    } else {
      break;
    }
  }
};

const MedianFinder = function () {
  this.l = new MinHeap();
  this.r = new MaxHeap();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.l.peek() === undefined) {
    this.l.addNum(num);
  } else {
    if (this.l.peek() <= num) this.l.addNum(num);
    else this.r.addNum(num);

    if (this.l.getSize() - this.r.getSize() > 1) {
      this.r.addNum(this.l.takeMin());
    }
    if (this.r.getSize() - this.l.getSize() > 1) {
      this.l.addNum(this.r.takeMax());
    }
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.l.getSize() === this.r.getSize()) {
    return (this.l.peek() + this.r.peek()) / 2;
  } else if (this.l.getSize() > this.r.getSize()) {
    return this.l.peek();
  } else {
    return this.r.peek();
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

const obj = new MedianFinder();

run(
  obj,
  ['addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'],
  [[1], [], [2], [], [4], []]
);
