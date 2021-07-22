import React, {useEffect, useState} from 'react'
import EventForm from "./form";
import EventTable from "./table";
import {EventGetThunk} from "../../redux/thunk/event";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const EventMain = () => {
    const dispatch = useDispatch()
    let history = useHistory()

    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.accessToken) {
            getDataEvents()
        } else {
            history.push('/')
        }
    }, [])

    const getDataEvents = (data) => {
        dispatch(EventGetThunk(getDataCallback))
    }

    const getDataCallback = (data) => {
        if (!data) return
        console.log('get events', data)
        setData(data);
    }

    const triggerUpdate = () => {
        getDataEvents()
    }

    return (
        <>
            <div>
                <EventForm {...{triggerUpdate}}/>
                <EventTable {...{data}}/>
            </div>
        </>
    )
}

export default EventMain;
