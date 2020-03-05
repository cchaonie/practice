import React, { useRef, FormEvent } from "react";
import { createRecTask, describeTaskStatus, blobToDataUrl } from "./util";

export function Content() {
  const isAudio = (fileType: string) => fileType.indexOf("audio") === -1;
  const fileInput = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    const { files } = fileInput.current;
    if (isAudio(files[0].type)) {
      alert("请上传音频文件");
    }
  };

  const submitFile = (e: FormEvent) => {
    e.preventDefault();
    debugger;
    const { files } = fileInput.current;
    if (isAudio(files[0].type)) {
      alert("请上传音频文件");
    }
    const file = files[0];
    const fileLength = file.size;
    const chunkNumber = Math.ceil(fileLength / (5 * 1024 * 1024)) + 1;
    let chunks = [];
    const chunkLength = Math.ceil(fileLength / chunkNumber);
    for (let i = 0; i < chunkNumber; i++) {
      const start = i == 0 ? 0 : i * chunkLength;
      const end = i == chunkNumber - 1 ? fileLength : (i + 1) * chunkLength;
      chunks[i] = file.slice(start, end);
    }
    Promise.all(chunks.map(c => blobToDataUrl(c).then(createRecTask)))
      .then(responses => {
        console.log(responses);
        Promise.all(
          responses.map(res => describeTaskStatus(res.Data.TaskId))
        ).then(console.log);
      })
      .catch(e => console.log(e));
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
