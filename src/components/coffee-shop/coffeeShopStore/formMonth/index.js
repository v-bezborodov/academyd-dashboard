import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { CityGetThunk } from "../../../../redux/thunk/city";
import {
  CoffeePostMonthThunk,
  CoffeePostThunk,
} from "../../../../redux/thunk/coffee";
import CustomTextField from "../../../../partials/inputs/text";
import { BlockGridItem33, BlockGridItemData } from "./index.styled";
import {
  BlockGridItem100,
  BlockGridItem50,
} from "../../../../screen/CustomerPage/index.styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ExpandMoreSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const CoffeeShopStoreFormMonth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openCoffee_shop_id, setOpenСoffee_shop_id] = React.useState(false);
  const [coffee_shop_id, setCoffee_shop_id] = React.useState("");
  const city = useSelector((store) => store.city.city);
  const coffee = useSelector((store) => store.coffeeShops.coffeeShops);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setOpenСoffee_shop_id(false);
  };

  const handleOpen = () => {
    setOpenСoffee_shop_id(true);
  };

  const handleChangeCity_id = (event) => {
    setCoffee_shop_id(event.target.value);
  };

  useEffect(() => {
    dispatch(CityGetThunk());
  }, []);

  const onSubmit = async (data) => {
    if (!data) return;

    console.log(data);
    const formData = new FormData();

    formData.append("coffee_shop_id", data.coffee_shop_id);

    await dispatch(CoffeePostMonthThunk(formData));
    await reset();
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" expandIcon={<ExpandMoreSharp/>} id="panel1a-header">
          <Typography>Назначить кофейню месяца</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BlockGridItemData>
            <form
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Выберите кофейню
                </InputLabel>
                <Select
                  inputProps={register("coffee_shop_id", {
                    required: "Выберите кофейню",
                  })}
                  labelId="demo-controlled-open-select-label"
                  id="coffee_shop_id"
                  open={openCoffee_shop_id}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={coffee_shop_id}
                  onChange={handleChangeCity_id}
                  error={errors.coffee_shop_id}
                  helperText={
                    errors?.coffee_shop_id?.message &&
                    errors.coffee_shop_id.message
                  }
                >
                  {coffee?.map((row) => (
                    <MenuItem value={row.id}>{row.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <Button
                variant="contained"
                // color="primary"
                type="submit"
              >
                Отправить
              </Button>
            </form>
          </BlockGridItemData>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CoffeeShopStoreFormMonth;
