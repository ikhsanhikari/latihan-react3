import { EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Layout, Table } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../common/Constant";
import { ACCESS_TOKEN } from "../util/constant";

const ResultAllStudentExercise = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(BASE_URL + "/student_exercise_answer/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setResults(item.data.data);
      });
  }, []);

  const onClickData = (record, e) => {
    e.preventDefault();
    navigate(
      "/preview-for-instructur/" + record.generateId + "/" + record.studentId
    );
    console.log(record);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Generate ID",
      dataIndex: "generateId",
      key: "generateId",
      filters: [
        {
          text: "c98d578b-7866-4cae-83e8-16eb2ac4194b",
          value: "c98d578b-7866-4cae-83e8-16eb2ac4194b",
        },
      ],
      onFilter: (value, record) => {
        return record.generateId.indexOf(value) === 0;
      },
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      defaultSortOrder: 'descend',
      filters: [
        {
          text: "hikari29",
          value: "hikari29",
        },
      ],
      onFilter: (value, record) => {
        return record.studentName.indexOf(value) === 0;
      },
      sorter: (a, b) => {
        console.log(a.studentName+" "+b.studentName)
        return a.studentName.length - b.studentName.length;
      },
      //   sortDirections: ["descend"],
    },
    {
      title: "Student Email",
      dataIndex: "studentEmail",
      key: "studentEmail",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <>
          <Button onClick={(e) => onClickData(record, e)} icon={<EyeTwoTone />}>
            View
          </Button>
        </>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Layout>
      <Header>Result answer of each student</Header>
      <Content>
        <Card>
          <Table columns={columns} dataSource={results} onChange={onChange} />
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};

export default ResultAllStudentExercise;
