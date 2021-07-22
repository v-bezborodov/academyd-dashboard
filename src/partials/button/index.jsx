import React from 'react'

import { Button } from "@material-ui/core";

const CustomButton= ({ ...props }) => {

    return (
        <>
            <Button {...props}/>
        </>
    )
}

export default CustomButton;
