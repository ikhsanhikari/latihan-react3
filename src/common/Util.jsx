import { ACCESS_TOKEN } from "../util/constant";
import jwt from "jwt-decode";

export const checkLogic = (param) => {
  console.log(param);
  console.log(param.includes("/preview-for-instructur"));
  var item = [];
  if (param === "/create-pattern") {
    item = [
      {
        path: "/list-pattern",
        breadcrumbName: "List Pattern",
      },
      {
        path: "/create-pattern",
        breadcrumbName: "Create Pattern",
      },
    ];
  } else if (param === "/" || param === "/home") {
    item = [
      {
        path: "/",
        breadcrumbName: "Home",
      },
    ];
  } else if (param === "/list-pattern") {
    item = [
      {
        path: "/list-pattern",
        breadcrumbName: "List Pattern",
      },
    ];
  } else if (param === "/list-quiz") {
    item = [
      {
        path: "/list-quiz",
        breadcrumbName: "List Quiz",
      },
    ];
  } else if (param === "/create-quiz") {
    item = [
      {
        path: "/list-quiz",
        breadcrumbName: "List Quiz",
      },
      {
        path: "/create-quiz",
        breadcrumbName: "Create Quiz",
      },
    ];
  } else if (param.includes("/quiz-correction")) {
    item = [
      {
        path: "/list-quiz",
        breadcrumbName: "List Quiz",
      },
      {
        path: "/quiz-correction",
        breadcrumbName: "Quiz Correction",
      },
    ];
  } else if (param === "/list-exercise") {
    item = [
      {
        path: "/list-exercise",
        breadcrumbName: "List Exercise",
      },
    ];
  } else if (param === "/create-exercise") {
    item = [
      {
        path: "/list-exercise",
        breadcrumbName: "List Exercise",
      },
      {
        path: "/create-exercise",
        breadcrumbName: "Create Exercise",
      },
    ];
  } else if (param === "/result-all-student-exercise") {
    item = [
      {
        path: "/list-exercise",
        breadcrumbName: "List Exercise",
      },
      {
        path: "/result-all-student-exercise",
        breadcrumbName: "Result all Student Exercise",
      },
    ];
  } else if (param.includes("/preview-for-instructur")) {
    item = [
      {
        path: "/list-exercise",
        breadcrumbName: "List Exercise",
      },
      {
        path: "/result-all-student-exercise",
        breadcrumbName: "Result all Student Exercise",
      },
      {
        path: "/preview-for-instructur/",
        breadcrumbName: "Preview Exercise",
      },
    ];
  } else if (param === "/exercise") {
    item = [
      {
        path: "/exercise",
        breadcrumbName: "Exercise",
      },
    ];
  } else if (param.includes("/preview-for-student")) {
    item = [
      {
        path: "/exercise",
        breadcrumbName: "Exercise",
      },
      {
        path: "/preview-for-instructur/",
        breadcrumbName: "Preview Exercise",
      },
    ];
  } else if (param.includes("/exercise-detail")) {
    item = [
      {
        path: "/exercise",
        breadcrumbName: "Exercise",
      },
      {
        path: "/exercise-detail/",
        breadcrumbName: "Challenge Exercise",
      },
    ];
  } else if (param === "/quiz") {
    item = [
      {
        path: "/quiz",
        breadcrumbName: "Quiz",
      },
    ];
  } else if (param === "/result-quiz") {
    item = [
      {
        path: "/quiz",
        breadcrumbName: "Quiz",
      },
      {
        path: "/result-quiz",
        breadcrumbName: "Result Quiz",
      },
    ];
  } else if (param.includes("/quiz-detail")) {
    item = [
      {
        path: "/quiz",
        breadcrumbName: "Quiz",
      },
      {
        path: "/quiz-detail/",
        breadcrumbName: "Challenge Quiz",
      },
    ];
  }

  return item;
};

// export const currentIdLogin = 1;
export const currentIdLogin =
  localStorage.getItem(ACCESS_TOKEN) != null
    ? jwt(localStorage.getItem(ACCESS_TOKEN)).sub
    : null;
export const TIMER_QUIZ = "timer_" + currentIdLogin;
export const CURRENT_QUIZ_ID = "current_quiz_" + currentIdLogin;
export const LONG_QUIZ_TIME = 5;
