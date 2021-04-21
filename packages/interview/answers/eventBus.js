class EventBus {
  // 是否需要限制listener的数量
  // 同一个listener多次add 应当如何处理
  addListener(event, listener) {
    this.map[event].push(listener);
  }
  removeListener(event, listener) {
    const listeners = this.map[event];
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
      return true;
    }
    return false;
  }
  dispatch(event) {
    const listeners = this.map[event];
    for (const l of listeners) {
      l.call(null, event);
    }
  }
}
