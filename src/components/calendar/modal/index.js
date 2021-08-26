import React, {useEffect, useState} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomModal from "../../../partials/modal";
import {Button, FormControl, MenuItem, Select, TextField} from "@material-ui/core";
import CustomTextField from "../../../partials/inputs/text";
import InputLabel from "@material-ui/core/InputLabel";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import {coffeePlaceGetThunk, CoffeePlaceGetThunk} from "../../../redux/thunk/coffeePlace";
import {coffeeGetUserWorkingTimeThunk} from "../../../redux/thunk/coffee";
import {customerGetThunk} from "../../../redux/thunk/customer";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
}));


const CalendarModal = ({open, setOpen, setClose}) => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const classes = useStyles();

    const [coffeeShopPlace, setCoffeeShopPlace] = useState({});
    const [users, setUsers] = useState({});

    useEffect(() => {
        getCoffeePlace();
        getCustomers();
    }, []);

    const setAction = (event) => {

        onSubmit(event)

    };

    const onSubmit = (data) => {
        console.log('data', data)

    };

    const handleClose = () => {

    };

    const handleOpen = () => {

    };

    const handleDataCallbackCoffeePlace = (data) => {
        if (!data) return;
        setCoffeeShopPlace(data)
    }

    const handleDataCallbackUsers = (data) => {
        if (!data) return;
        setUsers(data)
    }

    const handleChangeCoffeePlace = () => {

    }

    const getCustomers = () => {
        customerGetThunk(handleDataCallbackUsers);
    }

    const getCoffeePlace = () => {
        coffeePlaceGetThunk(handleDataCallbackCoffeePlace)
    }


    return (

        <CustomModal {...{open, setOpen, setClose, setAction}}
                     title={"Добавить в календарь"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*<FormControl>*/}
                {/*    <CustomTextField inputProps={register("name", {required: 'Не может быть пустым'})}*/}
                {/*                     id="name"*/}
                {/*                     label="Название"*/}
                {/*                     error={!!errors.name}*/}
                {/*                     helperText={errors?.name?.message && errors.name.message}/>*/}

                {/*</FormControl>*/}
                {/*{JSON.stringify(coffeeShopPlace)}*/}

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Место в кофейне</InputLabel>
                    <Select
                        inputProps={register("coffee_place", {required: 'Город не может быть пустым'})}
                        labelId="demo-controlled-open-select-label"
                        id="coffee_place"
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleChangeCoffeePlace}
                        error={errors.coffee_place}
                        helperText={errors?.coffee_place?.message && errors.coffee_place.message}
                    >
                        {coffeeShopPlace.length>0 && coffeeShopPlace.map((row) => (
                            <MenuItem value={row.id}>{row.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Пользователь</InputLabel>
                    <Select
                        inputProps={register("users", {required: 'Не может быть пустым'})}
                        labelId="demo-controlled-open-select-label"
                        id="users"
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleChangeCoffeePlace}
                        error={errors.coffee_place}
                        helperText={errors?.coffee_place?.message && errors.coffee_place.message}
                    >
                        {users.length>0 && users.map((row) => (
                            <MenuItem value={row.id}>{row.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/*<input {...register("avatar")} type="file" name="avatar"/>*/}

                {/*<br/>*/}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Создать новую кофейню
                </Button>
            </form>
        </CustomModal>

    )
}

export default CalendarModal;
