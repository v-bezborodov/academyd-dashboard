import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Menu from "../../components/menu";
import { CityGetThunk, CityPostThunk } from '../../redux/thunk/city';
import { BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData } from "../CustomerPage/index.styled";
import CityPageTable from './table';


const CityPage = () => {
    const dispatch = useDispatch()
    const city = useSelector(store => store.city.city)
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();

    useEffect(() => {
        dispatch(CityGetThunk())
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
                    <p>Добавить город</p>
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
                            // color="primary"
                            type="submit"
                        >
                            Добавить город
                        </Button>
                    </form>
                    </BlockGridItemData>
                    </BlockGridItem33>
                </div>
                <CityPageTable data={city}/>
            </div>
        </div>
    )
}

export default CityPage;
