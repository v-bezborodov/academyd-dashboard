import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BlockGridItem100 } from "../../eventStore/form/index.styled";
import { Link } from "react-router-dom";
import { EventDeleteThunk } from "../../../../redux/thunk/event";
import { ADefault } from "../../../../style/A.styled";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
  table_img: {
    width: "50px",
    height: "50px",
    borderRadius: "8px",
    objectFit: "cover",
  },
}));

const EventTable = ({ data, triggerUpdate }) => {
  const classes = useStyles();
  const [events, setEvents] = useState(data);

  useEffect(() => setEvents(data), [data]);

  const deleteEvent = (event, id, index) => {
    if (event) event.preventDefault();
    if (!id) return;
    deleteRow(index);
    EventDeleteThunk(id, triggerUpdate);
  };

  const deleteRow = (index) => {
    if (index < 0) return;
    var dataBag = [...events];
    dataBag.splice(index, 1);
    setEvents(dataBag);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Изображение</TableCell>
            <TableCell align="left">Название</TableCell>
            {/* <TableCell align="center">Текст</TableCell> */}
            <TableCell align="left">Адрес</TableCell>
            <TableCell align="center">Кол-во уч.</TableCell>
            <TableCell align="center">Активен</TableCell>
            <TableCell align=""></TableCell>
          </TableRow>
        </TableHead>
        {events && (
          <TableBody>
            {events.length > 0 &&
              events.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" align="left">
                    {row.img_public ? (
                      <a href={row.img_public}>
                        <img
                          className={classes.table_img}
                          src={process.env.REACT_APP_BASE_URL + row.img_public}
                        />
                      </a>
                    ) : (
                      <img
                        className={classes.table_img}
                        src="/img/template/no-image.png"
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  {/* <TableCell align="center">{row.body}</TableCell> */}
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="center">{row.max_attendee}</TableCell>
                  <TableCell align="center">
                    {row.is_published ? "Да" : "Нет"}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={"/event/" + row.id}>
                      <ADefault>Изменить</ADefault>{" "}
                    </Link>
                    <br />
                    <ADefault
                      href={row.id}
                      onClick={(e) => deleteEvent(e, row.id, index)}
                    >
                      Удалить
                    </ADefault>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default EventTable;
