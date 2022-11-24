import { Card, Col, Layout, Row, Table } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../common/Constant";
import { ACCESS_TOKEN } from "../util/constant";

const ResultQuizEachStudent = () => {
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + `/quiz_correction/quiz/result`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setQuiz(item.data.data);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Quiz Name",
      dataIndex: "quizName",
      key: "quizName",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      hidden: true,
      render: (text, record, index) => (
        <Card>
          <Row>
            <Col span={12}>
              <pre
                style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
              >
                {text}
              </pre>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      hidden: true,
      render: (text, record, index) => (
        <Card>
          <Row>
            <Col span={12}>
              <pre
                style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
              >
                {text}
              </pre>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];
  //   .filter((item) => !item.hidden);
  return (
    <Layout>
      <Header>List Quiz</Header>
      <Content>
        <Card>
          <Table
            style={{ verticalAlign: "top" }}
            columns={columns}
            dataSource={quiz}
          />
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};

export default ResultQuizEachStudent;
