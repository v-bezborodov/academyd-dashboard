import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerShowThunk,
  СustomerPutPositionCoffeeThunk,
} from "../../../../redux/thunk/customer";
import { CoffeeGetThunk } from "../../../../redux/thunk/coffee";
import { PositionsGetThunk } from "../../../../redux/thunk/positions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const CustomerEditCoffee = ({ id }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const coffee = useSelector((store) => store.coffeeShops.coffeeShops);
  const position = useSelector((store) => store.position.positions);
  const [openPositionId, setOpenPositionId] = React.useState(false);
  const [positionId, setPositionId] = React.useState();

  useEffect(() => {
    if (id) dispatch(CustomerShowThunk(id));
    dispatch(CoffeeGetThunk());
    dispatch(PositionsGetThunk());
  }, []);

  const [openCoffeeId, setOpenCoffeeId] = React.useState(false);
  const [coffeeId, setCoffeeId] = React.useState();

  const handleCloseCoffeeId = () => {
    setOpenCoffeeId(false);
  };

  const handleOpenCoffeeId = () => {
    setOpenCoffeeId(true);
  };

  const handleChangeCoffeeId = (event) => {
    setCoffeeId(event.target.value);
  };

  const handleClosePositionId = () => {
    setOpenPositionId(false);
  };

  const handleOpenPositionId = () => {
    setOpenPositionId(true);
  };

  const handleChangePositionId = (event) => {
    setPositionId(event.target.value);
  };

  console.log(id)
  const onSubmit = async (data) => {
    if (!data) return;
    const formData = new FormData();
    formData.append("coffee_shop_id", coffeeId);
    formData.append("position_id", positionId);

    dispatch(СustomerPutPositionCoffeeThunk(formData, id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Кофешоп
            </InputLabel>
            <Select
              {...register("coffee_id", {
                required: "Кофешоп не может быть пустым",
              })}
              labelId="demo-controlled-open-select-label"
              id="coffee_id"
              open={openCoffeeId}
              onClose={handleCloseCoffeeId}
              onOpen={handleOpenCoffeeId}
              value={coffeeId}
              onChange={handleChangeCoffeeId}
              error={!!errors.coffee_id}
            >
              {coffee?.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Должность
            </InputLabel>
            <Select
              {...register("position_id", {
                required: "Должность не может быть пустой",
              })}
              labelId="demo-controlled-open-select-label"
              id="position_id"
              open={openPositionId}
              onClose={handleClosePositionId}
              onOpen={handleOpenPositionId}
              value={positionId}
              onChange={handleChangePositionId}
              error={!!errors.position_id}
            >
              {position?.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <br />
        <Button variant="contained" 
        // color="primary" 
        type="submit">
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default CustomerEditCoffee;
