
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
  }));

const CoffeePageTable = ({coffee}) => {
    const classes = useStyles();

    return (
        <div >
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Изображение</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Адрес</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Телефон</TableCell>
                            <TableCell align="right">Инстаграм</TableCell>
                            <TableCell align="right">Вконтакте</TableCell>
                            <TableCell align="right">Фейсбук</TableCell>
                            <TableCell align="right">Рабочие часы</TableCell>
                            <TableCell align="right">Город</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coffee && coffee.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">{row.avatar}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.instagram}</TableCell>
                                <TableCell align="right">{row.vk}</TableCell>
                                <TableCell align="right">{row.fb}</TableCell>
                                <TableCell align="right">{row.working_time}</TableCell>
                                <TableCell align="right">{row.city_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CoffeePageTable;
