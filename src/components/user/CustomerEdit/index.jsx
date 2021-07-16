import React, { useEffect } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { CustomerPutThunk, CustomerShowThunk } from "../../../redux/thunk/customer";
import { CityGetThunk } from '../../../redux/thunk/city';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
}));

const CustomerEdit = ({ id }) => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()
    const city = useSelector(store => store.city.city)

    useEffect(() => {
        if (id) 
        dispatch(CustomerShowThunk(id))
        dispatch(CityGetThunk())
    }, [])



    const [openCityId, setOpenCityId] = React.useState(false);
    const [cityId, setCityId] = React.useState();


    const handleCloseCityId = () => {
        setOpenCityId(false);
    };

    const handleOpenCityId = () => {
        setOpenCityId(true);
    };

    const handleChangeCityId = (event) => {
        setCityId(event.target.value);
    };


    const onSubmit = async (data) => {
        if (!data) return
        const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('avatar', data.avatar[0]);
            formData.append('instagram', data.instagram);
            formData.append('fb', data.fb);
            formData.append('vk', data.vk);
            formData.append('status', data.status);
            formData.append('city_id', cityId);

            dispatch(CustomerPutThunk(formData, id))
    }

    return (
        <div>
            Юзер {id}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("name", { required: 'Не может быть пустым' })}
                    id="name"
                    label="Название"
                    error={errors.name}
                    helperText={errors?.name?.message && errors.name.message} />

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
                    helperText={errors?.email?.message && errors.email.message} />

                <TextField {...register("phone",
                    {
                        required: 'Не может быть пустым',
                        pattern: {
                            value: /^\+?[1-9]\d{1,14}$/i,
                            message: 'Навильный формат',
                        },
                    })}
                    id="phone"
                    label="Телефон"
                    error={errors.phone}
                    helperText={errors?.phone?.message && errors.phone.message} />

                <TextField {...register("instagram", { required: 'Не может быть пустым' })}
                    id="instagram"
                    label="instagram"
                    error={errors.instagram}
                    helperText={errors?.instagram?.message && errors.instagram.message} />

                <TextField {...register("fb", { required: 'Не может быть пустым' })}
                    id="fb"
                    label="Facebook"
                    error={errors.fb}
                    helperText={errors?.fb?.message && errors.fb.message} />

                <TextField {...register("vk", { required: 'Не может быть пустым' })}
                    id="vk"
                    label="Вконтакте"
                    error={errors.vk}
                    helperText={errors?.vk?.message && errors.vk.message} />

                <TextField {...register("status", { required: 'Не может быть пустым' })}
                    id="status"
                    label="Время работы"
                    error={errors.status}
                    helperText={errors?.status?.message && errors.status.message} />

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Город</InputLabel>
                    <Select
                        {...register("city_id", { required: 'Город не может быть пустым' })}
                        labelId="demo-controlled-open-select-label"
                        id="city_id"
                        open={openCityId}
                        onClose={handleCloseCityId}
                        onOpen={handleOpenCityId}
                        value={cityId}
                        onChange={handleChangeCityId}
                        error={errors.city_id}
                        helperText={errors?.city_id?.message && errors.city_id.message}
                    >
                        {city?.map((row) => (
                            <MenuItem value={row.id}>{row.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <input {...register("avatar")} type="file" name="avatar" />

                <br />
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
