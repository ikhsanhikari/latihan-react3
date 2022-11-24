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
import DetailQuiz from "../component/DetailQuiz";
import QuizCorrection from "../component/QuizCorrection";
import FinishQuiz from "../component/FinishQuiz";
import ResultQuizEachStudent from "../component/ResultQuizEachStudent";
import { ACCESS_TOKEN } from "../util/constant";

const isAuth = () => {
  return localStorage.getItem(ACCESS_TOKEN) != null;
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
          path: "/preview-for-student/:id",
          element: <ExercisePreview />,
        },
        {
          path: "/preview-for-instructur/:id/:studentId",
          element: <ExercisePreviewForInstructur />,
        },
        {
          path: "/result-all-student-exercise",
          element: <ResultAllStudentExercise />,
        },
        {
          path: "/quiz-detail/:id",
          element: <DetailQuiz />,
        },
        {
          path: "/quiz-correction/:id",
          element: <QuizCorrection />,
        },
        {
          path: "/finish-quiz",
          element: <FinishQuiz />,
        },
        {
          path: "/result-quiz",
          element: <ResultQuizEachStudent />,
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
