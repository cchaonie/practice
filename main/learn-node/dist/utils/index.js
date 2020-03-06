"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tencentcloud = require("tencentcloud-sdk-nodejs");
var AsrClient = tencentcloud.asr.v20190614.Client;
var models = tencentcloud.asr.v20190614.Models;
var Credential = tencentcloud.common.Credential;
var ClientProfile = tencentcloud.common.ClientProfile;
var HttpProfile = tencentcloud.common.HttpProfile;
// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey
var cred = new Credential("AKIDdGsKRW6n252yAt75SkxtsZBlJmDX4You", "DLPPIF7quvJe4MZxLqJtY1Nbg1LbrIjA");
var httpProfile = new HttpProfile();
httpProfile.endpoint = "asr.tencentcloudapi.com";
var clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
var client = new AsrClient(cred, "", clientProfile);
function createRecTask(file) {
    console.log("---------------request: createRecTask---------------");
    var params = {
        Data: file,
        Action: "CreateRecTask",
        Version: "2019-06-14",
        EngineModelType: "16k_zh",
        ChannelNum: 1,
        ResTextFormat: 0,
        SourceType: 1
    };
    var req = new models.CreateRecTaskRequest();
    req.from_json_string(JSON.stringify(params));
    return new Promise(function (resolve, reject) {
        client.CreateRecTask(req, function (err, res) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(JSON.parse(res.to_json_string()));
        });
    });
}
exports.createRecTask = createRecTask;
function describeTaskStatus(TaskId) {
    console.log("---------------request: describeTaskStatus---------------");
    var params = {
        TaskId: TaskId
    };
    var req = new models.DescribeTaskStatusRequest();
    req.from_json_string(JSON.stringify(params));
    return new Promise(function (resolve, reject) {
        client.DescribeTaskStatus(req, function (err, res) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(JSON.parse(res.to_json_string()));
        });
    });
}
exports.describeTaskStatus = describeTaskStatus;
function retry(fn, test, delay) {
    var self = this;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var attempt = function () {
                fn.apply(self, args).then(function (data) {
                    console.log(data);
                    if (test(data)) {
                        resolve(data);
                    }
                    else {
                        setTimeout(attempt, delay);
                    }
                }).catch(reject);
            };
            attempt();
        });
    };
}
exports.retry = retry;
