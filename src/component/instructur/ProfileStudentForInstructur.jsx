import { Card, Descriptions, Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../common/Constant";
import { ACCESS_TOKEN } from "../../util/constant";

export const ProfileStudentForInstructur = () => {
  const [profile, setProfile] = useState({});
  const { id } = useParams();

  const getById = () => {
    axios
      .get(BASE_URL + "/student_exercise_answer/profile_for_instructur/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((item) => {
        setProfile(item.data);
      });
  };
  useEffect(() => {
    getById();
  }, []);
  return (
    <Layout>
      <Header>Student's Profile</Header>
      <Content>
        <Card>
          <Descriptions title="Student's Profile">
            <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
            <Descriptions.Item label="Name">{profile.name}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card>
          <Descriptions title="Quiz">
            <Descriptions.Item label="Total">
              {profile.totalQuiz === undefined
                ? "load"
                : profile.totalQuiz.amount}
            </Descriptions.Item>
            <Descriptions.Item label="Finished">
              {profile.quiz === undefined ? "load" : profile.quiz.amount}
            </Descriptions.Item>
            <Descriptions.Item label="Average">
              {profile.quiz === undefined ? "load" : profile.quiz.amount} From{" "}
              {profile.totalQuiz === undefined
                ? "load"
                : profile.totalQuiz.amount}{" "}
              Quiz Finished
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card>
          <Descriptions title="Exercise">
            <Descriptions.Item label="Total">
              {profile.totalExercise === undefined
                ? "load"
                : profile.totalExercise.amount}
            </Descriptions.Item>
            <Descriptions.Item label="Finished">
              {profile.exercise === undefined
                ? "load"
                : profile.exercise.amount}
            </Descriptions.Item>
            <Descriptions.Item label="Average">
              {profile.exercise === undefined
                ? "load"
                : profile.exercise.amount}{" "}
              From{" "}
              {profile.totalExercise === undefined
                ? "load"
                : profile.totalExercise.amount}{" "}
              Exercises Finished
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card>
          <Descriptions title="Self Exercise">
            <Descriptions.Item label="Total">
              {profile.totalSelfExercise === undefined
                ? "load"
                : profile.totalSelfExercise.amount}
            </Descriptions.Item>
            <Descriptions.Item label="Finished">
              {profile.selfExercise === undefined
                ? "load"
                : profile.selfExercise.amount}
            </Descriptions.Item>
            <Descriptions.Item label={"Conclusion"}>
              {profile.selfExercise === undefined
                ? "load"
                : profile.selfExercise.amount}{" "}
              from{" "}
              {profile.totalSelfExercise === undefined
                ? "load"
                : profile.totalSelfExercise.amount}{" "}
              Self Exercises Finished
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
      <Footer>@ikhsanhikari</Footer>
    </Layout>
  );
};
