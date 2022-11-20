import { Button, Card, Col, Row, notification } from "antd";
import React, { useState } from "react";
import { java } from "@codemirror/lang-java";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import axios from "axios";

export const LiveCode = () => {
  const codeString = `class Program{
    public static void main(String[]args){
        System.out.println("Hikari learning");
    }
} `;

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Success compile",
    });
  };
  const [request, setRequest] = useState({
    code: codeString,
    language: "cpp",
    input: "",
  });
  const [output, setOutput] = useState("");
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    setRequest({
      code: value,
    });
  }, []);

  const compile = () => {
    axios
      .post("https://codex-api.herokuapp.com", request)
      .then((item) => {
        console.log(item);
        openNotificationWithIcon("success");
        setOutput(item.data.error);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
            <Button type="primary" onClick={compile} htmlType="submit">
              Compile
            </Button>
          </Card>
          <br />
        </Col>
        <Col span={12}>
          <Card bordered={false} title={"Output"}>
            {output}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
