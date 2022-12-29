import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  notification,
  Row,
} from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const SelfExerciseDetail = () => {
  const [exercises, setExercises] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Success submit an answer.",
    });
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/self_exercise_answer/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setExercises(item.data.data);
      });
    // eslint-disable-next-line
  }, []);

  const onFinish = (values) => {
    var obj = values["answers"];
    var res = [];
    for (let index = 1; index <= exercises.length; index++) {
      res.push(obj["answer_" + index]);
    }

    var req = {
      answer: res.join(","),
      generateId: id,
    };
    axios
      .post(BASE_URL + "/student_self_exercise_answer/", req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        console.log(item);
        openNotificationWithIcon("success");
        navigate("/self-preview-for-student/" + id);
      });
  };

  return (
    <Layout>
      <Header>Exercise</Header>
      <Content>
        <Row justify="start" gutter={5}>
          <Col span={24}>
            <Form onFinish={onFinish} layout="vertical" {...layout}>
              {exercises.map((item) => (
                <Card
                  title={"Exercise " + item.noIndex}
                  bordered={false}
                  key={item.noIndex}
                  className={`noselect`}
                >
                  <SyntaxHighlighter language="java" style={dark}>
                    {item.question}
                  </SyntaxHighlighter>
                  <Form.Item
                    name={["answers", `answer_${item.noIndex}`]}
                    label={`Answer exercise ${item.noIndex} here`}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Card>
              ))}
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 1,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SelfExerciseDetail;
