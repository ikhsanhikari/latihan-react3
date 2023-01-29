import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Layout, message, Popconfirm, Space, Table, Upload } from "antd";
import { ACCESS_TOKEN } from "../../util/constant";
import { BASE_URL } from "../../common/Constant";
import { Content, Header } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import fileDownload from "js-file-download";

const UploadModule = () => {
  const [module, setModule] = useState([]);

  const props = {
    name: "file",
    action: BASE_URL + "/uploadFile",
    headers: {
      authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        getAllModule();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Module Name",
      dataIndex: "moduleName",
      key: "moduleName",
    },
    {
      title: "Original Name",
      dataIndex: "originalName",
      key: "originalName",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (text, record, index) => (
        <Space>
          <Button onClick={() => downloadModule(record)}>Download</Button>
          <Popconfirm
            title="Are you sure to delete this module?"
            onConfirm={(e) => deleteModule(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const downloadModule = (record) => {
    axios
      .get(record.link, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          responseType: "blob",
        },
      })
      .then((item) => {
        alert(record.moduleName);
        fileDownload(item.data, record.moduleName + ".pdf");
      });
  };
  const deleteModule = (record) => {
    axios
      .delete(BASE_URL + "/module/" + record.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        getAllModule();
      });
  };

  const getAllModule = () => {
    axios
      .get(BASE_URL + `/module`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setModule(item.data.data);
      });
  };
  useEffect(() => {
    getAllModule();
  }, []);
  return (
    <Layout>
      <Header>Upload Module</Header>
      <Content>
        <Card>
          <Upload {...props}>
            <Button icon={<UploadOutlined />} type="primary" danger>Upload Module</Button>
          </Upload>

          <br />
          <br />
          <Table
            columns={columns}
            dataSource={module}
            rowKey={(record) => record.id}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default UploadModule;
