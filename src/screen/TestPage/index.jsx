import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Menu from "../../components/menu";
import { TestsGetThunk } from "../../redux/thunk/tests";
import {
  BlockGridItem50,
  BlockGridItemData,
} from "../CustomerPage/index.styled";
import TestPageTable from "./table";

const TestPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const tests = useSelector((store) => store.tests.tests);

  useEffect(() => {
    getDataTest()
  }, []);

  const getDataTest = () => {
    dispatch(TestsGetThunk());
  };

  const triggerUpdate = () => {
    getDataTest();
  };

  return (
    <div className="container">
      <Menu />
      <div>
        <BlockGridItem50>
          <BlockGridItemData
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <Button
              variant="contained"
              // color="primary"
              onClick={() => history.push("/all-questions")}
            >
              Все вопросы
            </Button>
            <Button
              variant="contained"
              // color="primary"
              onClick={() => history.push("/all-test/new")}
            >
              Создать тест
            </Button>
          </BlockGridItemData>
        </BlockGridItem50>
        <TestPageTable data={tests} triggerUpdate={triggerUpdate}/>
      </div>
    </div>
  );
};

export default TestPage;
