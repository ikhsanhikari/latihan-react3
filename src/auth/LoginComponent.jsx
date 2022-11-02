import { LockOutlined, UserOutlined, GoogleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  PageHeader,
  Row,
  Typography,
} from "antd";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../util/constant";

const { Title } = Typography;

const LoginComponent = () => {
  const natigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    natigate("/");
    localStorage.setItem(ACCESS_TOKEN, "ini token");
    openNotificationWithIcon("success");
  };
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Succes system login.",
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
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "70vh" }}
      >
        <Col span={7}>
          <Card>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Title level={2}>Login</Title>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link className="login-form-forgot" to={"/forgot_password"}>
                  Forgot password
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <Link to={"/signup"}>register now!</Link>
              </Form.Item>
            </Form>
            <Button
              type="primary"
              htmlType="submit"
              icon={<GoogleOutlined />}
              className="login-form-button"
            >
              Signup with google
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginComponent;
