import { Avatar, Button, Card, Col, Layout, List, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/Constant";
import { CURRENT_QUIZ_ID, IS_SUBMITTED } from "../../common/Util";
import { ACCESS_TOKEN } from "../../util/constant";

const Quiz = () => {
  const [quizs, setQuizs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(BASE_URL + `/quiz`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setQuizs(item.data.data);
      });
  }, []);

  const detail = (text) => {
    if (
      localStorage.getItem(CURRENT_QUIZ_ID) != null &&
      localStorage.getItem(CURRENT_QUIZ_ID) != text.id
    ) {
      alert("You in quiz " + localStorage.getItem(CURRENT_QUIZ_ID));
    } else {
      localStorage.setItem(CURRENT_QUIZ_ID, text.id);
      localStorage.setItem(IS_SUBMITTED, false);
      navigate(`/quiz-detail/` + text.id);
    }
  };

  return (
    <>
      <Layout>
        <Header>Quiz</Header>
        <Content>
          <Row align="middle" justify="center">
            <Col span={24}>
              <Card bordered={false} title={"All Quiz"}>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    navigate("/result-quiz");
                  }}
                >
                  Quiz Result
                </Button>
                <br />
                <br />
                <List
                  itemLayout="horizontal"
                  dataSource={quizs}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          type="primary"
                          onClick={(e) => {
                            detail(item);
                          }}
                        >
                          Challenge
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://thumbs.dreamstime.com/b/deep-learning-icon-isolated-white-background-your-web-mobile-app-design-133861833.jpg" />
                        }
                        title={item.quizName}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer>@Ikhsanhikari</Footer>
      </Layout>
    </>
  );
};
export default Quiz;
