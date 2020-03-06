import React, { useRef, FormEvent, useState } from "react";
import { upload } from "./util";

export function Content() {
  const isAudio = (fileType: string) => fileType.indexOf("audio") === -1;
  const fileInput = useRef<HTMLInputElement>(null);
  const [translateResult, setTranslateResult] = useState("");
  const onFileChange = () => {
    const { files } = fileInput.current;
    if (isAudio(files[0].type)) {
      alert("请上传音频文件");
    }
  };

  const submitFile = (e: FormEvent) => {
    e.preventDefault();
    const { files } = fileInput.current;
    if (isAudio(files[0].type)) {
      alert("请上传音频文件");
    }
    const file = files[0];
    const fr = new FileReader();
    fr.onload = e => {
      upload(e.target.result)
        .then(result => {
          console.log(result);
          setTranslateResult(result);
        })
        .catch(console.log);
    };
    fr.readAsArrayBuffer(file);
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
      <div>
        <h2>translateResult</h2>
        <div>{translateResult}</div>
      </div>
    </form>
  );
}
