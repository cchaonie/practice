function createConnect() {
  let taskQueue = [];
  const connect = (req, res) => {
    let i = 0;
    function next() {
      var task = taskQueue[i++]; // 取出函数数组里的下一个函数
      if (!task) {
        // 如果函数不存在,return
        return;
      }
      task(req, res, next); // 否则,执行下一个函数
    }
    next();
  };
  connect.use = (middlewareFn) => {
    taskQueue.push(middlewareFn);
  };
  return connect;
}

module.exports = {
  createConnect,
};
