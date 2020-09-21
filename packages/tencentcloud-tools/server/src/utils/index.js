const fs = require( "fs");
const path = require( "path");

function retry(fn, test, delay) {
  const self = this;
  return (...args) => {
    return new Promise((resolve, reject) => {
      const attempt = () => {
        fn.apply(self, args)
          .then(data => {
            if (test(data)) {
              resolve(data);
            } else {
              setTimeout(attempt, delay);
            }
          })
          .catch(reject);
      };
      attempt();
    });
  };
}

function chunkSlice(buf, size) {
  let chunks = [];
  const chunkNumber = Math.ceil(buf.length / size) + 1;
  const chunkLength = Math.ceil(buf.length / chunkNumber);
  let start = 0;
  let end = chunkLength;
  while (end <= buf.length) {
    chunks.push(buf.slice(start, end));
    start = end;
    end += chunkLength;
  }
  return chunks;
}

const getManifest = () => {
  const content = fs.readFileSync(path.resolve(__dirname, "../../dist/manifest.json"));
  return JSON.parse(content);
};

module.exports = {
  getManifest,
  chunkSlice,
  retry,
}
