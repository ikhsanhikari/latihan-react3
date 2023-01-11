import { Button, Card, Col, Collapse, Layout, Row, Space } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";

const { Panel } = Collapse;

export const ListPattern = () => {
  const [patterns, setPatterns] = useState([]);
  const [lastIndex, setLastIndex] = useState();

  const downloadReport = () => {
    console.log("ke klik kok");
    axios
      .get(BASE_URL + "/report/pattern", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        // messageApi.success("Success generate report !");
      });
  };
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

  return (
    <Layout>
      <Header>List Pattern</Header>
      <Content>
        <br />
        <Card title="List Pattern" bordered={false}>
          <Space>
          <Link to={"/create-pattern"}>
            <Button type="primary">Create pattern</Button>
          </Link>
          <Button type="primary" onClick={()=>{downloadReport()}}>Download</Button>  
          </Space>
          
          <br /> <br />
          <Row>
            <Col span={24}>
              <Card title="List Pattern">
                <Collapse ghost defaultActiveKey={[{ lastIndex }]}>
                  {patterns.map((item) => (
                    <Panel key={item.id} header={"Pattern " + item.id}>
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
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
