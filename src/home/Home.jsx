import { Card, Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { LiveCode } from "../component/LiveCode";

export const Home = () => {
  return (
    <Layout>
      <Header>Home Page</Header>
      <Content>
        <Card>
          <LiveCode />
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
