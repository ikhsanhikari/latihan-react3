import { Button, Card, Col, Collapse, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const { Panel } = Collapse;
const text = `class Program{
  public static void main(String[]args){
      System.out.println("Hikari learning");System.out.println("Hikari learning");System.out.println("Hikari learning");
  }
} `;
export const ListPattern = () => {
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
          <Row>
            <Col span={24}>
              <Card title="List Pattern">
                <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
                  <Panel header="Pattern 1" key="1">
                    <Card title="Conditional,Low" bordered={false}>
                      <SyntaxHighlighter language="java" style={dark}>
                        {text}
                      </SyntaxHighlighter>
                    </Card>
                  </Panel>
                  <Panel header="Pattern 2" key="2">
                    <Card title="Sequential,Low" bordered={false}>
                      <SyntaxHighlighter language="java" style={dark}>
                        {text}
                      </SyntaxHighlighter>
                    </Card>
                  </Panel>
                  <Panel header="Pattern 3" key="3">
                    <Card title="Looping,Low" bordered={false}>
                      <SyntaxHighlighter language="java" style={dark}>
                        {text}
                      </SyntaxHighlighter>
                    </Card>
                  </Panel>
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
