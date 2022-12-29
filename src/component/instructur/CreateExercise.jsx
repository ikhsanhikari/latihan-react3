import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  Space,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateExercise = () => {
  const [patterns, setPatterns] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(BASE_URL + "/pattern/lov", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setPatterns(item.data.data);
      });
  }, []);
  const onFinish = (values) => {
    var req = {
      exerciseName: values.exercise.name,
      description: values.exercise.description,
      patterns: values.patterns,
    };
    console.log(req);
    axios
      .post(BASE_URL + "/exercise/", req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        console.log(item);
        openNotificationWithIcon("success");
        navigate('/list-exercise')
      })
      .catch(() => {
        openNotificationWithIcon("error");
      });
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Success",
        description: "Success create exercise.",
      });
    } else if (type === "error") {
      notification[type]({
        message: "Failed",
        description: "Faild to create exercise.",
      });
    }
  };

  return (
    <Layout>
      <Header>Create Exercise</Header>
      <Content>
        <Row justify="start">
          <Col span={15}>
            <Card bordered={false} title="Create Exercise here">
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["exercise", "name"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Exercise Name" />
                </Form.Item>
                <Form.Item
                  name={["exercise", "description"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Description" />
                </Form.Item>
                <Form.List name="patterns">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "patternId"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing pattern",
                              },
                            ]}
                          >
                            <Select
                              defaultValue=""
                              style={{
                                width: 600,
                              }}
                              onChange={handleChange}
                              options={patterns}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "amount"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing amount",
                              },
                            ]}
                          >
                            <Input type="number" placeholder="Amount" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add list pattern
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    // offset: 8,
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

export default CreateExercise;
