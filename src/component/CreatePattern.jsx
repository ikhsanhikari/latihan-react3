import { Button, Card, Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { java } from "@codemirror/lang-java";
import CodeMirror from "@uiw/react-codemirror";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "@codemirror/theme-one-dark";

export const CreatePattern = () => {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);
  const codeString = `class Program{
    public static void main(String[]args){
        System.out.println("Hikari learning");
    }
} `;
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
              <Button type="primary" ghost={true} htmlType="submit">
                Create Pattern
              </Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} title={"Pattern result sample here"}>
              <SyntaxHighlighter language="java" style={dark}>
                {codeString}
              </SyntaxHighlighter>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
