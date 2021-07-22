import React from 'react'

import {TextField} from "@material-ui/core";


const CustomTextField = ({ ...props }) => {

    return (
        <div>
            <TextField {...props}/>
        </div>
    )
}

export default CustomTextField;
