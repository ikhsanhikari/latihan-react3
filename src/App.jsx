import {
  AppstoreOutlined, FormOutlined, HomeOutlined,
  LogoutOutlined, OrderedListOutlined, UserOutlined
} from "@ant-design/icons";
import { Col, Menu, PageHeader, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ACCESS_TOKEN, EMAIL, NAME, ROLE } from "./util/constant";

let items = [];

const rightItems = [
  {
    label: <Link to={"/profile"}>{localStorage.getItem("email")}</Link>,
    key: "profile",
    icon: <UserOutlined />,
  },
  {
    label: <Link to={"/login"}>Logout</Link>,
    key: "logout",
    icon: <LogoutOutlined />,
  },
];
const App = () => {
  const [current, setCurrent] = useState("home");
  const [role, setRole] = useState();
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "logout") {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(EMAIL);
      localStorage.removeItem(NAME);
      localStorage.removeItem(ROLE);
    }
  };

  useEffect(() => {
    setRole(localStorage.getItem(ROLE));
    checkRole(localStorage.getItem(ROLE));
  }, []);

  const checkRole = (role) => {
    console.log(role);
    if (role == "ROLE_USER") {
      items = [
        {
          label: <Link to={"/home"}>Home</Link>,
          key: "home",
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/exercise"}>Exercise</Link>,
          key: "exercise",
          icon: <AppstoreOutlined />,
        },
      ];
    } else if (role === "ROLE_INSTRUKTUR") {
      items = [
        {
          label: <Link to={"/home"}>Home</Link>,
          key: "home",
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/list-pattern"}>Pattern</Link>,
          key: "list_pattern",
          icon: <OrderedListOutlined />,
        },
        {
          label: <Link to={"/list-quiz"}>Quiz</Link>,
          key: "list_quiz",
          icon: <FormOutlined />,
        },
        {
          label: <Link to={"/list-exercise"}>Exercise</Link>,
          key: "list_exercise",
          icon: <FormOutlined />,
        },
      ];
    } else if (role === "ROLE_ADMIN") {
    }
  };
  return (
    <div>
      <Row>
        <Col span={18}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            theme="dark"
          />
        </Col>
        <Col span={6}>
          <Menu
            style={{ justifyContent: "flex-end" }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={rightItems}
            theme="dark"
          />
        </Col>
      </Row>

      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Hikari Learning"
        subTitle="learning react, make it easy at all"
      />

      <Outlet></Outlet>
    </div>
  );
};
export default App;
