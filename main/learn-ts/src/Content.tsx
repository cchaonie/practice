import React, { useRef, FormEvent } from "react";

const isAudio = (fileType: string) => fileType.indexOf("audio") === -1;

const urlPrefix = "https://asr.tencentcloudapi.com"

export default function Content() {
  const fileInput = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    const { files } = fileInput.current;
    if (isAudio(files[0].type)) {
      alert("请上传音频文件");
    }
  };

  const submitFile = (e: FormEvent) => {
    e.preventDefault();
    const fileInput = useRef<HTMLInputElement>(null);
    const { files } = fileInput.current;
    if (isAudio(files[0].type)) {
      alert("请上传音频文件");
    }
    const file = files[0];
    const fileLength = file.size;
    const chunkNumber = Math.ceil((fileLength / 5) * 1024 * 1024) + 1;
    const params = {
      Action: "CreateRecTask",
      Version: "2019-06-14",
      EngineModelType: "16k_zh",
      ChannelNum: 1,
      SourceType: 1
    };

    let url = `${urlPrefix}/?${Object.keys(params).map(
      key => key + "=" + params[key] + "&"
    )}`;
    url = url.substring(0, url.length - 1);
    let chunks = [];
    const chunkLength = Math.ceil(fileLength / chunkNumber);
    for (let i = 0; i < chunkNumber; i++) {
      const start = i == 0 ? 0 : i * chunkLength;
      const end = i == chunkNumber - 1 ? fileLength : (i + 1) * chunkLength;
      chunks[i] = file.slice(start, end);
    }
    const reqs = [];
    chunks.forEach(c => {
      reqs.push(
        fetch(url, {
          body: c,
          method: "POST"
        })
      );
    });
    Promise.all(reqs).then(responses => {
        
    })
  };
  return (
    <form>
      <div>
        <label htmlFor="recordFile">select a record file:</label>
        <input
          type="file"
          name="recordFile"
          id="recordFile"
          ref={fileInput}
          onChange={onFileChange}
        />
      </div>
      <button type="submit" onClick={submitFile}>
        submit
      </button>
    </form>
  );
}
