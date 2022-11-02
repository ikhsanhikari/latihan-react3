import { Avatar, Badge, Button, Card, Col, Layout, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CheckCircleOutlined } from "@ant-design/icons";
export const Exercise = () => {
  const exercises = [
    {
      id: 1,
      judul: "Exercise 1",
      jumlahSoal: 10,
      jenisMateri: "Looping",
    },
    {
      id: 2,
      judul: "Exercise 2",
      jumlahSoal: 40,
      jenisMateri: "Kondisional",
    },
    {
      id: 3,
      judul: "Exercise 3",
      jumlahSoal: 15,
      jenisMateri: "Sekuensial",
    },
    {
      id: 4,
      judul: "Exercise 4",
      jumlahSoal: 16,
      jenisMateri: "Kondisional",
    },
    {
      id: 5,
      judul: "Exercise 5",
      jumlahSoal: 16,
      jenisMateri: "Kondisional",
    },
  ];
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    setExercise(exercises);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Layout>
        <Header>Exercise</Header>
        <Content>
          <Card title={"List Exercise here"}>
            <Row gutter={16}>
              {exercise.map((item) => (
                <Col key={item.id} span={6}>
                  <Card
                    style={{
                      marginTop: 16,
                    }}
                    title={item.judul}
                    bordered={true}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://thumbs.dreamstime.com/b/deep-learning-icon-isolated-white-background-your-web-mobile-app-design-133861833.jpg" />
                      }
                      title={item.judul}
                      description={
                        item.jenisMateri + " " + item.jumlahSoal + " soal"
                      }
                    />
                    <br /> <Badge status="success" text="Done" />
                    <br />
                    <Row justify="center">
                      <Link to={`/exercise-detail/${item.id}`}>
                        <Button
                          type="primary"
                          icon={<CheckCircleOutlined />}
                        >
                          Challenge
                        </Button>
                      </Link>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Content>
        <Footer>@ikhsanhikari</Footer>
      </Layout>
    </>
  );
};
