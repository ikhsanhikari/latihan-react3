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
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const UpdateQuiz = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [defaultValues, setFieldsValues] = useState({ quizName: "hallo" });

  const getById = () => {
    axios
      .get(BASE_URL + "/quiz/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        console.log(item.data);
        form.setFieldsValue(item.data.data);
      });
  };

  useEffect(() => {
    getById();
  }, [form, defaultValues]);

  const onFinish = (values) => {
    console.log(values)
    axios
      .post(BASE_URL + `/quiz`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        console.log(item);
        navigate("/list-quiz");
        openNotificationWithIcon("success");
      })
      .catch(() => {
        errorNotificationWithIcon("error");
      });
  };
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Success Create Quiz",
    });
  };
  const errorNotificationWithIcon = (type) => {
    notification[type]({
      message: "Error",
      description: "Failed Create Quiz",
    });
  };
  return (
    <Layout>
      <Header>Create Quiz</Header>
      <Content>
        <Row justify="start">
          <Col span={17}>
            <Card bordered={false} title="Create Quiz here">
              <Form
                {...layout}
                form={form}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                initialValues={defaultValues}
              >
                <Form.Item
                  name={"id"}
                  label="id"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={true}/>
                </Form.Item>
                <Form.Item
                  name={"quizName"}
                  label="Quiz Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={"description"}
                  label="Description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea rows={5} />
                </Form.Item>
                <Form.Item
                  name={"longQuizTimer"}
                  label="Long Quiz Timer"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={"question"}
                  label="Question"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer>@Ikhsanhikari</Footer>
    </Layout>
  );
};

export default UpdateQuiz;
