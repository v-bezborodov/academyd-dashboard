import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { CityGetThunk } from '../../redux/thunk/city';
import { CoffeeGetThunk, CoffeePostThunk } from '../../redux/thunk/coffee';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        if (localStorage.accessToken) {
            dispatch(CoffeeGetThunk())
            dispatch(CityGetThunk())
        } else {
            history.push('/')
        }
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault()
        const { name, address, email, phone,
            // avatar, 
            instagram, fb, vk, working_time } = event.target.elements
        dispatch(CoffeePostThunk(name.value, address.value, email.value, phone.value,
            // avatar.value, 
            instagram.value, fb.value, vk.value, working_time.value, city_id));
            
        dispatch(CoffeeGetThunk())
    }

    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField onChange={console.log} id="name" label="Название" />
                        <TextField onChange={console.log} id="address" label="Адрес" />
                        <TextField onChange={console.log} id="email" label="E-mail" />
                        <TextField onChange={console.log} id="phone" label="Телефон" />
                        {/* <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar"
                            multiple
                            type="file"
                        />
                        <label htmlFor="avatar">
                            <Button variant="raised" component="span">
                                Upload
                            </Button>
                        </label> */}
                        <TextField onChange={console.log} id="instagram" label="instagram" />
                        <TextField onChange={console.log} id="fb" label="Facebook" />
                        <TextField onChange={console.log} id="vk" label="Вконтакте" />
                        <TextField onChange={console.log} id="working_time" label="Время работы" />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Город</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="city_id"
                                open={openCity_id}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={city_id}
                                onChange={handleChangeCity_id}
                            >
                                {city?.map((row) => (
                                    <MenuItem value={row.id}>{row.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <button type="submit" >Login</button>
                    </form>
                </div>
                <p>Кофейни</p>
                {coffee?.map((row) => (
                    <div>
                        {row.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoffeePage;
