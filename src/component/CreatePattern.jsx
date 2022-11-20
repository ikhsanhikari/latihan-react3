import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { Button, Card, Col, Layout, notification, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BASE_URL } from "../common/Constant";
import { ACCESS_TOKEN } from "../util/constant";

export const CreatePattern = () => {
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Success create pattern.",
    });
  };

  const codeString = `class Program{
    public static void main(String[]args){
        System.out.println("Hikari learning");
    }
} `;

  const [request, setRequest] = useState({
    pattern: codeString,
    courseLevel: "low",
    courseType: "sequential",
  });

  const [result, setResult] = useState({});

  const onChange = React.useCallback((value, viewUpdate) => {
    setRequest({
      pattern: value,
      courseLevel: "low",
      courseType: "sequential",
    });
  }, []);

  const createPattern = () => {
    axios
      .post(BASE_URL + "/pattern/", request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((data) => {
        openNotificationWithIcon("success");
        setResult({
          outputPattern: data.data.data.patternResult,
          output: data.data.data.output,
        });
      });
  };
  return (
    <Layout>
      <Header>Create Pattern</Header>
      <Content>
        <br />
        <Row>
          <Col span={12}>
            <Card title={"Write Pattern here"} bordered={false}>
              <CodeMirror
                value={codeString}
                height="200px"
                extensions={[java()]}
                onChange={onChange}
                theme={oneDark}
              />
              <br />
              <Button
                type="primary"
                ghost={true}
                htmlType="submit"
                onClick={createPattern}
              >
                Create Pattern
              </Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} title={"Pattern result sample here"}>
              <SyntaxHighlighter language="java" style={dark}>
                {result.outputPattern}
              </SyntaxHighlighter>
              <p>
                output: <b>{result.output}</b>
              </p>
            </Card>
            <Link to={"/list-pattern"}>
              <Button type="primary" ghost={true} htmlType="button">
                List Pattern
              </Button>
            </Link>
          </Col>
        </Row>
      </Content>

      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
