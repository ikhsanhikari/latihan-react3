import { Avatar, Badge, Button, Card, Col, Empty, Layout, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";
export const SelfExercise = () => {
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/self_exercise/answer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setExercise(item.data.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <Header>Exercise</Header>
        <Content>
          <Card title={"List Exercise here"}>
            {exercise.length < 1 ? (
              <Empty />
            ) : (
              <Row gutter={16}>
                {exercise.map((item) => (
                  <Col key={item.generateId} span={6}>
                    <Card
                      style={{
                        marginTop: 16,
                      }}
                      title={item.exerciseName}
                      bordered={true}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://thumbs.dreamstime.com/b/deep-learning-icon-isolated-white-background-your-web-mobile-app-design-133861833.jpg" />
                        }
                        title={item.description}
                        description={item.generateId}
                      />
                      <br />
                      {item.isDone ? (
                        <Badge status="success" text="Done" />
                      ) : (
                        <Badge status="warning" text="Not Yet" />
                      )}
                      <b> [{item.amount} Exercise]</b>
                      <br />
                      <br />
                      <Row justify="center">
                        {item.isDone ? (
                          <Link to={`/self-preview-for-student/${item.generateId}`}>
                            <Button
                              type="danger"
                              icon={<CheckCircleOutlined />}
                            >
                              Preview
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/self-exercise-detail/${item.generateId}`}>
                            <Button
                              type="primary"
                              icon={<CheckCircleOutlined />}
                            >
                              Challenge
                            </Button>
                          </Link>
                        )}
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Content>
        <Footer>@ikhsanhikari</Footer>
      </Layout>
    </>
  );
};
