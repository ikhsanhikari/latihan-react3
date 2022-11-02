import { Button, Card, Col, Row } from "antd";
import React from "react";
import { java } from "@codemirror/lang-java";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
// import {CodeOutlined,ForwardOutlined } from "@ant-design/icons";

export const LiveCode = () => {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);
  const codeString = `class Program{
        public static void main(String[]args){
            System.out.println("Hikari learning");
        }
    } `;
  return (
    <Card bordered={false}>
      <Row justify="start">
        <Col span={12}>
          <Card bordered={false} title="Live Code">
            <CodeMirror
              value={codeString}
              height="400px"
              extensions={[java()]}
              onChange={onChange}
              theme={oneDark}
            />
            <br />
            <Button type="primary" htmlType="submit">
              Compile
            </Button>
          </Card>
          <br />
        </Col>
        <Col span={12}>
          <Card bordered={false} title={"Output"}>
            Hikari Learning
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
