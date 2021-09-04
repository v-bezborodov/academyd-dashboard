import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CustomDatePicker = ({date= Date.now()}) => {

    const [startDate, setStartDate] = useState(date);
    
    return (
        <DatePicker selected={startDate} onChange={(dateEvent) => setStartDate(dateEvent)} />
    )
}

export default CustomDatePicker;
