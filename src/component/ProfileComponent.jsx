import { Card, Empty, Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";

const ProfileComponent = () => {
  return (
    <Layout>
      <Header>Profile</Header>
      <Content>
        <Card>
          <Empty />
        </Card>
      </Content>
      <Footer>@Ikhsanhikari</Footer>
    </Layout>
  );
};

export default ProfileComponent;
