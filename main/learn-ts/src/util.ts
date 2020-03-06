const urlPrefix = "http://localhost:8181";

export function request(params) {
  const { url, ...rest } = params;
  return fetch(`${urlPrefix}/${url}`, rest)
    .then(res => res.json())
    .catch(e => {
      console.log(e);
      return e;
    });
}

export function upload(file) {
  return request({
    url: "upload",
    method: "POST",
    body: file
  })
}
