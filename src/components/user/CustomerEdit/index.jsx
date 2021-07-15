import React, {useEffect} from 'react'
import {Button, FormControl, MenuItem, Select, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {CustomerShowThunk} from "../../../redux/thunk/customer";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
}));

const CustomerEdit = ({id}) => {
    const classes = useStyles();
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const dispatch = useDispatch()

    useEffect(() => {
        if(id) dispatch(CustomerShowThunk(id))
    }, [])

    const onSubmit = async (data) => {
        if (!data) return

    }

    return (
        <div>
            {id}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("name", {required: 'Не может быть пустым'})}
                           id="name"
                           label="Название"
                           error={errors.name}
                           helperText={errors?.name?.message && errors.name.message}/>

                {/*<TextField {...register("address", { required: 'Не может быть пустым' })}*/}
                {/*           id="address"*/}
                {/*           label="Адрес"*/}
                {/*           error={errors.address}*/}
                {/*           helperText={errors?.address?.message && errors.address.message} />*/}

                <TextField {...register("email",
                    {
                        required: 'Не может быть пустым',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Неправильный формат email',
                        },
                    })}
                           id="email"
                           label="E-mail"
                           type="email"
                           error={errors.email}
                           helperText={errors?.email?.message && errors.email.message}/>

                <TextField {...register("phone",
                    {
                        required: 'Не может быть пустым',
                        pattern: {
                            value: /^[0-9]{3,15}$/i,
                            message: 'Навильный формат',
                        },
                    })}
                           id="phone"
                           label="Телефон"
                           error={errors.phone}
                           helperText={errors?.phone?.message && errors.phone.message}/>

                <TextField {...register("instagram", {required: 'Не может быть пустым'})}
                           id="instagram"
                           label="instagram"
                           error={errors.instagram}
                           helperText={errors?.instagram?.message && errors.instagram.message}/>

                <TextField {...register("fb", {required: 'Не может быть пустым'})}
                           id="fb"
                           label="Facebook"
                           error={errors.fb}
                           helperText={errors?.fb?.message && errors.fb.message}/>

                <TextField {...register("vk", {required: 'Не может быть пустым'})}
                           id="vk"
                           label="Вконтакте"
                           error={errors.vk}
                           helperText={errors?.vk?.message && errors.vk.message}/>

                <TextField {...register("working_time", {required: 'Не может быть пустым'})}
                           id="working_time"
                           label="Время работы"
                           error={errors.working_time}
                           helperText={errors?.working_time?.message && errors.working_time.message}/>

                {/*<FormControl className={classes.formControl}>*/}
                {/*    <InputLabel id="demo-controlled-open-select-label">Город</InputLabel>*/}
                {/*    <Select*/}
                {/*        {...register("city_id", { required: 'Город не может быть пустым' })}*/}
                {/*        labelId="demo-controlled-open-select-label"*/}
                {/*        id="city_id"*/}
                {/*        open={openCity_id}*/}
                {/*        onClose={handleClose}*/}
                {/*        onOpen={handleOpen}*/}
                {/*        value={city_id}*/}
                {/*        onChange={handleChangeCity_id}*/}
                {/*        error={errors.city_id}*/}
                {/*        helperText={errors?.city_id?.message && errors.city_id.message}*/}
                {/*    >*/}
                {/*        {city?.map((row) => (*/}
                {/*            <MenuItem value={row.id}>{row.name}</MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

                <input {...register("avatar")} type="file" name="avatar"/>

                <br/>
                <Button variant="contained"
                        color="primary"
                        type="submit">
                    Сохранить
                </Button>
            </form>
        </div>
    )
}

export default CustomerEdit;
