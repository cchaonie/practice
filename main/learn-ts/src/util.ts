import sha256 from "crypto-js/sha256";
import hmacSHA256 from "crypto-js/hmac-sha256";
import hex from "crypto-js/enc-Hex";

const urlPrefix = "https://asr.tencentcloudapi.com";

function request(params) {
  const { queryString, ...rest } = params;
  return fetch(`${urlPrefix}/?${queryString}`, rest)
    .then(res => res.json())
    .catch(e => {
      console.log(e);
      return e;
    });
}

function qs(paramMap) {
  return Object.keys(paramMap)
    .map(key => key + "=" + paramMap[key])
    .join("&");
}

export function createRecTask(file: string) {
  const paramMap = {
    Action: "CreateRecTask",
    Version: "2019-06-14",
    EngineModelType: "16k_zh",
    ChannelNum: 1,
    SourceType: 1
  };
  const today = new Date();
  return request({
    queryString: qs(paramMap),
    method: "POST",
    headers: {
      "X-TC-Action": "CreateRecTask",
      "X-TC-Timestamp": today.getTime(),
      "X-TC-Version": "2019-06-14",
      Authorization: authorize(
        "POST",
        qs(paramMap),
        "application/json",
        file,
        today
      )
    },
    body: file
  });
}

export function describeTaskStatus(taskId) {
  const paramMap = {
    Action: "DescribeTaskStatus",
    Version: "2019-06-14",
    TaskId: taskId
  };
  const today = new Date();
  return request({
    queryString: qs(paramMap),
    method: "GET",
    headers: {
      "X-TC-Action": "CreateRecTask",
      "X-TC-Timestamp": today.getTime(),
      "X-TC-Version": "2019-06-14",
      Authorization: authorize(
        "GET",
        qs(paramMap),
        "application/json",
        "",
        today
      )
    }
  });
}

/**
 *
 * @param HTTPRequestMethod 请求方法（GET、POST ）
 * @param CanonicalQueryString 发起 HTTP 请求 URL 中的查询字符串
 * @param contentType
 * @param jsonDataPost
 * @param today
 */
export function authorize(
  HTTPRequestMethod,
  CanonicalQueryString,
  contentType: string,
  jsonDataPost: string,
  today: Date
) {
  // 第一步
  let CanonicalURI = "/";
  let CanonicalHeaders = `content-type:${contentType}\nhost:cvm.tencentcloudapi.com\n`;
  let SignedHeaders = "content-type;host";
  let HashedRequestPayload = sha256(encodeURI(jsonDataPost))
    .toString()
    .toLowerCase();
  // 拼接规范请求串
  let CanonicalRequest =
    HTTPRequestMethod +
    "\n" +
    CanonicalURI +
    "\n" +
    CanonicalQueryString +
    "\n" +
    CanonicalHeaders +
    "\n" +
    SignedHeaders +
    "\n" +
    HashedRequestPayload;
  console.log("完成第一步", CanonicalRequest);

  // 第二步
  // 签名算法，目前固定为 TC3-HMAC-SHA256；
  let Algorithm = "TC3-HMAC-SHA256";
  // 请求时间戳，即请求头部的 X-TC-Timestamp 取值，如上示例请求为 1539084154；
  let RequestTimestamp = today.getTime();
  let RequestUTCDate = `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`;
  // 凭证范围，格式为 Date/service/tc3_request，包含日期、所请求的服务和终止字符串（tc3_request）。Date 为 UTC 标准时间的日期，取值需要和公共参数 X-TC-Timestamp 换算的 UTC 标准时间日期一致；service 为产品名，必须与调用的产品域名一致，例如 cvm。如上示例请求，取值为 2018-10-09/cvm/tc3_request；
  let CredentialScope = `${RequestUTCDate}/asr/tc3_request`;
  // 前述步骤拼接所得规范请求串的哈希值，计算方法为 Lowercase(HexEncode(Hash.SHA256(CanonicalRequest)))。
  let HashedCanonicalRequest = sha256(CanonicalRequest)
    .toString()
    .toLowerCase();
  let StringToSign =
    Algorithm +
    "\n" +
    RequestTimestamp +
    "\n" +
    CredentialScope +
    "\n" +
    HashedCanonicalRequest;
  console.log("完成第二步", StringToSign);

  // 第三步
  let SecretKey = "DLPPIF7quvJe4MZxLqJtY1Nbg1LbrIjA";
  let SecretDate = hmacSHA256("TC3" + SecretKey, RequestUTCDate).toString();
  let SecretService = hmacSHA256(SecretDate, "asr").toString();
  let SecretSigning = hmacSHA256(SecretService, "tc3_request");
  let Signature = hex.stringify(hmacSHA256(StringToSign, SecretSigning));
  console.log("完成第三步", Signature);

  // 第四步
  let SecretId = "AKIDdGsKRW6n252yAt75SkxtsZBlJmDX4You";
  let Authorization =
    Algorithm +
    " " +
    "Credential=" +
    SecretId +
    "/" +
    CredentialScope +
    ", " +
    "SignedHeaders=" +
    SignedHeaders +
    ", " +
    "Signature=" +
    Signature;
  console.log("完成第四步", Authorization);
  return Authorization;
}

export function blobToDataUrl(blob: Blob) {
  return new Promise((resolve, reject) => {
    try {
      let fr = new FileReader();
      fr.onload = e => resolve(e.target.result);
      fr.readAsDataURL(blob);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
