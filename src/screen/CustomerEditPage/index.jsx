import React from 'react'
import {useParams} from "react-router-dom";
import CustomerEdit from "../../components/user/CustomerEdit/form";
import Menu from "../../components/menu";
import {BlockGridItem33} from "../CustomerPage/index.styled";
import CustomerEditCoffee from '../../components/user/CustomerEditCoffee/form';

const CustomerEditPage = () => {

    return (
        <div className="container">
            <Menu/>
            <div>
                <BlockGridItem33>
                    <CustomerEdit/>
                    <CustomerEditCoffee/>
                </BlockGridItem33>
            </div>
        </div>
    )
}

export default CustomerEditPage;
