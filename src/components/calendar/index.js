import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {Calendar, momentLocalizer,  Views} from 'react-big-calendar'

import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { coffeeGetUserWorkingTimeThunk} from "../../redux/thunk/coffee";
import {Button} from "@material-ui/core";
import CalendarModal from "./modal";



const localizer = momentLocalizer(moment)

const CalendarMain = () => {
    let {id} = useParams();

    const [positionsList, setPositionList] = useState(null);
    const [open, setOpenModal] = useState(false);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [myEventsList, setEventsList] = useState([
        {
            'title': 'All Day Event very long title',
            'allDay': true,
            'start': new Date(2021, 3, 0),
            'end': new Date(2021, 3, 1)
        },
        {
            'title': 'Long Event',
            'start': new Date(2021, 3, 7),
            'end': new Date(2015, 3, 10)
        },

        {
            'title': 'DTS STARTS',
            'start': new Date(2016, 2, 13, 0, 0, 0),
            'end': new Date(2016, 2, 20, 0, 0, 0)
        },

        {
            'title': 'DTS ENDS',
            'start': new Date(2016, 10, 6, 0, 0, 0),
            'end': new Date(2016, 10, 13, 0, 0, 0)
        },

        {
            'title': 'Some Event',
            'start': new Date(2015, 3, 9, 0, 0, 0),
            'end': new Date(2015, 3, 9, 0, 0, 0)
        },
        {
            'title': 'Conference',
            'start': new Date(2015, 3, 11),
            'end': new Date(2015, 3, 13),
            desc: 'Big conference for important people'
        },
        {
            'title': 'Meeting',
            'start': new Date(2015, 3, 12, 10, 30, 0, 0),
            'end': new Date(2015, 3, 12, 12, 30, 0, 0),
            desc: 'Pre-meeting meeting, to prepare for the meeting'
        },
        {
            'title': 'Lunch',
            'start': new Date(2015, 3, 12, 12, 0, 0, 0),
            'end': new Date(2015, 3, 12, 13, 0, 0, 0),
            desc: 'Power lunch'
        },
        {
            'title': 'Meeting',
            'start': new Date(2015, 3, 12, 14, 0, 0, 0),
            'end': new Date(2015, 3, 12, 15, 0, 0, 0)
        },
        {
            'title': 'Happy Hour',
            'start': new Date(2015, 3, 12, 17, 0, 0, 0),
            'end': new Date(2015, 3, 12, 17, 30, 0, 0),
            desc: 'Most important meal of the day'
        },
        {
            'title': 'Dinner',
            'start': new Date(2015, 3, 12, 20, 0, 0, 0),
            'end': new Date(2015, 3, 12, 21, 0, 0, 0)
        },
        {
            'title': 'Birthday Party',
            'start': new Date(2015, 3, 13, 7, 0, 0),
            'end': new Date(2015, 3, 13, 10, 30, 0)
        },
        {
            'title': 'Birthday Party 2',
            'start': new Date(2015, 3, 13, 7, 0, 0),
            'end': new Date(2015, 3, 13, 10, 30, 0)
        },
        {
            'title': 'Birthday Party 3',
            'start': new Date(2015, 3, 13, 7, 0, 0),
            'end': new Date(2015, 3, 13, 10, 30, 0)
        },
        {
            'title': 'Late Night Event',
            'start': new Date(2015, 3, 17, 19, 30, 0),
            'end': new Date(2015, 3, 18, 2, 0, 0)
        },
        {
            'title': 'Multi-day Event',
            'start': new Date(2015, 3, 20, 19, 30, 0),
            'end': new Date(2015, 3, 22, 2, 0, 0)
        }
    ]);

    useEffect(() => {
        if (id) coffeeGetUserWorkingTimeThunk(id, handleDataCallback)
    }, []);

    const handleDataCallback = (data) => {
        if (!data) return;

        let positions = data.map((item) => {
            if (item.user.length>0) {
               return item.user.map(itemUser=>{
                    return itemUser.name;
                })
            };
        })

        setPositionList(positions)
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
        setOpen();
        if (event.start) setStart(event.start);
        if (event.end) setEnd(event.end);
    };


    return (
        <div>
            Calendar for coffee shop {id}
            <div>

                <Button
                    variant="contained"
                    color="primary"
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
