import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { Button, Card, Col, Layout, notification, Popconfirm, Radio, Row } from "antd";
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
    if (type === "success") {
      notification[type]({
        message: "Success",
        description: "Success create and save pattern.",
      });
    } else if (type === "error") {
      notification[type]({
        message: "Failed",
        description: "Faild to create and save pattern.",
      });
    }
  };

  const codeString = `class Program{
    public static void main(String[]args){
        System.out.println("Hikari learning");
    }
} `;

  const [pattern, setPattern] = useState(codeString);
  const [result, setResult] = useState({});
  const [courseLevel, setCourseLevel] = useState("");
  const [courseType, setCourseType] = useState("");

  const onChange = React.useCallback((value) => {
    setPattern(value);
  }, []);

  const createPattern = () => {
    var request = {};
    request.courseLevel = courseLevel;
    request.courseType = courseType;
    request.pattern = pattern;
    axios
      .post(BASE_URL + "/pattern/", request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((data) => {
        var tamp = data.data.data.output;
        if (data.data.data.output == null) {
          tamp = data.data.data.error;
          openNotificationWithIcon("error");
        } else {
          openNotificationWithIcon("success");
        }
        console.log(tamp);
        setResult({
          outputPattern: data.data.data.patternResult,
          output: tamp,
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
              <Radio.Group
                buttonStyle="outline"
                onChange={(e) => {
                  setCourseType(e.target.value);
                }}
                defaultValue="sequential"
              >
                <Radio.Button value="sequential">Sequential</Radio.Button>
                <Radio.Button value="conditional">Conditional</Radio.Button>
                <Radio.Button value="looping">Looping</Radio.Button>
              </Radio.Group>
              <br />
              <br />
              <Radio.Group
                buttonStyle="outline"
                onChange={(e) => {
                  setCourseLevel(e.target.value);
                }}
                defaultValue="low"
              >
                <Radio.Button value="low">Low</Radio.Button>
                <Radio.Button value="medium">Medium</Radio.Button>
                <Radio.Button value="high">High</Radio.Button>
              </Radio.Group>
              <br />
              <br />
              {/* <Button
                type="primary"
                ghost={true}
                htmlType="submit"
                onClick={createPattern}
              >
                Create Pattern
              </Button> */}
              <Popconfirm
                title="Are you sure to create this pattern?"
                onConfirm={(e) => createPattern()}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Create Pattern</Button>
              </Popconfirm>
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
