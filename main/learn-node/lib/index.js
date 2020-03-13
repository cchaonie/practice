"use strict";

var _http = require("http");

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 8181;
const server = (0, _http.createServer)();
server.on('request', _controller.default);
server.listen(port, () => console.log(`listening port: ${port}`));