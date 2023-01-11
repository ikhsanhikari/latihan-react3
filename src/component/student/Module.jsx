import { Button, Card, Layout, Table } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";
import fileDownload from "js-file-download";

const Module = () => {
  const [module, setModule] = useState([]);

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
        <Button onClick={() => downloadModule(record)}>Download</Button>
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
  useEffect(() => {
    axios
      .get(BASE_URL + `/module`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setModule(item.data.data);
      });
  }, []);

  return (
    <Layout>
      <Header>List Quiz</Header>
      <Content>
        <Card>
          <Table
            columns={columns}
            dataSource={module}
            rowKey={(record) => record.id}
          />
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};

export default Module;
