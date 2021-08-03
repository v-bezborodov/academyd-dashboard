import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";


const ChekTestPage = () => {
    let history = useHistory()


    return (
        <div className="container">
            <Menu/>
            <div>
                <p>Проверка тестов</p>
            </div>
        </div>
    )
}

export default ChekTestPage;
