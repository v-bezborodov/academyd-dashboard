import React, {useState} from 'react'

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomModal = ({title, open, setOpen, setClose, setAction, children}) => {

    return (
        <div>
            {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>*/}
            {/*    Slide in alert dialog*/}
            {/*</Button>*/}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={setClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setAction} color="primary">
                        Сохранить
                    </Button>
                    <Button onClick={setClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CustomModal;
