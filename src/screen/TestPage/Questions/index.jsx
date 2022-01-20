import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Menu from "../../../components/menu";
import { QuestionsGetThunk } from "../../../redux/thunk/questions";
import { TestsGetThunk } from "../../../redux/thunk/tests";
import {
  BlockGridItem33,
  BlockGridItem50,
  BlockGridItemData,
} from "../../CustomerPage/index.styled";
import QestionsPageTable from "./table";

const QuestionsPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions.questions);

  useEffect(() => {
    getDataQuestions()
  }, []);

  const getDataQuestions = () => {
    dispatch(QuestionsGetThunk());
  };

  const triggerUpdate = () => {
    getDataQuestions();
  };

  return (
    <div className="container">
      <Menu />
      <div>
        <BlockGridItem33>
          <BlockGridItemData style={{}}>
            <Button
              variant="contained"
              // color="primary"
              onClick={() => history.push("all-questions/new")}
            >
              Создать вопрос
            </Button>
          </BlockGridItemData>
        </BlockGridItem33>
        <QestionsPageTable data={questions} triggerUpdate={triggerUpdate}/>
      </div>
    </div>
  );
};

export default QuestionsPage;
