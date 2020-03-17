"use strict";

var _controller = _interopRequireDefault(require("./controller"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 8181;
const app = (0, _express.default)();
app.use(_express.default.static("../dist"));
app.use(_controller.default);
app.listen(port, () => console.log(`listening port: ${port}`));