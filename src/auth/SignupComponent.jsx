import {
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  PageHeader,
  Row,
} from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../common/Constant";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const SignupComponent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Success",
        description: "Success signup.",
      });
      navigate('/login')
    } else if (type === "error") {
      notification[type]({
        message: "Failed",
        description: "Faild to signup.",
      });
    }
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios
      .post(BASE_URL + "/auth/signup", values)
      .then((item) => {
        openNotificationWithIcon("success");
      })
      .catch(() => {
        openNotificationWithIcon("error");
      });
  };

  return (
    <>
      <Row>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Hikari Learning"
          subTitle="learning react, make it easy at all"
        />
      </Row>
      <Row justify="center" align="middle">
        <Col span={10}>
          <Card>
            <h2>Signup</h2>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default SignupComponent;
