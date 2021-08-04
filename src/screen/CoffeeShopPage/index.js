import React from 'react'

import Menu from "../../components/menu";
import CoffeeShopMain from "../../components/coffee-shop/coffeeShopShow";


const CoffeePage = () => {

    return (
        <div className="container">
            <Menu/>
            <CoffeeShopMain/>
        </div>
    )
}

export default CoffeePage;
