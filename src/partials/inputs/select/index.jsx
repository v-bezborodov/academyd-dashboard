import React from 'react'
import {Select} from "@material-ui/core";

const CustomSelect = ({ ...props }) => {

    return (
        <>
            <Select {...props}/>
        </>
    )
}

export default CustomSelect;
