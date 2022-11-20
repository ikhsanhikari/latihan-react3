import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  PageHeader,
  Row,
  Typography,
} from "antd";
import axios from "axios";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../common/Constant";
import { ACCESS_TOKEN, EMAIL, NAME, ROLE } from "../util/constant";

const { Title } = Typography;

const LoginComponent = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios
      .post(BASE_URL + "/auth/login", values)
      .then((item) => {
        localStorage.setItem(ACCESS_TOKEN, item.data.accessToken);
        localStorage.setItem(NAME, item.data.name);
        localStorage.setItem(ROLE, item.data.role);
        localStorage.setItem(EMAIL, item.data.email);
        openNotificationWithIcon("success");
        navigate("/");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        openNotificationWithIcon("error");
      });
  };
  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Success",
        description: "Success system login.",
      });
    } else if (type === "error") {
      notification[type]({
        message: "Failed",
        description: "Faild to login.",
      });
    }
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
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
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
