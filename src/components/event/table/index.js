
import React, {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CityGetThunk} from "../../../redux/thunk/city";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {EventGetThunk} from "../../../redux/thunk/event";

const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
  }));

const EventTable = ({data}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    let history = useHistory()
    // const [data, setDate]=useState();

    // useEffect(() => {
    //     if (localStorage.accessToken) {
    //         dispatch(EventGetThunk(getDataCallback))
    //     } else {
    //         history.push('/')
    //     }
    // }, [])

    // const getDataCallback =(data)=> {
    //     console.log('data', data)
    // }

    return (
        <div>
            <p>Мероприятия</p>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Изображение</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Текст</TableCell>
                            <TableCell>Адрес</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row) => (

                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" >
                                    {row.avatar_public ?
                                        <a href={row.img}>
                                        <img className={classes.table_img} src={process.env.REACT_APP_BASE_URL + row.img}/></a>
                                        :
                                        <img className={classes.table_img}
                                        src="/img/template/no-image.png"/>
                                    }
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default EventTable;
