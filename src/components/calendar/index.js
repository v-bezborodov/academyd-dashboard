import React from 'react'
import {useParams} from "react-router-dom";


const CalendarMain = () => {
    let {id} = useParams();


    return (
        <div>
            Calendar {id}

        </div>
    )
}

export default CalendarMain;
