import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const FinishQuiz = () => {
  const navigate = useNavigate();
  return (
    <Result
      icon={<SmileOutlined />}
      title="Great, we have done all the quiz!"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/quiz");
          }}
        >
          Home
        </Button>
      }
    />
  );
};
export default FinishQuiz;
