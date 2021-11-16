import React, {useEffect, useState} from 'react'
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {CustomerPutThunk, CustomerShowThunk} from "../../../../redux/thunk/customer";
import {CityGetThunk} from '../../../../redux/thunk/city';
import CustomSelect from "../../../../partials/inputs/select";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    img: {
        width: '50px',
        height: 'auto'
    },
}));

const CustomerEdit = ({id}) => {
    const classes = useStyles();
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const dispatch = useDispatch()
    const city = useSelector(store => store.city.city)
    const [avatar, setAvatar] = useState('/img/template/no-image.png');
    const [cityId, setCityId] = useState();

    useEffect(() => {
        if (id) dispatch(CustomerShowThunk(id, dispatchUserCallback))
        dispatch(CityGetThunk())
    }, [])

    const dispatchUserCallback = (data) => {
        if (!data) return
        const {avatar_public, phone, name, email, fb, instagram, vk, city_id, status} = data;
        setValue('name', name)
        setValue('email', email)
        setValue('phone', phone)
        setValue('instagram', instagram)
        setValue('fb', fb)
        setValue('vk', vk)
        setValue('city_id', city_id)
        setValue('status', status)
        setCityId(city_id);
        if (avatar) setAvatar(avatar_public);
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
        if (data.avatar[0]) formData.append('avatar', data.avatar[0]);
        formData.append('instagram', data.instagram);
        formData.append('fb', data.fb);
        formData.append('vk', data.vk);
        formData.append('status', data.status);
        formData.append('city_id', data.city_id);

        dispatch(CustomerPutThunk(formData, id));
    }

    return (
        <div>
            Юзер {id}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextField name="name"
                               placeholder={"Name"}
                               error={!!errors.name}
                               helperText={errors?.name?.message && errors.name.message}
                               autoFocus
                               inputProps={
                                   register('name', {required: 'Не может быть пустым'})
                               }
                    />
                </FormControl>

                <FormControl>
                    <TextField inputProps={register("email",
                        {
                            required: 'Не может быть пустым',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Неправильный формат email',
                            },
                        })}
                               autoFocus
                               name="email"
                               placeholder="E-mail"
                               type="email"
                               error={!!errors.email}
                               helperText={errors?.email?.message && errors.email.message}/>
                </FormControl>

                <FormControl>
                    <TextField inputProps={register("phone",
                        {
                            required: 'Не может быть пустым',
                            pattern: {
                                value: /^\+?[1-9]\d{1,14}$/i,
                                message: 'Навильный формат',
                            },
                        })}
                               autoFocus
                               id="phone"
                               placeholder="Телефон"
                               error={!!errors.phone}
                               helperText={errors?.phone?.message && errors.phone.message}/>
                </FormControl>

                <FormControl>
                    <TextField inputProps={register("instagram", {required: 'Не может быть пустым'})}
                               autoFocus
                               id="instagram"
                               placeholder="Instagram"
                               error={!!errors.instagram}
                               helperText={errors?.instagram?.message && errors.instagram.message}/>
                </FormControl>

                <FormControl>
                    <TextField inputProps={register("fb", {required: 'Не может быть пустым'})}
                               id="fb"
                               placeholder="Facebook"
                               error={!!errors.fb}
                               helperText={errors?.fb?.message && errors.fb.message}/>
                </FormControl>

                <FormControl>
                    <TextField inputProps={register("vk", {required: 'Не может быть пустым'})}
                               autoFocus
                               id="vk"
                               placeholder="Вконтакте"
                               error={!!errors.vk}
                               helperText={errors?.vk?.message && errors.vk.message}/>
                </FormControl>

                <FormControl>
                    <TextField inputProps={register("status", {required: 'Не может быть пустым'})}
                               autoFocus
                               type="text"
                               id="status"
                               placeholder="Статус"
                               error={!!errors.status}
                               helperText={errors?.status?.message && errors.status.message}/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Город</InputLabel>
                    <CustomSelect
                        inputProps={register("city_id", {required: 'Город не может быть пустым'})}
                        labelId="demo-controlled-open-select-label"
                        name="city_id"
                        id="city_id"
                        value={cityId ?? ''}
                        onChange={handleChangeCityId}
                        error={!!errors.city_id}
                    >
                        {city?.map((row) => (
                            <MenuItem key={row.id} selected={row.id === '1'} value={row.id}>{row.name}</MenuItem>
                        ))}
                    </CustomSelect>
                </FormControl>

                <FormControl>
                    <input
                        {...register("avatar")}
                        accept="image/*"
                        style={{display: 'none'}}
                        id="avatar"
                        type="file"
                    />
                    <label htmlFor="avatar">
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>

                    {avatar ?
                        <a href={avatar}>
                            <img className={classes.img} src={process.env.REACT_APP_BASE_URL + avatar}/></a>
                        :
                        <img className={classes.img} src="/img/template/no-image.png"/>
                    }
                </FormControl>
                <br/>
                <FormControl>
                    <Button variant="contained"
                            // color="primary"
                            type="submit">
                        Сохранить
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}

export default CustomerEdit;
