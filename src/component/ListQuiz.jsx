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

const ListQuiz = () => {
  return (
    <Layout>
      <Header>List Quiz</Header>
      <Content>
        <Card>
          <Link to={"/create-quiz"}>
            <Button type="primary">Create Quiz</Button>
          </Link>
          <br /> <br />
          <Table columns={columns} dataSource={data} />
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};

export default ListQuiz;
