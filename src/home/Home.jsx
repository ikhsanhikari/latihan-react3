import { Card, Col, Divider, Layout, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
const { Text, Title } = Typography;

export const Home = () => {
  return (
    <Layout>
      <Header>Home Page</Header>
      <Content>
        <Row >
          <Col  >
            <Card bordered={false}>
              <Title level={2}>Home Page</Title>
              <Text type="secondary">
                This app will help beginner's learner for learn algorithms.
              </Text>
              <br />
              <Text type="secondary">We provide many short's questions </Text>
            </Card>
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col span={8}>
            <Card bordered={false}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    alt="banner"
                    src="https://previews.123rf.com/images/pikepicture/pikepicture1904/pikepicture190400561/121501142-e-learning-online-education-web-banner-template-distance-courses-school-e-learning-poster-with-text-.jpg"
                  />
                }
              >
                <Meta
                  title="Sequential"
                  description="Many traning for understanding Sequential"
                />
              </Card>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    alt="banner"
                    src="https://previews.123rf.com/images/pikepicture/pikepicture1904/pikepicture190400561/121501142-e-learning-online-education-web-banner-template-distance-courses-school-e-learning-poster-with-text-.jpg"
                  />
                }
              >
                <Meta
                  title="Conditional"
                  description="Many traning for understanding Conditional"
                />
              </Card>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    alt="banner"
                    src="https://previews.123rf.com/images/pikepicture/pikepicture1904/pikepicture190400561/121501142-e-learning-online-education-web-banner-template-distance-courses-school-e-learning-poster-with-text-.jpg"
                  />
                }
              >
                <Meta
                  title="Looping"
                  description="Many traning for understanding Looping"
                />
              </Card>
            </Card>
          </Col>
        </Row>
        <Card>
          {/* {(() => {
            if (localStorage.getItem(ROLE) == "ROLE_INSTRUKTUR") {
              return <HomeInstructur />;
            } else if (localStorage.getItem(ROLE) == "ROLE_USER") {
              return <HomeStudent />;
            } else {
              return <HomeAdmin />;
            }
          })()} */}
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
