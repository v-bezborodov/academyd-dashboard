import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { BlogGetThunk } from '../../redux/thunk/blog';
import { CityGetThunk } from '../../redux/thunk/city';


const CityPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const city = useSelector(store => store.city.city)

    useEffect(() => {
        if(localStorage.accessToken){
            dispatch(CityGetThunk())
        }else {
            history.push('/')
        }
    }, [])

    return (
        <div className="container">
            <Menu/>
            <div>
                <p>Города</p>
                {city?.map((row) => (
                    <div>
                        {row.name}
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default CityPage;
