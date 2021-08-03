import {Button, MenuItem, Select, TextField} from '@material-ui/core';
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import Menu from "../../components/menu";
import {CityGetThunk} from '../../redux/thunk/city';
import {CoffeeGetThunk, CoffeePostThunk} from '../../redux/thunk/coffee';
import InputLabel from '@material-ui/core/InputLabel';
import {FormControl} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from "react-hook-form";
import {BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData} from "../CustomerPage/index.styled";
import CoffeePageTable from "../../components/coffee-shop/table";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
}));

const CoffeePage = () => {
    const classes = useStyles();
    let history = useHistory()
    const dispatch = useDispatch()
    const coffee = useSelector(store => store.coffeeShops.coffeeShops)
    const [openCity_id, setOpenCity_id] = React.useState(false);
    const [city_id, setCity_id] = React.useState('');
    const city = useSelector(store => store.city.city)

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const handleClose = () => {
        setOpenCity_id(false);
    };

    const handleOpen = () => {
        setOpenCity_id(true);
    };

    const handleChangeCity_id = (event) => {
        setCity_id(event.target.value);
    };

    useEffect(() => {
        dispatch(CoffeeGetThunk(true))
        dispatch(CityGetThunk())
    }, [])


    const onSubmit = async (data) => {
        if (!data) return

        const formData = new FormData();

        formData.append('avatar', data.avatar[0]);
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('instagram', data.instagram);
        formData.append('fb', data.fb);
        formData.append('vk', data.vk);
        formData.append('working_time', data.working_time);
        formData.append('city_id', data.city_id);

        await dispatch(CoffeePostThunk(formData));
        await reset()
        await dispatch(CoffeeGetThunk())
    }

    return (
        <div className="container">
            <Menu/>
            <div>
                <div>
                    <BlockGridItem33>
                        <p>Добавить новую кофейню</p>
                        <BlockGridItemData>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField {...register("name", {required: 'Не может быть пустым'})}
                                           id="name"
                                           label="Название"
                                           error={errors.name}
                                           helperText={errors?.name?.message && errors.name.message}/>

                                <TextField {...register("address", {required: 'Не может быть пустым'})}
                                           id="address"
                                           label="Адрес"
                                           error={errors.address}
                                           helperText={errors?.address?.message && errors.address.message}/>

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

                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Город</InputLabel>
                                    <Select
                                        {...register("city_id", {required: 'Город не может быть пустым'})}
                                        labelId="demo-controlled-open-select-label"
                                        id="city_id"
                                        open={openCity_id}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={city_id}
                                        onChange={handleChangeCity_id}
                                        error={errors.city_id}
                                        helperText={errors?.city_id?.message && errors.city_id.message}
                                    >
                                        {city?.map((row) => (
                                            <MenuItem value={row.id}>{row.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <input {...register("avatar")} type="file" name="avatar"/>

                                <br/>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Создать новую кофейню
                                </Button>
                            </form>
                        </BlockGridItemData>
                    </BlockGridItem33>
                </div>
                <CoffeePageTable {...{coffee}} />
            </div>
        </div>
    )
}

export default CoffeePage;
