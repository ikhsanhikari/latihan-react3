import { Button, Card, Col, Collapse, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BASE_URL } from "../common/Constant";
import { ACCESS_TOKEN } from "../util/constant";

const { Panel } = Collapse;

export const ListPattern = () => {
  const [patterns, setPatterns] = useState([]);
  const [lastIndex, setLastIndex] = useState();

  useEffect(() => {
    axios
      .get(BASE_URL + "/pattern/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setPatterns(item.data.data);
        setLastIndex(item.data.data.length);
      });
  }, []);

  // const onChange = (e) => {
  //   let newList = [];
  //   if (e.target.checked) {
  //     newList = [...listPattern, e.target.value];
  //   } else {
  //     console.log(listPattern);
  //     newList = listPattern.filter((listItem) => {
  //       return listItem !== e.target.value;
  //     });
  //   }
  //   setlistPattern(newList);
  // };
  return (
    <Layout>
      <Header>List Pattern</Header>
      <Content>
        <br />
        <Card title="List Pattern" bordered={false}>
          <Link to={"/create-pattern"}>
            <Button type="primary">Create pattern</Button>
          </Link>
          <br /> <br />
          {/* <Form> */}
          <Row>
            <Col span={24}>
              <Card title="List Pattern">
                {/* <Checkbox.Group name="listPatterns"> */}
                <Collapse ghost defaultActiveKey={[{ lastIndex }]}>
                  {patterns.map((item) => (
                    <Panel
                      key={item.id}
                      header={
                        // <Checkbox
                        //   value={item.id}
                        //   style={{
                        //     lineHeight: "32px",
                        //   }}
                        //   onChange={onChange}
                        // >
                        "Pattern " + item.id
                        // </Checkbox>
                      }
                    >
                      <Card
                        title={item.courseType + " " + item.courseLevel}
                        bordered={false}
                      >
                        <SyntaxHighlighter language="java" style={dark}>
                          {item.pattern}
                        </SyntaxHighlighter>
                      </Card>
                    </Panel>
                  ))}
                </Collapse>
                {/* </Checkbox.Group> */}
              </Card>
            </Col>
          </Row>
          {/* </Form> */}
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
