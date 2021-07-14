import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { CoffeeGetThunk } from '../../redux/thunk/coffee';


const CoffeePage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const coffee = useSelector(store => store.coffeeShops.coffeeShops)

    useEffect(() => {
        if(localStorage.accessToken){
            dispatch(CoffeeGetThunk())
        }else {
            history.push('/')
        }
    }, [])

    return (
        <div className="container">
            <Menu/>
            <div>
                <p>Кофейни</p>
                {coffee?.map((row) => (
                    <div>
                        {row.name}
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default CoffeePage;
