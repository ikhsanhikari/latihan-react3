import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Radio,
  Row,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
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

const CreateQuiz = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Layout>
      <Header>Create Quiz</Header>
      <Content>
        <Row justify="start">
          <Col span={15}>
            <Card bordered={false} title="Create Quiz here">
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["quiz", "name"]}
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={["quiz", "totalQuiz"]}
                  label="Total Quiz"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 99,
                      required:true
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name={["quiz", "description"]}
                  label="Description"
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  name={["quiz", "courseType"]}
                  label="Course Type"
                  rules={[{ required: true }]}
                >
                  <Radio.Group buttonStyle="outline" >
                    <Radio.Button value="sequential">Sequential</Radio.Button>
                    <Radio.Button value="conditional">Conditional</Radio.Button>
                    <Radio.Button value="looping">Looping</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name={["quiz", "level"]}
                  label="Course Level"
                  rules={[{ required: true }]}
                >
                  <Radio.Group buttonStyle="outline">
                    <Radio.Button value="low">Low</Radio.Button>
                    <Radio.Button value="medium">Medium</Radio.Button>
                    <Radio.Button value="high">High</Radio.Button>
                  </Radio.Group>
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

export default CreateQuiz;
