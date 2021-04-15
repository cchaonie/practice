import tencentcloud from "tencentcloud-sdk-nodejs";
import fs from "fs";
import path from "path";

const AsrClient = tencentcloud.asr.v20190614.Client;
const models = tencentcloud.asr.v20190614.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey
let cred = new Credential(
  "AKIDdGsKRW6n252yAt75SkxtsZBlJmDX4You",
  "DLPPIF7quvJe4MZxLqJtY1Nbg1LbrIjA"
);
let httpProfile = new HttpProfile();
httpProfile.endpoint = "asr.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new AsrClient(cred, "", clientProfile);

export function createRecTask(file) {
  console.log("---------------request: createRecTask---------------");
  let params = {
    Data: file,
    Action: "CreateRecTask",
    Version: "2019-06-14",
    EngineModelType: "16k_zh",
    ChannelNum: 1,
    ResTextFormat: 0,
    SourceType: 1
  };
  let req = new models.CreateRecTaskRequest();
  req.from_json_string(JSON.stringify(params));
  return new Promise((resolve, reject) => {
    client.CreateRecTask(req, function(err, res) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(JSON.parse(res.to_json_string()));
    });
  });
}

export function describeTaskStatus(TaskId) {
  console.log("---------------request: describeTaskStatus---------------");
  const params = {
    TaskId
  };
  let req = new models.DescribeTaskStatusRequest();
  req.from_json_string(JSON.stringify(params));
  return new Promise((resolve, reject) => {
    client.DescribeTaskStatus(req, function(err, res) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(JSON.parse(res.to_json_string()));
    });
  });
}

export function retry(fn, test, delay) {
  const self = this;
  return (...args) => {
    return new Promise((resolve, reject) => {
      const attempt = () => {
        fn.apply(self, args)
          .then(data => {
            console.log(data);
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

export function chunkSlice(buf, size) {
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

export const getManifest = () => {
  console.log(__dirname)
  const content = fs.readFileSync(path.resolve(__dirname, "../../dist/manifest.json"));
  return JSON.parse(content);
};
