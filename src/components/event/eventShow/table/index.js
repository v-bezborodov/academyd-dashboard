import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {BlockGridItem100} from "../form/index.styled";
import {Link} from "react-router-dom";
import {EventDeleteThunk} from "../../../../redux/thunk/event";



const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
    table_img: {
        width: '50px',
        height: 'auto'
    },
}));

const EventTable = ({data, triggerUpdate}) => {
    const classes = useStyles();
    const [events, setEvents] = useState(data)

    useEffect(() => setEvents(data), [data])

    const deleteEvent = (event, id, index) => {
        if (event) event.preventDefault();
        if (!id) return;
        deleteRow(index);
        EventDeleteThunk(id, triggerUpdate);
    }

    const deleteRow = (index) => {
        if (index<0) return;
        var dataBag = [...events];
        dataBag.splice(index, 1);
        setEvents(dataBag);
    }

    return (
        <BlockGridItem100>
            <p>Мероприятия</p>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Изображение</TableCell>
                            <TableCell align="center">Название</TableCell>
                            <TableCell align="center">Текст</TableCell>
                            <TableCell align="center">Адрес</TableCell>
                            <TableCell align="center">Кол-во участников</TableCell>
                            <TableCell align="center">Активен</TableCell>
                            <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.length && events.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.img_public ?
                                        <a href={row.img_public}>
                                            <img className={classes.table_img}
                                                 src={process.env.REACT_APP_BASE_URL + row.img_public}/></a>
                                        :
                                        <img className={classes.table_img}
                                             src="/img/template/no-image.png"/>
                                    }
                                </TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="center">{row.body}</TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center">{row.max_attendee}</TableCell>
                                <TableCell align="center">{row.is_published?"Да":"Нет"}</TableCell>
                                <TableCell align="center">
                                    <Link to={"/event/" + row.id}>Изменить</Link>
                                    <br/>
                                    <a href={ row.id} onClick={(e) => deleteEvent(e, row.id, index)}>Удалить</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </BlockGridItem100>
    )
}

export default EventTable;
