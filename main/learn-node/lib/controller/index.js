"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _url = require("url");

var _path = _interopRequireDefault(require("path"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _ejs = require("ejs");

var _react2 = require("../view/react");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isRealResult = res => res.Data.Status === 2;

const retryDescribeTaskStatus = (0, _utils.retry)(_utils.describeTaskStatus, isRealResult, 30000);

function _default(req, res) {
  try {
    const url = (0, _url.parse)(req.url, true);

    if (url.path === "/upload") {
      handleUpload(req, res);
    } else if (url.path === "/ejs") {
      (0, _ejs.renderFile)(_path.default.resolve(__dirname, "../view/index.ejs"), {
        title: "learn node",
        data: "please select a record file"
      }, (error, data) => {
        if (error) {
          console.log(error);
        }

        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.end(data);
      });
    } else if (url.path === "/react") {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      const html = (0, _server.renderToString)(_react.default.createElement(_react2.App, {
        data: "please select a record file"
      }));
      res.end(html);
    } else {
      throw new Error("Page Not Found");
    }
  } catch (error) {
    console.log(error);
    res.writeHead(404, {
      "content-type": "text/html"
    });
    res.end("<h1>404 Not FOUND</h1>");
  }
}

function handleUpload(req, res) {
  const chunk = [];
  req.on("data", data => {
    // console.log(`Received ${chunk.length} bytes of data.`);
    chunk.push(data);
  });
  req.on("end", () => {
    let chunkBufs = (0, _utils.chunkSlice)(Buffer.concat(chunk), 0.5 * 1024 * 1024);
    Promise.all(chunkBufs.filter((c, i) => i < 1).map(buf => (0, _utils.createRecTask)(buf.toString("base64")))).then(responses => {
      console.log("**********get remote response************");
      Promise.all(responses.map(res => retryDescribeTaskStatus(res.Data.TaskId))).then(result => {
        console.log(`----------get translate result: ${result.toString()}-----------`);
        res.writeHead(200, {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        });
        res.end(JSON.stringify(result));
      });
    }).catch(e => {
      console.log(e);
      res.writeHead(404, {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.end("<h1>404 Not FOUND</h1>");
    });
  });
}