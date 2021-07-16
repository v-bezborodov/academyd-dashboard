import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { BlogGetThunk } from '../../redux/thunk/blog';
import { CityGetThunk, CityPostThunk } from '../../redux/thunk/city';
import { BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData } from "../CustomerPage/index.styled";
import CityPageTable from './table';


const CityPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const city = useSelector(store => store.city.city)
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (localStorage.accessToken) {
            dispatch(CityGetThunk())
        } else {
            history.push('/')
        }
    }, [])

    const onSubmit = async (data) => {
        if (!data) return
        await dispatch(CityPostThunk(data.name));
        await reset();
        await dispatch(CityGetThunk())
    }

    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                <BlockGridItem33>
                    <p>Добавить сотрудника</p>
                    <BlockGridItemData>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField {...register("name", { required: 'Не может быть пустым' })}
                            id="name"
                            label="Название города"
                            error={errors.name}
                            helperText={errors?.name?.message && errors.name.message}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Добавить город
                        </Button>
                    </form>
                    </BlockGridItemData>
                    </BlockGridItem33>
                </div>
                <p>Города</p>
                <CityPageTable data={city}/>
            </div>
        </div>
    )
}

export default CityPage;
