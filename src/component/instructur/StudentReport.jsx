import { Button, Card, Layout, Table } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/Constant";
import { currentIdLogin } from "../../common/Util";
import { ACCESS_TOKEN } from "../../util/constant";

const StudentReport = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <Button
          onClick={() => {
            goToProfile(record.id);
          }}
        >
          Profile
        </Button>
      ),
    },
  ];
  const goToProfile = (id) => {
    navigate("/student-profile-for-instructur/" + id);
  };
  const getUserByInstructur = () => {
    axios
      .get(BASE_URL + "/user/by-instructur", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setUser(item.data.data);
      });
  };

  const downloadReport = () => {
    console.log("ke klik kok");
    axios
      .get(BASE_URL + "/report/student/" + currentIdLogin, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        // messageApi.success("Success generate report !");
      });
  };

  useEffect(() => {
    getUserByInstructur();
  }, []);
  return (
    <Layout>
      <Header>List Student</Header>
      <Content>
        <Card title={"My Student"}>
          <Button type="primary" onClick={() => downloadReport()}>
            Download
          </Button>
          <br />
          <br />
          <Table
            columns={columns}
            dataSource={user}
            rowKey={(record) => record.id}
          />
        </Card>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default StudentReport;
