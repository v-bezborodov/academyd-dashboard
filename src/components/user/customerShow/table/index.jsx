import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { BlockGridItem100 } from "../../../../screen/CustomerPage/index.styled";
import {
  CustomerDeleteThunk,
  CustomerGenerarPassThunk,
} from "../../../../redux/thunk/customer";
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

export default function CustomerTable({ data, triggerUpdate }) {
  const classes = useStyles();
  const [users, setUsers] = useState(data);

  useEffect(() => setUsers(data), [data]);

  function deleteUser(event, id, index) {
    if (event) event.preventDefault();
    if (!id) return;
    deleteRow(index);
    CustomerDeleteThunk(id, triggerUpdate);
  }

  const generarPass = (event, id) => {
    if (event) event.preventDefault();
    CustomerGenerarPassThunk(id);
  };

  const deleteRow = (index) => {
    if (index < 0) return;
    var dataBag = [...users];
    dataBag.splice(index, 1);
    setUsers(dataBag);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Аватар</TableCell>
              <TableCell align="left">Телефон</TableCell>
              <TableCell align="left">Имя</TableCell>
              {/* <TableCell align="right">E-mail</TableCell> */}
              <TableCell align="center">Соцсети</TableCell>
              {/* <TableCell align="right">status</TableCell> */}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          {users && (
            <TableBody>
              {users.length > 0 &&
                users.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.avatar_public ? (
                          <img
                            className={classes.table_img}
                            src={
                              process.env.REACT_APP_BASE_URL + row.avatar_public
                            }
                            alt=""
                          />
                      ) : (
                        <img
                          className={classes.table_img}
                          src="/img/template/no-image.png"
                          alt=""
                        />
                      )}
                    </TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    {/* <TableCell align="center">{row.email}</TableCell> */}
                    <TableCell align="center">
                      {row.instagram && (
                        <>
                          <ADefault href={row.instagram}>Instagram</ADefault>
                          <br />
                        </>
                      )}
                      {row.fb && (
                        <>
                          <ADefault href={row.fb}>
                            Facebook
                            <br />
                          </ADefault>
                        </>
                      )}
                      {row.vk && (
                        <>
                          <ADefault href={row.vk}>Vkontakte</ADefault>
                        </>
                      )}
                    </TableCell>
                    {/* <TableCell align="center">{row.status}</TableCell> */}
                    <TableCell align="right">
                      <Link to={"/all-customer/" + row.id}><ADefault>Изменить</ADefault></Link>
                      <br />
                      <ADefault
                        href={row.id}
                        onClick={(e) => deleteUser(e, row.id, index)}
                      >
                        Удалить
                      </ADefault>
                      <br />
                      <ADefault href={row.id} onClick={(e) => generarPass(e, row.id)}>
                        Сбросить пароль
                      </ADefault>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
