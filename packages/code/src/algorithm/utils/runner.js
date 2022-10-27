exports.run = function (obj, methods, parameters) {
  for (let i = 0; i < methods.length; i += 1) {
    try {
      const ret = obj[methods[i]](...parameters[i]);
      if (ret) {
        console.log(ret);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
