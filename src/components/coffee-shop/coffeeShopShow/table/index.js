import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  CoffeeGetThunk,
  CoffeeShopDeleteThunk,
} from "../../../../redux/thunk/coffee";
import { CityGetThunk } from "../../../../redux/thunk/city";
import { Link } from "react-router-dom";
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

const CoffeeTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const coffee = useSelector((store) => store.coffeeShops.coffeeShops);

  useEffect(() => {
    dispatch(CoffeeGetThunk(true));
    dispatch(CityGetThunk());
  }, []);

  const deleteCoffeeShop = (item) => {
    dispatch(CoffeeShopDeleteThunk(item.id));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Изображение</TableCell>
              <TableCell align="left">Название</TableCell>
              <TableCell align="left">Адрес</TableCell>
              <TableCell align="left">Рабочие часы</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coffee &&
              coffee.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" align="left">
                    {row.avatar_public ? (
                        <img
                          className={classes.table_img}
                          src={
                            process.env.REACT_APP_BASE_URL + row.avatar_public
                          }
                        />
                    ) : (
                      <img
                        className={classes.table_img}
                        src="./img/template/no-image.png"
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.working_time}</TableCell>
                  <TableCell align="right">
                    <Link to={"/all-coffee/" + row.id + "/calendar"}>
                      <ADefault>Календарь</ADefault>
                      
                    </Link>
                    <br />
                    <ADefault onClick={() => deleteCoffeeShop(row)}>Удалить</ADefault>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoffeeTable;
