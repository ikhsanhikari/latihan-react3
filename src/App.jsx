import {
  AlertOutlined,
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  RocketOutlined,
  UserOutlined,
  TrophyFilled,
  CloudUploadOutlined
} from "@ant-design/icons";
import { Col, Menu, PageHeader, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkLogic, CURRENT_QUIZ_ID, TIMER_QUIZ } from "./common/Util";
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
  const navigate = useNavigate();
  const onClick = (e) => {
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
    if (localStorage.getItem(TIMER_QUIZ) != null) {
      navigate("/quiz-detail/" + localStorage.getItem(CURRENT_QUIZ_ID));
    }
  }, []);

  var path = window.location.pathname;
  const routes = checkLogic(path);
  function itemRender(route) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>
        <span key={route.breadcrumbName}>{route.breadcrumbName}</span>
      </Link>
    );
  }

  const checkRole = (role) => {
    if (role == "ROLE_USER") {
      items = [
        {
          label: <Link to={"/home"}>Home</Link>,
          key: "home",
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/self-exercise"}>My Self Exercise</Link>,
          key: "self-exercise",
          icon: <RocketOutlined />,
        },
        {
          label: <Link to={"/exercise"}>My Exercise</Link>,
          key: "exercise",
          icon: <RocketOutlined />,
        },
        {
          label: <Link to={"/quiz"}>My Quiz</Link>,
          key: "quiz",
          icon: <AlertOutlined />,
        },
        {
          label: <Link to={"/list-module"}>My Module</Link>,
          key: "module",
          icon: <AlertOutlined />,
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
          label: <Link to={"/list-pattern"}>Pattern Management</Link>,
          key: "list_pattern",
          icon: <OrderedListOutlined />,
        },
        {
          label: <Link to={"/list-quiz"}>Quiz Management</Link>,
          key: "list_quiz",
          icon: <FormOutlined />,
        },
        {
          label: <Link to={"/list-exercise"}>Exercise Management</Link>,
          key: "list_exercise",
          icon: <FormOutlined />,
        },
        {
          label: <Link to={"/student"}>My Student</Link>,
          key: "student",
          icon: <TrophyFilled />,
        },
      ];
    } else if (role === "ROLE_ADMIN") {
      items = [
        {
          label: <Link to={"/home"}>Home</Link>,
          key: "home",
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/management-user"}>User Management</Link>,
          key: "management-user",
          icon: <UserOutlined />,
        },
        {
          label: <Link to={"/list-self-exercise"}>Self Exercise</Link>,
          key: "list_self_exercise",
          icon: <FormOutlined />,
        },
        {
          label: <Link to={"/list-pattern"}>Pattern Management</Link>,
          key: "list_pattern",
          icon: <OrderedListOutlined />,
        },
        {
          label: <Link to={"/upload-module"}>Upload Module</Link>,
          key: "upload_module",
          icon: <CloudUploadOutlined />,
        },
      ];
    }
  };
  return (
    <div>
      <Row
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
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
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Hikari Learning"
        subTitle="learning programming basic, make it easy"
        breadcrumb={{ routes, itemRender }}
        ghost={false}
      />

      <Outlet></Outlet>
    </div>
  );
};
export default App;
