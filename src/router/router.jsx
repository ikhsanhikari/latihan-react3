import React from "react";
import { useRoutes } from "react-router-dom";
import LoginComponent from "../auth/LoginComponent";
import SignupComponent from "../auth/SignupComponent";
import { Home } from "../home/Home";
import { Exercise } from "../component/Exercise";
import { CreatePattern } from "../component/CreatePattern";
import { ListPattern } from "../component/ListPattern";
import App from "../App";
import PageNotFoundComponent from "../common/PageNotFoundComponent";
import CreateQuiz from "../component/CreateQuiz";
import CreateExercise from "../component/CreateExercise";
import ProfileComponent from "../component/ProfileComponent";
import ExerciseDetail from "../component/ExerciseDetail";
import ListQuiz from "../component/ListQuiz";
import ListExercise from "../component/ListExercise";
import Quiz from "../component/Quiz";
import ExercisePreview from "../component/ExercisePreview";
import ResultAllStudentExercise from "../component/ResultAllStudentExercise";
import ExercisePreviewForInstructur from "../component/ExercisePreviewForInstructur";

const isAuth = () => {
  return localStorage.getItem("token") != null;
};

const RouterComponent = () => {
  const isLoggin = isAuth();
  let r = useRoutes([
    {
      path: "/",
      element: isLoggin ? <App /> : <LoginComponent />,
      errorElement: <PageNotFoundComponent />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/exercise",
          element: <Exercise />,
        },
        {
          path: "/quiz",
          element: <Quiz />,
        },
        {
          path: "/create-pattern",
          element: <CreatePattern />,
        },
        {
          path: "/list-pattern",
          element: <ListPattern />,
        },
        {
          path: "/list-quiz",
          element: <ListQuiz />,
        },
        {
          path: "/list-exercise",
          element: <ListExercise />,
        },
        {
          path: "/create-quiz",
          element: <CreateQuiz />,
        },
        {
          path: "/create-exercise",
          element: <CreateExercise />,
        },
        {
          path: "/profile",
          element: <ProfileComponent />,
        },
        {
          path: "/exercise-detail/:id",
          element: <ExerciseDetail />,
        },
        {
          path: "/preview/:id",
          element: <ExercisePreview />,
        },
        {
          path: "/preview/:id/:studentId",
          element: <ExercisePreviewForInstructur />,
        },
        {
          path: "/result-all-student-exercise",
          element: <ResultAllStudentExercise />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/signup",
      element: <SignupComponent />,
    },
  ]);
  return r;
};

export default RouterComponent;
