import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ADefault } from "../../../../style/A.styled";
import { QuestionDeleteThunk } from "../../../../redux/thunk/questions";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
}));

const QestionsPageTable = ({ data, triggerUpdate }) => {
  const classes = useStyles();

  const [qestions, setQestions] = useState(data);

  useEffect(() => setQestions(data), [data]);

  const deleteQestion = (event, id, index) => {
    if (event) event.preventDefault();
    if (!id) return;
    deleteRow(index);
    QuestionDeleteThunk(id, triggerUpdate);
  };

  const deleteRow = (index) => {
    if (index < 0) return;
    var dataBag = [...qestions];
    dataBag.splice(index, 1);
    setQestions(dataBag);
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
            {qestions &&
              qestions.map((row, index) => (
                <TableRow key={row.title}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">
                    <ADefault
                      onClick={(e) => deleteQestion(e, row.id, index)}
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

export default QestionsPageTable;
