import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { Button, Card, Col, notification, Row, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { COMPILER_API } from "../common/Constant";

export const LiveCode = () => {
  let javaCode = `class Program{
    public static void main(String[]args){
        System.out.println("Hikari learning");
    }
} `;
  let csCode = `// Hello World! program
namespace HelloWorld
{
    class Hello {         
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World!");
        }
    }
}`;
  let goCode = `package main
import "fmt"
func main() {
    fmt.Println("hello world")
}`;

  let cCode = `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`;

  let cppCode = `// Your First C++ Program

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`;

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Success compile",
    });
  };
  const [code, setCode] = useState(javaCode);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("");
  const onChange = React.useCallback((value) => {
    setCode(value);
  }, []);

  const handleChange = (value) => {
    if (value === "java") {
      setCode(javaCode);
    } else if (value === "go") {
      setCode(goCode);
    } else if (value === "cs") {
      setCode(csCode);
    } else if (value === "py") {
      setCode(`print("Hello world")`);
    } else if (value === "c") {
      setCode(cCode);
    } else if (value === "cpp") {
      setCode(cppCode);
    } else if (value === "js") {
      setCode(`console.log("Hello world!!")`);
    }

    setLanguage(value);
  };

  const compile = () => {
    var request = {};
    request.code = code;
    request.language = language;
    axios
      .post(COMPILER_API, request)
      .then((item) => {
        console.log(item);
        openNotificationWithIcon("success");
        setOutput(item.data.output);
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
            <Select
              defaultValue="java"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "java",
                  label: "Java",
                },
                {
                  value: "py",
                  label: "Python",
                },
                {
                  value: "cpp",
                  label: "C++",
                },
                {
                  value: "c",
                  label: "C",
                },
                {
                  value: "go",
                  label: "Golang",
                },
                {
                  value: "cs",
                  label: "C#",
                },
                {
                  value: "js",
                  label: "Node JS",
                },
              ]}
            />
            <br />
            <br />
            <CodeMirror
              value={code}
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
