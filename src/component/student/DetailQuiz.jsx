import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import {
  Button,
  Card,
  Col,
  Layout,
  notification,
  Popconfirm,
  Row,
  Space,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BASE_URL,
  COMPILER_API,
  COMPILER_LANGUAGE,
  Default_C_code,
} from "../../common/Constant";
import {
  currentIdLogin,
  CURRENT_QUIZ_ID,
  IS_SUBMITTED,
  TIMER_QUIZ,
} from "../../common/Util";
import { ACCESS_TOKEN } from "../../util/constant";

const DetailQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [code, setCode] = useState(Default_C_code);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState(COMPILER_LANGUAGE);
  const navigate = useNavigate();
  const [counter, setCounter] = useState({});
  let interval;

  const onChange = React.useCallback((value) => {
    setCode(value);
  }, []);

  const getGuizById = () => {
    axios
      .get(BASE_URL + `/quiz/` + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setQuiz(item.data.data);
        quizTimer(item.data.data.longQuizTimer);
      });
  };
  const addMinutes = (date, minutes) => {
    return new Date(date + minutes * 60000);
  };

  const quizTimer = (timerParam) => {
    console.log(timerParam);
    var timer = localStorage.getItem(TIMER_QUIZ);
    var time = 30;

    if (timer == null) {
      var nowDate = new Date().getTime();
      var newDate = addMinutes(nowDate, timerParam);
      time = newDate.getTime();
      localStorage.setItem(TIMER_QUIZ, newDate.getTime());
    } else {
      time = timer;
    }
    interval = setInterval(() => {
      var now = new Date().getTime();

      var distance = time - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCounter({ minutes: minutes, seconds: seconds });

      if (distance < 0) {
        clearInterval(interval);
        finishQuiz();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    getGuizById();

    // eslint-disable-next-line
  }, []);

  const compile = () => {
    var request = {};
    request.code = code.replace("/n", "");
    request.language = language;
    axios
      .post(COMPILER_API, request)
      .then((item) => {
        console.log(item);
        openNotificationWithIcon("success");
        setOutput(item.data.output);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Success compile",
    });
  };
  const finishQuiz = () => {
    // console.log(localStorage.getItem(IS_SUBMITTED));
    // if (!localStorage.getItem(IS_SUBMITTED)) {
    //   localStorage.removeItem(IS_SUBMITTED);
    //   console.log("Time's up!");
    //   onSubmit();
    // } else {
    //   localStorage.removeItem(IS_SUBMITTED);
    //   console.log("Quiz has Sumitted!");
    // }
    onSubmit();
  };
  const onSubmit = () => {
    console.log('interval '+interval);
    clearInterval(interval);
    var userId = jwt(localStorage.getItem(ACCESS_TOKEN));
    var req = {};
    req.studentId = userId.sub;
    req.quizId = id;
    req.answer = code;
    axios
      .post(BASE_URL + `/student_quiz`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        openNotificationWithIcon("success");
        setCounter({ minutes: 0, seconds: 0 });
        localStorage.removeItem(TIMER_QUIZ);
        localStorage.removeItem(CURRENT_QUIZ_ID);
        localStorage.setItem(IS_SUBMITTED, true);
        console.log("set submitted true");
        navigate("/finish-quiz");
      });
  };
  return (
    <>
      <Layout>
        <Header>
          Due time in minutes = {counter.minutes} {counter.seconds}
        </Header>
        <Content>
          <br />
          <Row justify="start">
            <Col span={12}>
              <Card bordered={false}>
                <pre
                  style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
                >
                  {quiz.question}
                </pre>
              </Card>
            </Col>
            <Col span={12}>
              <CodeMirror
                value={code}
                height="600px"
                extensions={[java()]}
                onChange={onChange}
                theme={oneDark}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Space>
                <Button type="primary" onClick={compile}>
                  Compile
                </Button>
                <Popconfirm
                  title="Your answer will be saved, are you sure?"
                  onConfirm={(e) => onSubmit()}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">Submit</Button>
                </Popconfirm>
              </Space>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <pre>{output}</pre>
            </Col>
          </Row>
        </Content>
        <Footer>@Ikhsanhikari</Footer>
      </Layout>
    </>
  );
};

export default DetailQuiz;
