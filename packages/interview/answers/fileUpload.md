# 文件上传

1. input 标签通过 form 提交
   1. enctype="multipart/form-data"
2. ajax/fetch 提交 formData

```js
const fd = new FormData();
fd.append(file, fileData);
ajax.send(fd);
```

**注意：**使用 FormData 上传文件时不能手动指定`contentType`
