import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";


const Home = () => {
    let history = useHistory()


    return (
        <div className="container">
            <Menu/>
            <div>
                <p>Главная</p>
            </div>
        </div>
)
}

export default Home;
