import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  notification,
  Row,
  Select,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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

const UpdateUser = () => {
  const navigate = useNavigate();
  const [instructur, setInstructur] = useState([]);
  const [hideInstructur, setHideInstructur] = useState(true);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [defaultValues, setFieldsValues] = useState({});

  const instructurLov = () => {
    axios
      .get(BASE_URL + "/user/instructur/lov", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setInstructur(item.data.data);
      });
  };

  const getUserById = () => {
    axios
      .get(BASE_URL + "/user/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        form.setFieldsValue(item.data.data);
        console.log(item.data.data.role);
        if (item.data.data.role == "ROLE_USER") {
          setHideInstructur(false);
        }
      });
  };

  useEffect(() => {
    instructurLov();
    getUserById();
  }, []);

  const onFinish = (values) => {
    axios
      .post(BASE_URL + "/user", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        console.log(item);
        openNotificationWithIcon("success");
        navigate("/management-user");
      })
      .catch((item) => {
        openNotificationWithIcon("error");
      });
  };

  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Success",
        description: "Success create user.",
      });
    } else if (type === "error") {
      notification[type]({
        message: "Failed",
        description: "Faild to create user.",
      });
    }
  };
  const onChange = (values) => {
    console.log(values);
    if (values === "ROLE_USER") {
      setHideInstructur(false);
    } else {
      setHideInstructur(true);
    }
  };
  return (
    <>
      <Layout>
        <Header>Create User</Header>
        <Content>
          <Card title={"Create User"}>
            <Row>
              <Col span={12}>
                <Form
                  onFinish={onFinish}
                  form={form}
                  defaultValue={defaultValues}
                  validateMessages={validateMessages}
                  {...layout}
                >
                  <Form.Item
                    label={"ID"}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name={"id"}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label={"Name"}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name={"name"}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={"Email"}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name={"email"}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    hidden
                    label={"Password"}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name={"password"}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label={"Role"}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name={"role"}
                  >
                    <Select
                      onChange={onChange}
                      options={[
                        { label: "ROLE_USER", value: "ROLE_USER" },
                        { label: "ROLE_INSTRUCTUR", value: "ROLE_INSTRUKTUR" },
                        { label: "ROLE_ADMIN", value: "ROLE_ADMIN" },
                      ]}
                    />
                  </Form.Item>
                  {hideInstructur ? (
                    <></>
                  ) : (
                    <Form.Item
                      label={"Instructur"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name={"instructurId"}
                    >
                      <Select options={instructur} />
                    </Form.Item>
                  )}

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
              </Col>
            </Row>
          </Card>
        </Content>
        <Footer>@Ikhsanhikari</Footer>
      </Layout>
    </>
  );
};

export default UpdateUser;
