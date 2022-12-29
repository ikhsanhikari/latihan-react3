import { Anchor, Button, Card, Col, Row, Statistic } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomeStudent = () => {
  const navigate = useNavigate();
  return (
    <>
      
      <Card title={"Self Exercise"}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Not finish yet" value={5} />
            <Button
              onClick={() => {
                navigate("/exercise");
              }}
            >
              Check
            </Button>
          </Col>
          <Col span={12}>
            <Statistic title="Finish" value={10} />
            <Button
              onClick={() => {
                navigate("/result-exercise");
              }}
            >
              Check
            </Button>
          </Col>
        </Row>
      </Card> <br />
      <Card title={"Exercise"}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Not finish yet" value={5} />
            <Button
              onClick={() => {
                navigate("/exercise");
              }}
            >
              Check
            </Button>
          </Col>
          <Col span={12}>
            <Statistic title="Finish" value={10} />
            <Button
              onClick={() => {
                navigate("/result-exercise");
              }}
            >
              Check
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default HomeStudent;
