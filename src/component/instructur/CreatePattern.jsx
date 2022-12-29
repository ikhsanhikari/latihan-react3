import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  notification,
  Popconfirm,
  Popover,
  Radio,
  Row,
  Space,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  BASE_URL,
  Conditional_C_code,
  Default_C_code,
  Looping_C_code,
  Sequential_C_code,
} from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";
import { ExclamationOutlined } from "@ant-design/icons";

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

  const [pattern, setPattern] = useState(Default_C_code);
  const [result, setResult] = useState({});
  const [courseLevel, setCourseLevel] = useState("low");
  const [courseType, setCourseType] = useState("sequential");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onChange = React.useCallback((value) => {
    setPattern(value);
  }, []);

  const executePattern = () => {
    var request = {};
    request.courseLevel = courseLevel;
    request.courseType = courseType;
    request.pattern = pattern;
    axios
      .post(BASE_URL + "/pattern/execute", request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((data) => {
        var tamp = data.data.data.output;
        if (data.data.data.output == null) {
          tamp = data.data.data.error;
          openNotificationWithIcon("error");
          setVisible(false);
        } else {
          openNotificationWithIcon("success");
          setVisible(true);
        }
        setResult({
          outputPattern: data.data.data.patternResult,
          output: tamp,
        });
      });
  };
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
        openNotificationWithIcon("success");
        navigate("/list-pattern");
      });
  };
  const hardCodeInstruction = (
    <>
      <h3>Random rule</h3>
      <p>
        <b>:value</b> = integer random value ,ex: 1,2,3, etc
      </p>
      <p>
        <b>:output</b> = String random value ,ex: Wuzz,buff, etc
      </p>
      <p>
        <b>:compare</b> = Comparator random value ,ex: == , != etc
      </p>
      <p>
        <b>:operator</b> = Operator random value ,ex: + , - etc
      </p>
      <p>
        <b>:logic</b> = Logic random value ,ex: && , || - etc
      </p>
      <a onClick={hide}>Close</a>
    </>
  );
  return (
    <Layout>
      <Header>Create Pattern</Header>
      <Content>
        <br />
        <Row>
          <Col span={12}>
            <Card title={"Write Pattern here"} bordered={false}>
              <Radio.Group
                buttonStyle="outline"
                onChange={(e) => {
                  if (e.target.value === "sequential") {
                    setPattern(Sequential_C_code);
                  } else if (e.target.value === "conditional") {
                    setPattern(Conditional_C_code);
                  } else if (e.target.value === "looping") {
                    setPattern(Looping_C_code);
                  }

                  setCourseType(e.target.value);
                }}
                defaultValue={courseType}
              >
                <Radio.Button value="sequential">Sequential</Radio.Button>
                <Radio.Button value="conditional">Conditional</Radio.Button>
                <Radio.Button value="looping">Looping</Radio.Button>
              </Radio.Group>
              <Divider />
              <CodeMirror
                value={pattern}
                height="400px"
                extensions={[java()]}
                onChange={onChange}
                theme={oneDark}
              />
              <Divider />
              <Radio.Group
                buttonStyle="outline"
                onChange={(e) => {
                  setCourseLevel(e.target.value);
                }}
                defaultValue={courseLevel}
              >
                <Radio.Button value="low">Low</Radio.Button>
                <Radio.Button value="medium">Medium</Radio.Button>
                <Radio.Button value="high">High</Radio.Button>
              </Radio.Group>
              <br />
              <br />
              <Space>
                <Button type="primary" onClick={executePattern}>
                  Execute Pattern
                </Button>
              </Space>
            </Card>
          </Col>
          <Col span={12}>
            <Popover
              content={hardCodeInstruction}
              title="Instruction"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button
                type="primary"
                danger
                icon={<ExclamationOutlined />}
              >
                Instruction
              </Button>
            </Popover>
            <Divider />
            <Card bordered={false} title={"Pattern result sample here"}>
              <SyntaxHighlighter language="java" style={dark}>
                {result.outputPattern}
              </SyntaxHighlighter>
              <p>
                output: <b>{result.output}</b>
              </p>
              {visible ? (
                <Popconfirm
                  title="Are you sure to create this pattern?"
                  onConfirm={(e) => createPattern()}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    danger
                    htmlType="button"
                  >
                    Save pattern
                  </Button>
                </Popconfirm>
              ) : (
                <></>
              )}
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
