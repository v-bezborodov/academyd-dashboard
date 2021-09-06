import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CustomDatePicker = ({date = Date.now(), callback}) => {

    const [startDate, setStartDate] = useState(date);

    const handleDate = (date) => {
        setStartDate(date)
        callback(date)
    };

    return (
        <DatePicker showTimeSelect
                    selected={startDate}
                    onChange={(dateEvent) => handleDate(dateEvent)}
                    dateFormat="MMMM d, yyyy h:mm aa"/>
    )
}

export default CustomDatePicker;
