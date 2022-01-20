import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ADefault } from "../../../style/A.styled";
import { TestDeleteThunk } from "../../../redux/thunk/tests";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
}));

const TestPageTable = ({ data, triggerUpdate }) => {
  const classes = useStyles();

  const [tests, setTests] = useState(data);

  useEffect(() => setTests(data), [data]);

  const deleteTest = (event, id, index) => {
    if (event) event.preventDefault();
    if (!id) return;
    deleteRow(index);
    TestDeleteThunk(id, triggerUpdate);
  };

  const deleteRow = (index) => {
    if (index < 0) return;
    var dataBag = [...tests];
    dataBag.splice(index, 1);
    setTests(dataBag);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests &&
              tests.map((row, index) => (
                <TableRow key={row.title}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">
                    <ADefault
                      onClick={(e) => deleteTest(e, row.id, index)}
                      href={row.id}
                    >
                      Удалить
                    </ADefault>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TestPageTable;
