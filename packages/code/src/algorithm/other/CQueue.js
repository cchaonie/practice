var CQueue = function () {
  this.in = [];
  this.out = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.in.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.out.length) {
    return this.out.pop();
  }
  while (this.in.length) {
    this.out.push(this.in.pop());
  }
  return this.out.length ? this.out.pop() : -1;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

module.exports = CQueue;
