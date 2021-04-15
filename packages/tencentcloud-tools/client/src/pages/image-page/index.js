import React from "react";
import { Button, Layout, Menu, Upload, Message } from "element-react";

export function ImagePage() {
  return (
    <>
      <Layout.Col span="6" className="h100">
        <Menu defaultActive="2" className="submenu">
          <Menu.Item index="2">
            <i className="el-icon-menu"></i>图片增强
          </Menu.Item>
        </Menu>
      </Layout.Col>
      <Layout.Col span="18" className="h100">
        <div className="">
          <div>
            <Upload
              className="upload-demo"
              action="/api/upload/image"
              limit={1}
              onExceed={(files, fileList) => {
                Message.warning(
                  `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                  } 个文件，共选择了 ${files.length + fileList.length} 个文件`
                );
              }}
              tip={
                <div className="el-upload__tip">
                  只能上传jpg/png文件
                </div>
              }
            >
              <Button size="small" type="primary">
                点击上传
              </Button>
            </Upload>
          </div>
        </div>
      </Layout.Col>
    </>
  );
}
