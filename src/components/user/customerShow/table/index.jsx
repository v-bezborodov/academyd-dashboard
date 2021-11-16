import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import {BlockGridItem100} from "../../../../screen/CustomerPage/index.styled";
import {CustomerDeleteThunk} from "../../../../redux/thunk/customer";

const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
    table_img: {
        width: '50px',
        height: 'auto'
    },
}));



export default function CustomerTable({data, triggerUpdate}) {

    const classes = useStyles();
    const [users, setUsers] = useState(data)

    useEffect(() => setUsers(data), [data])

    function deleteUser(event, id, index) {
        if (event) event.preventDefault();
        if (!id) return;
        deleteRow(index);
        CustomerDeleteThunk(id, triggerUpdate);
    }

    const deleteRow = (index) => {
        if (index < 0) return;
        var dataBag = [...users];
        dataBag.splice(index, 1);
        setUsers(dataBag);
    }


    return (
        <BlockGridItem100>
            <p>Пользователи</p>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Аватар</TableCell>
                            <TableCell>Телефон</TableCell>
                            <TableCell align="right">Имя</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Соцсети</TableCell>
                            <TableCell align="right">status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    {users && <TableBody>
                        {users.length > 0 &&
                        users.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.avatar_public ?
                                        <a href={row.avatar_public}>
                                            <img className={classes.table_img}
                                                 src={process.env.REACT_APP_BASE_URL + row.avatar_public}/></a>
                                        :
                                        <img className={classes.table_img}
                                             src="/img/template/no-image.png"/>
                                    }
                                </TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">
                                    {row.instagram && <><a href={row.instagram}>Instagram</a><br/></>}
                                    {row.fb && <><a href={row.fb}>Facebook<br/></a></>}
                                    {row.vk && <><a href={row.vk}>Vkontakte</a></>}
                                </TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">
                                    <Link to={"/all-customer/" + row.id}>Изменить</Link>
                                    <br/>
                                    <a href={row.id} onClick={(e) => deleteUser(e, row.id, index)}>Удалить</a>
                                </TableCell>

                            </TableRow>
                        ))
                        }
                    </TableBody>
                    }
                </Table>
            </TableContainer>
        </BlockGridItem100>
    );
}
