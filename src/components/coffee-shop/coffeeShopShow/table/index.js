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
import { CoffeeGetThunk, CoffeeShopDeleteThunk } from "../../../../redux/thunk/coffee";
import { CityGetThunk } from "../../../../redux/thunk/city";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
  },
  table_img: {
    width: "50px",
    height: "auto",
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
      <p>Кофейни</p>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Изображение</TableCell>
              <TableCell>Название</TableCell>
              <TableCell align="right">Адрес</TableCell>
              <TableCell align="right">Контакты</TableCell>
              <TableCell align="right">Рабочие часы</TableCell>
              <TableCell align="right">Город</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coffee &&
              coffee.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.avatar_public ? (
                      <a
                        href={
                          process.env.REACT_APP_BASE_URL + row.avatar_public
                        }
                      >
                        <img
                          className={classes.table_img}
                          src={
                            process.env.REACT_APP_BASE_URL + row.avatar_public
                          }
                        />
                      </a>
                    ) : (
                      <img
                        className={classes.table_img}
                        src="./img/template/no-image.png"
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="left">
                    Телефон: {row.phone}
                    <br />
                    Email: {row.email}
                  </TableCell>
                  <TableCell align="right">{row.working_time}</TableCell>
                  <TableCell align="right">
                    {row?.city?.name && row.city.name}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={"/all-coffee/" + row.id + "/calendar"}>
                      Календарь
                    </Link>
                    <br />
                    <div onClick={() => deleteCoffeeShop(row)}>Удалить</div>
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
