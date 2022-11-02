import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeString = `class Program{
    public static void main(String[]args){
        System.out.println("Hikari learning");
    }
} `;

const answers = ["e1", "e2", "e3", "e4"];
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const ExerciseDetail = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Header>Exercise</Header>
      <Content>
        <Row justify="start" gutter={5}>
          <Col span={24} >
            <Form onFinish={onFinish} layout="vertical" {...layout}>
              {answers.map((item) => (
                <Card title={"Exercise " + item} item bordered={false}>
                  <SyntaxHighlighter language="java" style={dark}>
                    {codeString}
                  </SyntaxHighlighter>
                  <Form.Item
                    name={["answers", `answer_${item}`]}
                    label={`Answer from ${item} here`}
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

export default ExerciseDetail;
