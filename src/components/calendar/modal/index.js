import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomModal from "../../../partials/modal";
import CalendarForm from "../form";


const CalendarModal = ({open, setOpen, setClose, start, end}) => {

    return (
        <CustomModal {...{open, setOpen, setClose}}
                     title={"Добавить в календарь"}>
            <CalendarForm {...{start, end, setClose}}/>
        </CustomModal>
    )
}

export default CalendarModal;
