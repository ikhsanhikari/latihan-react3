import {
  Button,
  Card,
  Layout,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../common/Constant";
import { ACCESS_TOKEN } from "../util/constant";
import { EyeTwoTone, PlayCircleTwoTone } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const cancel = (e) => {
  console.log(e);
  message.error("Cancle generate exercise");
};

const ListExercise = () => {
  const [exercises, setExercises] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patterns, setPatterns] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onGenerate = (key, e) => {
    e.preventDefault();
    console.log(key);
    axios
      .get(BASE_URL + "/exercise/" + key, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        message.success("Succes generate exercise");
      });
  };
  const onClickData = (key, e) => {
    e.preventDefault();
    showModal();

    axios
      .get(BASE_URL + "/exercise_pattern?exerciseId=" + key, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setPatterns(item.data);
      });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Exercise Name",
      dataIndex: "exerciseName",
      key: "exerciseName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <>
          <Space>
            <Button
              onClick={(e) => onClickData(record.id, e)}
              icon={<EyeTwoTone />}
            >
              View
            </Button>

            <Popconfirm
              title="Are you sure to generate this exercise?"
              onConfirm={(e) => onGenerate(record.id, e)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<PlayCircleTwoTone />}>Generate</Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get(BASE_URL + "/exercise/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        console.log(item.data.data);
        setExercises(item.data.data);
      });
  }, []);
  return (
    <>
      <Layout>
        <Header>List Exercise</Header>
        <Content>
          <Card>
            <Space>
              <Link to={"/create-exercise"}>
                <Button type="primary">Create Exercise</Button>
              </Link>
              <Link to={"/result-all-student-exercise"}>
                <Button type="primary">All exercise of student</Button>
              </Link>
            </Space>
            <br /> <br />
            <Table columns={columns} dataSource={exercises} />
          </Card>
        </Content>
        <Footer>@ikhsanhikari</Footer>
      </Layout>
      <Modal
        title="Detail Pattern"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        {patterns.map((item) => (
          <Card
            key={item.id}
            title={
              "Pattern id " +
              item.pattern.id +
              " is generated " +
              item.amount +
              " time"
            }
            bordered={false}
          >
            <SyntaxHighlighter language="java" style={dark}>
              {item.pattern.pattern}
            </SyntaxHighlighter>
          </Card>
        ))}
      </Modal>
    </>
  );
};

export default ListExercise;
