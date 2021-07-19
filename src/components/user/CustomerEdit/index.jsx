import React, {useEffect, useState} from 'react'
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
    table_img: {
        width: '50px',
        height:'auto'
    },
}));

const CustomerEdit = ({ id }) => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()
    const city = useSelector(store => store.city.city)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [vk, setVkontakte] = useState('');
    const [status, setStatus] = useState('');
    const [avatar, setAvatar] = useState('/img/template/no-image.png');

    const [openCityId, setOpenCityId] = useState(false);
    const [cityId, setCityId] = useState();

    useEffect(() => {
        if (id) 
        dispatch(CustomerShowThunk(id, (data)=>handleDispatchUser(data)))
        dispatch(CityGetThunk())
    }, [])


    const handleDispatchUser = (data) => {
        if (!data) return
        const { avatar, phone, name, email, fb, instagram, vk, city_id, status } = data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setInstagram(instagram);
        setFacebook(fb);
        setVkontakte(vk);
        setCityId(city_id);
        setStatus(status);
        if(avatar) setAvatar(avatar);
    };

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
                    value={name}
                    label="Название"
                    error={errors.name}
                    onChange={event=>setName(event.target.value)}
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
                    value={email}
                    label="E-mail"
                    type="email"
                    error={errors.email}
                    onChange={event=>setEmail(event.target.value)}
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
                    value={phone}
                    label="Телефон"
                    error={errors.phone}
                    onChange={event=>setPhone(event.target.value)}
                    helperText={errors?.phone?.message && errors.phone.message} />

                <TextField {...register("instagram", { required: 'Не может быть пустым' })}
                    id="instagram"
                    value={instagram}
                    label="instagram"
                    error={errors.instagram}
                    onChange={event=>setInstagram(event.target.value)}
                    helperText={errors?.instagram?.message && errors.instagram.message} />

                <TextField {...register("fb", { required: 'Не может быть пустым' })}
                    id="fb"
                    value={facebook}
                    label="Facebook"
                    error={errors.fb}
                    onChange={event=>setFacebook(event.target.value)}
                    helperText={errors?.fb?.message && errors.fb.message} />

                <TextField {...register("vk", { required: 'Не может быть пустым' })}
                    id="vk"
                    value={vk}
                    label="Вконтакте"
                    error={errors.vk}
                    onChange={event=>setVkontakte(event.target.value)}
                    helperText={errors?.vk?.message && errors.vk.message} />

                <TextField {...register("status", { required: 'Не может быть пустым' })}
                    id="status"
                    value={status}
                    label="Время работы"
                    error={errors.status}
                    helperText={errors?.status?.message && errors.status.message} />

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Город</InputLabel>
                    {cityId}
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
                <img src={avatar} className={classes.table_img}/>

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
