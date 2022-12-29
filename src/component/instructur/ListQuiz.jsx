import { Button, Card, Col, Layout, Row, Space, Table } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";

const ListQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(BASE_URL + `/quiz/instructur`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setQuiz(item.data.data);
      });
  }, []);

  const viewQuizStudent = (text, record) => {
    console.log(record);
    navigate("/quiz-correction/" + record.id);
  };

  const updateQuiz = (text, record) => {
    navigate("/update-quiz/" + record.id);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Quiz Name",
      dataIndex: "quizName",
      key: "quizName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Student finish",
      dataIndex: "studentFinish",
      key: "studentFinish",
    },
    {
      title: "Corrected",
      dataIndex: "corrected",
      key: "corrected",
    },
    {
      title: "Not Corrected Yet",
      dataIndex: "notCorrectedYet",
      key: "notCorrectedYet",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
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
      title: "Action",
      dataIndex: "action",
      question: "action",
      render: (text, record, index) => (
        <>
          <Space>
            {record.notCorrectedYet > 0 ? (
              <Button
                type="primary"
                danger
                onClick={(e) => viewQuizStudent(text, record)}
              >
                Need correction
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={(e) => viewQuizStudent(text, record)}
              >
                All corrected
              </Button>
            )}

            {/* <Button
              type="primary"
              onClick={(e) => updateQuiz(text, record)}
            >
              Update quiz
            </Button> */}
          </Space>
        </>
      ),
    },
  ].filter((item) => !item.hidden);
  return (
    <Layout>
      <Header>List Quiz</Header>
      <Content>
        <Card>
          <Link to={"/create-quiz"}>
            <Button type="primary">Create Quiz</Button>
          </Link>
          <br /> <br />
          <Table
            columns={columns}
            dataSource={quiz}
            rowKey={quiz.id}
          />
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};

export default ListQuiz;
