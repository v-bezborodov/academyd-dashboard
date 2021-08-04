import React, {useEffect, useState} from 'react'
import EventForm from "../eventStore/form";
import EventTable from "./table";
import {EventGetThunk} from "../../../redux/thunk/event";
import {useDispatch} from "react-redux";

const EventMain = () => {
    const dispatch = useDispatch()

    const [data, setData] = useState({});

    useEffect(() => {
        getDataEvents()
    }, [])

    const getDataEvents = () => {
        dispatch(EventGetThunk(handleDataCallback))
    }

    const handleDataCallback = (data) => {
        if (!data) return
        setData(data);
    }

    const triggerUpdate = () => {
        getDataEvents()
    }

    return (
        <div>
            <EventForm {...{triggerUpdate}}/>
            <EventTable {...{data, triggerUpdate}}/>
        </div>
    )
}

export default EventMain;
