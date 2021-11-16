import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {Calendar, momentLocalizer,  Views} from 'react-big-calendar'

import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { coffeeGetUserWorkingTimeThunk} from "../../redux/thunk/coffee";
import {Button} from "@material-ui/core";
import CalendarModal from "./modal";
import {calendarShowThunk, CalendarShowThunk} from "../../redux/thunk/calendar";



const localizer = momentLocalizer(moment);

let formats = {
    timeGutterFormat: 'HH:mm',
    agendaDateFormat: 'Y-m-d H:i:s',
    agendaTimeFormat: 'Y-m-d H:i:s',
}

const CalendarMain = () => {
    let {id} = useParams();

    const [positionsList, setPositionList] = useState(null);
    const [open, setOpenModal] = useState(false);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [myEventsList, setEventsList] = useState(null);

    useEffect(() => {
        if (id) calendarShowThunk(id, handleDataCallback)
    }, []);

    const handleDataCallback = (data) => {
        if (!data) return;

        var positions = data.map((item)=> {
                var obj = {};
                obj['title'] = 'No name'
                if (item.user.name) obj['title'] = item.user.name;
                if (item.user.name) obj['desc'] = item.user.name;
                obj['start'] = new Date(item.working_date_from);
                obj['end'] = new Date(item.working_date_to);
                return obj;
            }

        );

        setEventsList(positions);
    }

    const handleClickOpen = () => {
        setOpen();
    };

    const setOpen = () => {
        setOpenModal(true)
    };

    const setClose = () => {
        setOpenModal(false)
    };

    const handleSelectSlot = (event) => {
        if (event.start) setStart( new Date(event.start)); //due of undefined reason we need convert in again
        if (event.end) setEnd(new Date(event.end)); //due of undefined reason we need convert in again
        setOpen();
    };


    return (
        <div>
            Calendar for coffee shop {id}
            <div>

                <Button
                    variant="contained"
                    // color="primary"
                    type="submit"
                    onClick={handleClickOpen}
                >
                    Добавить время +
                </Button>
            </div>

            <div>
                Доступные позиции в этой кофейне
                <ul>
                    {positionsList && positionsList.map((positions, index) => (
                        <li key={index}>{positions}</li>
                    ))}
                </ul>
            </div>

            {myEventsList && <Calendar
                localizer={localizer}
                formats={formats}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                selectable="true"
                defaultView={Views.WEEK}
                style={{height: 500}}
                onSelectSlot={handleSelectSlot}
            />}

            {open && <CalendarModal {...{open, setOpen, setClose, start, end}}/>}
        </div>
    )
}

export default CalendarMain;
