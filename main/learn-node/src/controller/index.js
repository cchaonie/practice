import { parse } from "url";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { renderFile } from "ejs";
import { App } from "../view/react";
import { createRecTask, describeTaskStatus, retry, chunkSlice } from "../utils";

const isRealResult = res => res.Data.Status === 2;
const retryDescribeTaskStatus = retry(describeTaskStatus, isRealResult, 30000);

export default function(req, res) {
  try {
    const url = parse(req.url, true);
    if (url.path === "/upload") {
      handleUpload(req, res);
    } else if (url.path === "/ejs") {
      renderFile(
        path.resolve(__dirname, "../view/index.ejs"),
        {
          title: "learn node",
          data: "please select a record file"
        },
        (error, data) => {
          if (error) {
            console.log(error);
          }
          res.writeHead(200, {
            "Content-Type": "text/html"
          });
          res.end(data);
        }
      );
    } else if (url.path === "/react") {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      const html = renderToString(<App data={"please select a record file"} />);
      res.end(html);
    } else {
      throw new Error("Page Not Found");
    }
  } catch (error) {
    console.log(error);
    res.writeHead(404, { "content-type": "text/html" });
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
    let chunkBufs = chunkSlice(Buffer.concat(chunk), 0.5 * 1024 * 1024);
    Promise.all(
      chunkBufs
        .filter((c, i) => i < 1)
        .map(buf => createRecTask(buf.toString("base64")))
    )
      .then(responses => {
        console.log("**********get remote response************");
        Promise.all(
          responses.map(res => retryDescribeTaskStatus(res.Data.TaskId))
        ).then(result => {
          console.log(
            `----------get translate result: ${result.toString()}-----------`
          );
          res.writeHead(200, {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          });
          res.end(JSON.stringify(result));
        });
      })
      .catch(e => {
        console.log(e);
        res.writeHead(404, {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        });
        res.end("<h1>404 Not FOUND</h1>");
      });
  });
}
