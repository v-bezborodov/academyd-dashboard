import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import {
  coffeePlaceGetThunk,
  CoffeePlaceGetThunk,
} from "../../../redux/thunk/coffeePlace";
import { customerGetThunk } from "../../../redux/thunk/customer";
import CustomDatePicker from "../../../partials/datepicker";
import { calendarPostThunk } from "../../../redux/thunk/calendar";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const CalendarForm = ({ start, end, setClose, getWorking }) => {
  let { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const classes = useStyles();

  const [coffeeShopPlace, setCoffeeShopPlace] = useState({});
  const [users, setUsers] = useState({});
  const [working_date_from, setDateFrom] = useState(start);
  const [working_date_to, setDateTo] = useState(end);

  useEffect(() => {
    getCoffeePlace();
    getCustomers();
  }, []);

  useEffect(() => {
    if (start) setDateFrom(start);
    if (end) setDateTo(end);
  }, [start, end]);

  // const setAction = (event) => {
  //
  //     onSubmit(event)
  //
  // };

  const onSubmit = (data) => {
    console.log("data", data);
    setClose()
    const options = {
      working_date_from,
      working_date_to,
      сoffee_shop_id: id,
      ...data,
    };

    calendarPostThunk(options);
    getWorking()
  };

  const handleClose = () => {};

  const handleOpen = () => {};

  const handleDataCallbackCoffeePlace = (data) => {
    if (!data) return;
    setCoffeeShopPlace(data);
  };

  const handleDataCallbackUsers = (data) => {
    if (!data) return;
    setUsers(data);
  };

  const handleChangeCoffeePlace = () => {};

  const getCustomers = () => {
    customerGetThunk(handleDataCallbackUsers);
  };

  const getCoffeePlace = () => {
    coffeePlaceGetThunk(handleDataCallbackCoffeePlace);
  };

  const callbackStart = (e) => {
    if (e) setDateFrom(e);
  };

  const callbackEnd = (e) => {
    if (e) setDateTo(e);
  };

  return (
    <form
      style={{ display: "grid", gap: "15px",width: '400px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Место в кофейне
        </InputLabel>
        <Select
          inputProps={register("сoffee_shop_place_id", {
            required: "Город не может быть пустым",
          })}
          labelId="demo-controlled-open-select-label"
          id="сoffee_shop_place_id"
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChangeCoffeePlace}
          error={errors.сoffee_shop_place_id}
          helperText={
            errors?.сoffee_shop_place_id?.message &&
            errors.сoffee_shop_place_id.message
          }
        >
          {coffeeShopPlace.length > 0 &&
            coffeeShopPlace.map((row) => (
              <MenuItem value={row.id}>{row.name}</MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Пользователь
        </InputLabel>
        <Select
          inputProps={register("user_id", { required: "Не может быть пустым" })}
          labelId="demo-controlled-open-select-label"
          id="user_id"
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChangeCoffeePlace}
          error={errors.user_id}
          helperText={errors?.user_id?.message && errors.user_id.message}
        >
          {users.length > 0 &&
            users.map((row) => <MenuItem value={row.id}>{row.name}</MenuItem>)}
        </Select>
      </FormControl>

      {working_date_from && (
        <CustomDatePicker date={working_date_from} callback={callbackEnd} />
      )}

      {working_date_to && (
        <CustomDatePicker date={working_date_to} callback={callbackStart} />
      )}

      <div style={{
              display: 'grid', gap: '10px', gridTemplateColumns: '2fr 1fr'
      }}>
        <Button
          variant="contained"
          // color="primary"
          type="submit"
        >
          Сохранить
        </Button>

        <Button
          variant="contained"
          // color="primary"
          onClick={setClose}
        >
          Закрыть
        </Button>
      </div>
    </form>
  );
};

export default CalendarForm;
