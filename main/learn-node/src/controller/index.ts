import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { createRecTask, describeTaskStatus, retry } from "../utils";

const isRealResult = res => res.Data.Status === 2;
const retryDescribeTaskStatus = retry(describeTaskStatus, isRealResult, 30000);

export function controller(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = parse(req.url, true);
    if (url.path === "/upload") {
      handleUpload(req, res);
    } else {
      throw new Error("Page Not Found");
    }
  } catch (error) {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>404 Not FOUND</h1>");
  }
}

function handleUpload(req: IncomingMessage, res: ServerResponse) {
  const chunk = [];
  req.on("data", data => {
    // console.log(`Received ${chunk.length} bytes of data.`);
    chunk.push(data);
  });
  req.on("end", () => {
    let chunkBufs = chunkSlice(Buffer.concat(chunk), 0.5 * 1024 * 1024);
    // createRecTask(chunkBufs[0].toString("base64"))
    //   .then(result => {
    //     console.log(result);
    //     retryDescribeTaskStatus(result.Data.TaskId).then(result => {
    //       console.log(result);
    //       res.writeHead(200, { "content-type": "application/json" });
    //       res.end(JSON.stringify(result));
    //     });
    //   })
    //   .catch(e => {
    //     res.writeHead(500, { "content-type": "text/html" });
    //     res.end("<h1>500 Internal Server Error</h1>");
    //     console.log(e)
    //   });
    Promise.all(
      chunkBufs
        .filter((c, i) => i < 5)
        .map(buf => createRecTask(buf.toString("base64")))
    )
      .then(responses => {
        console.log("**********get remote response************");
        Promise.all(
          responses.map(res => retryDescribeTaskStatus(res.Data.TaskId))
        ).then(result => {
          console.log(result);
          res.writeHead(200, {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          });
          res.end(JSON.stringify(result));
        });
      })
      .catch(e => console.log(e));
  });
}

function chunkSlice(buf: Buffer, size: number): Buffer[] {
  console.log(buf.length);
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
