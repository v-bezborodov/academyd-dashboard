import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    table_img: {
        width: '50px',
        height:'auto'
    },
});

function createData(name, calories, fat) {
    return { name, calories, fat};
}

export default function CustomerTable({rows}) {

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Аватар</TableCell>
                        <TableCell>Телефон</TableCell>
                        <TableCell align="right">Имя</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right">instagram</TableCell>
                        <TableCell align="right">fb</TableCell>
                        <TableCell align="right">vk</TableCell>
                        <TableCell align="right">status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows ? 
                    rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" >
                                {row.avatar_public ?
                                <a href={row.avatar_public}>
                                    <img className={classes.table_img} src={process.env.REACT_APP_BASE_URL + row.avatar_public}/></a>
                                :
                                <img className={classes.table_img}
                                     src="/img/template/no-image.png"/>
                                }
                            </TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.instagram}</TableCell>
                            <TableCell align="right">{row.fb}</TableCell>
                            <TableCell align="right">{row.vk}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">
                                <Link to={"/all-customer/"+row.id}>Изменить</Link>
                            </TableCell>
                        </TableRow>
                    ))
                    :
                    <></>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
