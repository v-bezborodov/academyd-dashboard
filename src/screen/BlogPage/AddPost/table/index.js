import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { PostDeleteThunk } from "../../../../redux/thunk/blog";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
}));

const PostPageTable = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deletePost = (id) => {
    dispatch(PostDeleteThunk(id))
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <>
                  <TableRow key={row.id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell onClick={() => deletePost(row.id)}>Delete</TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostPageTable;
