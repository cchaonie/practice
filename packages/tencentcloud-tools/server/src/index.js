const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uploadController = require("./controller/upload");

const port = process.env.PORT || 8181;
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use("/upload", uploadController);
app.listen(port, () => console.log(`listening port: ${port}`));
