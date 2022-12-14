import React from "react";
import { useRoutes } from "react-router-dom";
import App from "../App";
import LoginComponent from "../auth/LoginComponent";
import SignupComponent from "../auth/SignupComponent";
import PageNotFoundComponent from "../common/PageNotFoundComponent";
import CreateSelfExercise from "../component/admin/CreateSelfExercise";
import CreateUser from "../component/admin/CreateUser";
import ListSelfExercise from "../component/admin/ListSelfExercise";
import ManagementUser from "../component/admin/ManagementUser";
import UploadModule from "../component/admin/UploadModule";
import CreateExercise from "../component/instructur/CreateExercise";
import { CreatePattern } from "../component/instructur/CreatePattern";
import CreateQuiz from "../component/instructur/CreateQuiz";
import ExercisePreviewForInstructur from "../component/instructur/ExercisePreviewForInstructur";
import ListExercise from "../component/instructur/ListExercise";
import { ListPattern } from "../component/instructur/ListPattern";
import ListQuiz from "../component/instructur/ListQuiz";
import { ProfileStudentForInstructur } from "../component/instructur/ProfileStudentForInstructur";
import QuizCorrection from "../component/instructur/QuizCorrection";
import ResultAllStudentExercise from "../component/instructur/ResultAllStudentExercise";
import ResultQuizEachStudent from "../component/instructur/ResultQuizEachStudent";
import ProfileComponent from "../component/ProfileComponent";
import DetailQuiz from "../component/student/DetailQuiz";
import { Exercise } from "../component/student/Exercise";
import ExerciseDetail from "../component/student/ExerciseDetail";
import ExercisePreview from "../component/student/ExercisePreview";
import FinishQuiz from "../component/student/FinishQuiz";
import Module from "../component/student/Module";
import Quiz from "../component/student/Quiz";
import { SelfExercise } from "../component/student/SelfExercise";
import SelfExerciseDetail from "../component/student/SelfExerciseDetail";
import SelfExercisePreview from "../component/student/SelfExercisePreview";
import StudentReport from "../component/instructur/StudentReport";
import { Home } from "../home/Home";
import { ACCESS_TOKEN } from "../util/constant";
import UpdateQuiz from "../component/instructur/UpdateQuiz";
import UpdateUser from "../component/admin/UpdateUser";

const isAuth = () => {
  return localStorage.getItem(ACCESS_TOKEN) != null;
};

const RouterComponent = () => {
  const isLoggin = isAuth();
  var role =
    localStorage.getItem("role") != null ? localStorage.getItem("role") : null;

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
          path: "/self-exercise",
          element: <SelfExercise />,
        },
        {
          path: "/list-self-exercise",
          element: <ListSelfExercise />,
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
          path: "/update-quiz/:id",
          element: <UpdateQuiz />,
        },
        {
          path: "/create-exercise",
          element: <CreateExercise />,
        },
        {
          path: "/create-self-exercise",
          element: <CreateSelfExercise />,
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
          path: "/self-exercise-detail/:id",
          element: <SelfExerciseDetail />,
        },
        {
          path: "/preview-for-student/:id",
          element: <ExercisePreview />,
        },
        {
          path: "/self-preview-for-student/:id",
          element: <SelfExercisePreview />,
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
        {
          path: "/management-user",
          element: <ManagementUser />,
        },
        {
          path: "/create-user",
          element: <CreateUser />,
        },
        {
          path: "/update-user/:id",
          element: <UpdateUser />,
        },
        {
          path: "/student",
          element: <StudentReport />,
        },
        {
          path: "/student-profile-for-instructur/:id",
          element: <ProfileStudentForInstructur />,
        },
        {
          path: "/upload-module",
          element: <UploadModule />,
        },
        {
          path: "/list-module",
          element: <Module />,
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
