import { Card, Col, Row, Statistic } from "antd";
import React from "react";

export const HomeInstructur = () => {
  return (
    <Card>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Student" value={1128} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Student" value={1128} />
        </Col>
        <Col span={12}>
          <Statistic title="Student" value={1128} />
        </Col>
      </Row>
    </Card>
  );
};
