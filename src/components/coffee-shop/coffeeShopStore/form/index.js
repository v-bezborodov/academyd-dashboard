import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { CityGetThunk } from "../../../../redux/thunk/city";
import { CoffeeGetAllIikoThunk, CoffeePostThunk } from "../../../../redux/thunk/coffee";
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

const CoffeeShopStoreForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openCity_id, setOpenCity_id] = React.useState(false);
  const [city_id, setCity_id] = React.useState("");
  const [dataIiko, setDataIiko] = React.useState([]);
  const [dataIikoId, setDataIikoId] = React.useState("");
  const [dataIikoOpen, setDataIikoOpen] = React.useState("");

  const city = useSelector((store) => store.city.city);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setOpenCity_id(false);
  };

  const handleOpen = () => {
    setOpenCity_id(true);
  };

  const handleChangeCity_id = (event) => {
    setCity_id(event.target.value);
  };


  const handleCloseIiko = () => {
    setDataIikoOpen(false);
  };

  const handleOpenIiko = () => {
    setDataIikoOpen(true);
  };

  const handleChangeIiko_id = (event) => {
    setDataIikoId(event.target.value);
  };


  useEffect(() => {
    dispatch(CityGetThunk());
    dispatch(CoffeeGetAllIikoThunk(handleDataCallback))
  }, []);

  const handleDataCallback = (data) => {
    if (!data) return
    setDataIiko(data.data);
}


  const onSubmit = async (data) => {
    if (!data) return;

    const formData = new FormData();

    formData.append("avatar", data.avatar[0]);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("instagram", data.instagram);
    formData.append("fb", data.fb);
    formData.append("vk", data.vk);
    formData.append("working_time", data.working_time);
    formData.append("city_id", data.city_id);
    formData.append("iiko_department_id", data.iiko_department_id);

    await dispatch(CoffeePostThunk(formData));
    await reset();
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" expandIcon={<ExpandMoreSharp/>}  id="panel1a-header">
          <Typography>Добавить новую кофейню</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BlockGridItemData>
            <form
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <TextField
                  inputProps={register("name", {
                    required: "Не может быть пустым",
                  })}
                  id="name"
                  label="Название"
                  error={!!errors.name}
                  helperText={errors?.name?.message && errors.name.message}
                />
              </FormControl>
              <FormControl>
                <TextField
                  inputProps={register("address", {
                    required: "Не может быть пустым",
                  })}
                  id="address"
                  label="Адрес"
                  error={errors.address}
                  helperText={
                    errors?.address?.message && errors.address.message
                  }
                />
              </FormControl>
              <FormControl>
                <TextField
                  inputProps={register("email", {
                    required: "Не может быть пустым",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Неправильный формат email",
                    },
                  })}
                  id="email"
                  label="E-mail"
                  type="email"
                  error={errors.email}
                  helperText={errors?.email?.message && errors.email.message}
                />
              </FormControl>

              <FormControl>
                <TextField
                  inputProps={register("phone", {
                    required: "Не может быть пустым",
                    pattern: {
                      value: /^[0-9]{3,15}$/i,
                      message: "Навильный формат",
                    },
                  })}
                  id="phone"
                  label="Телефон"
                  error={errors.phone}
                  helperText={errors?.phone?.message && errors.phone.message}
                />
              </FormControl>

              <FormControl>
                <TextField
                  inputProps={register("instagram", {
                    required: "Не может быть пустым",
                  })}
                  id="instagram"
                  label="instagram"
                  error={errors.instagram}
                  helperText={
                    errors?.instagram?.message && errors.instagram.message
                  }
                />
              </FormControl>
              <FormControl>
                <TextField
                  inputProps={register("fb", {
                    required: "Не может быть пустым",
                  })}
                  id="fb"
                  label="Facebook"
                  error={errors.fb}
                  helperText={errors?.fb?.message && errors.fb.message}
                />
              </FormControl>
              <FormControl>
                <TextField
                  inputProps={register("vk", {
                    required: "Не может быть пустым",
                  })}
                  id="vk"
                  label="Вконтакте"
                  error={errors.vk}
                  helperText={errors?.vk?.message && errors.vk.message}
                />
              </FormControl>
              <FormControl>
                <TextField
                  inputProps={register("working_time", {
                    required: "Не может быть пустым",
                  })}
                  id="working_time"
                  label="Время работы"
                  error={errors.working_time}
                  helperText={
                    errors?.working_time?.message && errors.working_time.message
                  }
                />
              </FormControl>
              
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Id кофейни из Iiko
                </InputLabel>
                <Select
                  inputProps={register("iiko_department_id", {
                    required: "Город не может быть пустым",
                  })}
                  labelId="demo-controlled-open-select-label"
                  id="iiko_department_id"
                  open={dataIikoOpen}
                  onClose={handleCloseIiko}
                  onOpen={handleOpenIiko}
                  value={dataIikoId}
                  onChange={handleChangeIiko_id}
                  error={errors.iiko_department_id}
                  helperText={
                    errors?.iiko_department_id?.message && errors.iiko_department_id.message
                  }
                >
                  {dataIiko && dataIiko?.map((row) => (
                    <MenuItem value={row.id}>{row.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Город
                </InputLabel>
                <Select
                  inputProps={register("city_id", {
                    required: "Город не может быть пустым",
                  })}
                  labelId="demo-controlled-open-select-label"
                  id="city_id"
                  open={openCity_id}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={city_id}
                  onChange={handleChangeCity_id}
                  error={errors.city_id}
                  helperText={
                    errors?.city_id?.message && errors.city_id.message
                  }
                >
                  {city?.map((row) => (
                    <MenuItem value={row.id}>{row.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <input {...register("avatar")} type="file" name="avatar" />

              <br />
              <Button
                variant="contained"
                // color="primary"
                type="submit"
              >
                Создать новую кофейню
              </Button>
            </form>
          </BlockGridItemData>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CoffeeShopStoreForm;
