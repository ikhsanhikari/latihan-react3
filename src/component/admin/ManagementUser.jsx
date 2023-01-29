import { Button, Card, Layout, message, Popconfirm, Space, Table } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";
import {
  UserAddOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ManagementUser = () => {
  const [instructur, setInstructur] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [totalElements, setTotalElements] = useState("");
  const [size, setSize] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const downloadReport = () => {
    console.log("ke klik kok");
    axios
      .get(BASE_URL + "/report/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {});
  };
  const getFilterInstructur = () => {
    axios
      .get(BASE_URL + "/user/instructur/filter", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setInstructur(item.data.data);
      });
  };
  const getUser = (paging) => {
    axios
      .get(BASE_URL + `/user` + paging, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setUser(item.data.data.content);
        setTotalElements(item.data.data.totalElements);
        setSize(item.data.data.size);
      });
  };
  useEffect(() => {
    getUser("");
    getFilterInstructur();
  }, []);
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
      title: "Role User",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "ROLE_USER",
          value: "ROLE_USER",
        },
        {
          text: "ROLE_INSTRUKTUR",
          value: "ROLE_INSTRUKTUR",
        },
        {
          text: "ROLE_ADMIN",
          value: "ROLE_ADMIN",
        },
      ],
      onFilter: (value, record) => {
        console.log(record.role.indexOf(value) === 0);
        return record.role.indexOf(value) === 0;
      },
    },
    {
      title: "Instructur",
      dataIndex: ["instructur", "email"],
      key: ["instructur", "email"],
      filters: instructur,
      onFilter: (value, record) => {
        return record.instructur == null
          ? false
          : record.instructur.email.indexOf(value) === 0;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, value) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={(e) => {
              navigate("/update-user/" + record.id);
            }}
          >
            Update
          </Button>

          {record.role == "ROLE_INSTRUKTUR" || record.role == "ROLE_ADMIN" ? (
            <Button type="primary" danger disabled icon={<DeleteOutlined />}>
              Delete
            </Button>
          ) : (
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={(e) => deleteUser(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
  const deleteUser = (record) => {
    axios
      .delete(BASE_URL + `/user/` + record.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        getUser("");
      });
  };

  const onChangePage = (values) => {
    getUser("?page=" + (values.current - 1) + "&size=" + values.pageSize);
  };
  return (
    <Layout>
      <Header>List User</Header>
      <Content>
        <Card>
          <Space>
            <Button
              icon={<UserAddOutlined />}
              type="primary"
              onClick={() => {
                navigate("/create-user");
              }}
            >
              Create User
            </Button>
            <Button
              type="primary"
              danger
              icon={<DownloadOutlined />}
              onClick={() => downloadReport()}
            >
              Download
            </Button>
          </Space>

          <br />
          <br />
          <Table
            columns={columns}
            dataSource={user}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              total: totalElements,
              pageSizeOptions: ["5", "10", "20", "30"],
              size: size,
            }}
            rowKey={(record) => record.id}
            onChange={onChangePage}
          />
        </Card>
      </Content>
      <Footer>@Ikhsanhikari</Footer>
    </Layout>
  );
};

export default ManagementUser;
