import React, {useEffect, useState} from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
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
    const { register, handleSubmit, formState: { errors }, reset, control , setValue} = useForm();
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
        dispatch(CustomerShowThunk(id, handleDispatchUser))
        dispatch(CityGetThunk())
    }, [])

    useEffect(() => {
        if (errors) console.log ('errors',errors)
    }, [errors])


    const handleDispatchUser = (data) => {
        if (!data) return
        const { avatar, phone, name, email, fb, instagram, vk, city_id, status } = data;
        setValue('name', name)
        setValue('email', email)
        setValue('phone', phone)
        setValue('instagram', instagram)
        setValue('fb', fb)
        setValue('vk', vk)
        setValue('city_id', city_id)
        setValue('status', status)
        // setValue('avatar', avatar)

        // setName(name);
        // setEmail(email);
        // setPhone(phone);
        // setInstagram(instagram);
        // setFacebook(fb);
        // setVkontakte(vk);
        // setCityId(city_id);
        // setStatus(status);
        // if(avatar) setAvatar(avatar);
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

    const handleChangeName = (event) => {
        setName(event.target.value)
        // setValue('name', name)
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    };

    const handleChangePhone = (event) => {
        setPhone(event.target.value)
    };

    const handleChangeInstagram = (event) => {
        setInstagram(event.target.value)
    };

    const handleChangeStatus= (event) => {
        setStatus(event.target.value)
    };

    const handleChangeVk= (event) => {
        setVkontakte(event.target.value)
    };

    const handleChangeFacebook = (event) => {
        setFacebook(event.target.value)
    };


    const onSubmit = async (data) => {
        console.log('data', data)
        if (!data) return
        const formData = new FormData();
            // formData.append('name', data.name);
            // formData.append('email', data.email);
            // formData.append('phone', data.phone);
            // formData.append('avatar', data.avatar[0]);
            // formData.append('instagram', data.instagram);
            // formData.append('fb', data.fb);
            // formData.append('vk', data.vk);
            // formData.append('status', data.status);
            // formData.append('city_id', cityId);
            //
            // dispatch(CustomerPutThunk(formData, id));
            // reset();
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
                    helperText={errors?.email?.message && errors.email.message} />

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
                    helperText={errors?.phone?.message && errors.phone.message} />

                <TextField inputProps={register("instagram", { required: 'Не может быть пустым' })}
                    autoFocus
                    id="instagram"
                    placeholder="instagram"
                    error={!!errors.instagram}
                    helperText={errors?.instagram?.message && errors.instagram.message} />

                <TextField inputProps={register("fb", { required: 'Не может быть пустым' })}
                    id="fb"
                    placeholder="Facebook"
                    error={!!errors.fb}
                    helperText={errors?.fb?.message && errors.fb.message} />

                <TextField inputProps={register("vk", { required: 'Не может быть пустым' })}
                    autoFocus
                    id="vk"
                    placeholder="Вконтакте"
                    error={!!errors.vk}
                    helperText={errors?.vk?.message && errors.vk.message} />

                <TextField inputProps={register("status", { required: 'Не может быть пустым' })}
                    autoFocus
                    type="text"
                    id="status"
                    placeholder="Статус"
                    error={!!errors.status}
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
                        // helperText={errors?.city_id?.message && errors.city_id.message} //TODO Select doesn't have helperText property
                    >
                        {city?.map((row) => (
                            <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
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
            </FormControl>
            </form>
        </div>
    )
}

export default CustomerEdit;
