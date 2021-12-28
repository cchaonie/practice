const express = require("express");
const formidable = require("formidable");
const { retry, chunkSlice } = require("../utils");
const { createRecTask, describeTaskStatus } = require("../service/audio");
const contants = require("../utils/constants");

const router = express.Router();
const isRealResult = (res) => res.Data.Status === 2;
const retryDescribeTaskStatus = retry(describeTaskStatus, isRealResult, 30000);

function uploadImage(req, res, next) {
  const form = formidable({
    uploadDir: `${contants.fileDirPrefix}/image`,
    keepExtensions: true,
    multiples: true,
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
}

function uploadAudio(req, res, next) {
  const form = formidable({
    uploadDir: `${contants.fileDirPrefix}/audio`,
    keepExtensions: true,
    multiples: true,
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
  // const chunk = [];
  // req.on("data", (data) => {
  //   // console.log(`Received ${chunk.length} bytes of data.`);
  //   chunk.push(data);
  // });
  // req.on("end", () => {
  //   let chunkBufs = chunkSlice(Buffer.concat(chunk), 0.5 * 1024 * 1024);
  //   Promise.all(
  //     chunkBufs
  //       .filter((c, i) => i < 1)
  //       .map((buf) => createRecTask(buf.toString("base64")))
  //   )
  //     .then((responses) => {
  //       console.log("**********get remote response************");
  //       Promise.all(
  //         responses.map((res) => retryDescribeTaskStatus(res.Data.TaskId))
  //       ).then((result) => {
  //         console.log(
  //           `----------get translate result: ${result.toString()}-----------`
  //         );
  //         res.writeHead(200, {
  //           "content-type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         });
  //         res.end(JSON.stringify(result));
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       res.writeHead(404, {
  //         "content-type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       });
  //       res.end("<h1>404 Not FOUND</h1>");
  //     });
  // });
}

router.post("/audio", uploadAudio);
router.post("/image", uploadImage);
module.exports = router;
