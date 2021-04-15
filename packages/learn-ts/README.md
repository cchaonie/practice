## 请求接口域名：asr.tencentcloudapi.com
## 识别请求
请求参数：
参数名称 	必选 	类型 	描述
Action 	是 	String 	公共参数，本接口取值：CreateRecTask。
Version 	是 	String 	公共参数，本接口取值：2019-06-14。
Region 	否 	String 	公共参数，本接口不需要传递此参数。
EngineModelType 	是 	String 	引擎模型类型。
        8k_zh：电话 8k 中文普通话通用，可用于双声道音频的识别；
        8k_zh_s：电话 8k 中文普通话话者分离，仅用于单声道；
        16k_zh：16k 中文普通话通用；
        16k_en：16k 英语；
        16k_ca：16k 粤语。
ChannelNum 	是 	Integer 	语音声道数。1：单声道；2：双声道（仅在电话 8k 通用模型下支持）。
ResTextFormat 	是 	Integer 	识别结果返回形式。0：标准结果 1：含词时间戳列表结果(一般用于生成字幕场景)
SourceType 	是 	Integer 	语音数据来源。0：语音 URL；1：语音数据（post body）。
CallbackUrl 	否 	String 	回调 URL，用户自行搭建的用于接收识别结果的服务器地址， 长度小于2048字节。如果用户使用回调方式获取识别结果，需提交该参数；如果用户使用轮询方式获取识别结果，则无需提交该参数。
Url 	否 	String 	语音的URL地址，需要公网可下载。长度小于2048字节，当 SourceType 值为 0 时须填写该字段，为 1 时不需要填写。注意：请确保录音文件时长在一个小时之内，否则可能识别失败。请保证文件的下载速度，否则可能下载失败。
Data 	否 	String 	语音数据，当SourceType 值为1时必须填写，为0可不写。要base64编码(采用python语言时注意读取文件应该为string而不是byte，以byte格式读取后要decode()。编码后的数据不可带有回车换行符)。音频数据要小于5MB。
DataLen 	否 	Integer 	数据长度，当 SourceType 值为1时必须填写，为0可不写（此数据长度为数据未进行base64编码时的数据长度）。
HotwordId 	否 	String 	热词id。用于调用对应的热词表，如果在调用语音识别服务时，不进行单独的热词id设置，自动生效默认热词；如果进行了单独的热词id设置，那么将生效单独设置的热词id。

## 识别结果查询
参数名称 	必选 	类型 	描述
Action 	是 	String 	公共参数，本接口取值：DescribeTaskStatus。
Version 	是 	String 	公共参数，本接口取值：2019-06-14。
Region 	否 	String 	公共参数，本接口不需要传递此参数。
TaskId 	是 	Integer 	从CreateRecTask接口获取的TaskId，用于获取任务状态与结果。