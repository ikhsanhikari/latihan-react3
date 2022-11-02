import { Button, Card, Col, Form, Input, Row, Tabs, Typography } from "antd";
import React from "react";

const { Text } = Typography;
const items = new Array(10).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Quiz ${id}`,
    key: id,
    children: (
      <>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
            <Text strong>Soal untuk quiz {id} : </Text>
              <Form.Item
                label={`answer no.${id} here`}
                name={["answer", `quiz${id}`]}
                required={true}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </>
    ),
  };
});

const Quiz = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  function onChange(activeKey) {
    console.log(activeKey);
  }
  return (
    <div className="card-container">
      <Card title={`Quiz`}>
        <Row>
          <Col>
            <Form onFinish={onFinish} layout={"vertical"}>
              <Tabs type="card" onChange={onChange} items={items} />
              <Card bordered={false}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Card>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Quiz;
