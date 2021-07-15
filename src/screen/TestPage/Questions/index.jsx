import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../../components/menu";
import { QuestionsGetThunk } from '../../../redux/thunk/questions';
import { TestsGetThunk } from '../../../redux/thunk/tests';


const QuestionsPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const questions = useSelector(store => store.questions.questions)


    useEffect(() => {
        if (localStorage.accessToken) {
            dispatch(QuestionsGetThunk())
        } else {
            history.push('/')
        }
    }, [])

    return (
        <div className="container">
            <Menu />
            <div>
            <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/all-questions/new')}
                >
                    Создать вопрос
                </Button>
                <p>Все вопросы</p>
                {questions?.map((row) => (
                    <div>
                        {row.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionsPage;
