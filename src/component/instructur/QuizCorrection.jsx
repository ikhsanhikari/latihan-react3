import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Row,
  Table,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";

const QuizCorrection = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [value, setValue] = useState("");
  const [note, SetNote] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    correctionAction();
    getAllStudentQuiz();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAllStudentQuiz = () => {
    axios
      .get(BASE_URL + `/student_quiz/quiz/` + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setQuiz(item.data.data);
      });
  };
  useEffect(() => {
    getAllStudentQuiz();
    // eslint-disable-next-line
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
    {
      title: "Done",
      dataIndex: "doneQuiz",
      key: "doneQuiz",
      width: "20%",
      hidden: true,
      render: (text, record, index) => String(text),
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      hidden: true,
      render: (text, record, index) => (
        <Card>
          <Row>
            <Col span={24}>
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
      render: (text, record, index) => (
        <Card>
          <Row>
            <Col span={24}>
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
          {String(record.doneQuiz) === "true" ? (
            <Button
              type="primary"
              danger
              onClick={(e) => correction(text, record)}
            >
              Update Correction
            </Button>
          ) : (
            <Button type="primary" onClick={(e) => correction(text, record)}>
              Correction
            </Button>
          )}
        </>
      ),
    },
  ].filter((item) => !item.hidden);

  const correction = (text, record) => {
    setData(record);
    showModal();
  };

  const correctionAction = () => {
    var req = {};
    req.studentQuizId = data.id;
    req.value = value;
    req.note = note;
    axios
      .post(BASE_URL + `/quiz_correction`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        getAllStudentQuiz();
      });
  };
  return (
    <>
      <Layout>
        <Header>List Quiz</Header>
        <Content>
          <Table
            columns={columns}
            dataSource={quiz}
            rowKey={(record) => record.id}
          />
        </Content>
        <Footer></Footer>
      </Layout>
      <Modal
        title="Detail Pattern"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Card title={"Question"}>
          <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
            {data.question}
          </pre>
        </Card>
        <br />
        <Card title={"Answer"}>
          <SyntaxHighlighter language="java" style={dark}>
            {data.answer}
          </SyntaxHighlighter>
        </Card>

        <br />
        <Card>
          <Form>
            <Form.Item label={"value"}>
              <InputNumber
                onChange={(e) => {
                  setValue(e);
                }}
              />
            </Form.Item>
            <Form.Item label={"Note"}>
              <Input.TextArea
                rows={10}
                onChange={(e) => {
                  SetNote(e.target.value);
                }}
              ></Input.TextArea>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default QuizCorrection;
