import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { TestsGetThunk } from '../../redux/thunk/tests';


const TestPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const tests = useSelector(store => store.tests.tests)


    useEffect(() => {
        if (localStorage.accessToken) {
            dispatch(TestsGetThunk())
        } else {
            history.push('/')
        }
    }, [])

    return (
        <div className="container">
            <Menu />
            <div>
                <p>Все тесты</p>
                {tests?.map((row) => (
                    <div>
                        <img src={row.img_public} />
                        {row.title}
                        {row.body}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TestPage;