import { Button, Card, Layout, Table } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a href="/">{text}</a>,
  },
  {
    title: "Course Type",
    dataIndex: "courseType",
    key: "courseType",
  },
  {
    title: "Course Level",
    dataIndex: "courseLevel",
    key: "courseLevel",
  },
];
const data = [
  {
    key: "1",
    name: "Pattern 1",
    courseType: "Conditional",
    courseLevel: "low",
  },
  {
    key: "2",
    name: "Pattern 2",
    courseType: "Looping",
    courseLevel: "medium",
  },
  {
    key: "3",
    name: "Pattern 3",
    courseType: "Sequential",
    courseLevel: "hight",
  },
];

const ListExercise = () => {
  return (
    <Layout>
      <Header>List Exercise</Header>
      <Content>
        <Card>
        <Link to={"/create-exercise"}>
            <Button type="primary">Create Exercise</Button>
          </Link>
          <br /> <br />
          <Table columns={columns} dataSource={data} />
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};

export default ListExercise;
