import { Alert, Card, Col, Layout, Row } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BASE_URL } from "../common/Constant";
import { ACCESS_TOKEN } from "../util/constant";
import jwt from "jwt-decode";

const ExercisePreview = () => {
  const [exercises, setExercises] = useState([]);
  const [resultAnswer, setResultAnswer] = useState({});
  let { id } = useParams();

  useEffect(() => {
    var userId = jwt(localStorage.getItem(ACCESS_TOKEN));
    axios
      .get(BASE_URL + "/exercise_answer/check/" + id + "/" + userId.sub, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setExercises(item.data.data.exercises);
        setResultAnswer(item.data.data.resultAnswer);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Header>Exercise</Header>
      <Content>
        <Row justify="start" gutter={5}>
          <Col span={24}>
            <Card>
              <Alert
                message={"Right Answer: " + resultAnswer.rightAnswer}
                type="success"
                showIcon
              />{" "}
              <br />
              <Alert
                message={"Wrong Answer: " + resultAnswer.wrongAnswer}
                type="error"
                showIcon
              />
            </Card>
            {exercises.map((item) => (
              <Card
                title={"Exercise " + item.noIndex + " Result: " + item.result}
                bordered={false}
                key={item.noIndex}
                className={`noselect`}
              >
                <SyntaxHighlighter language="java" style={dark}>
                  {item.question}
                </SyntaxHighlighter>
                Right answer: {item.answer} <br />
                Your answer: {item.yourAnswer} <br />
              </Card>
            ))}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ExercisePreview;
