import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { CityGetThunk, CityPostThunk } from '../../redux/thunk/city';
import CityPageTable from '../../components/event/table';
import CityForm from "../../components/event/form";


const EventPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const city = useSelector(store => store.city.city)
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();



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
                <CityForm/>
                <CityPageTable/>
            </div>
        </div>
    )
}

export default EventPage;
