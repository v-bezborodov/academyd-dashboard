import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { TestsGetThunk } from '../../redux/thunk/tests';
import TestPageTable from './table';


const TestPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const tests = useSelector(store => store.tests.tests)


    useEffect(() => {
        dispatch(TestsGetThunk())
    }, [])

    return (
        <div className="container">
            <Menu />
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/all-questions')}
                >
                    Вопросы к тесам
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/all-test/new')}
                >
                    Создать тест
                </Button>
                <p>Все тесты</p>
                <TestPageTable data={tests}/>
            </div>
        </div>
    )
}

export default TestPage;
