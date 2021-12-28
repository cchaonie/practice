function retry(task, times) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      task.then(resolve).catch((err) => {
        if (!times) {
          reject(err);
        } else {
          times--;
          attempt();
        }
      });
    };
    attempt();
  });
}
