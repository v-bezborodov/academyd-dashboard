import React from 'react'
import CustomerEdit from "../../components/user/customerEdit/form";
import Menu from "../../components/menu";
import {BlockGridItem33} from "../CustomerPage/index.styled";
import CustomerEditCoffee from '../../components/user/customerEditCoffee/form';
import { useParams } from 'react-router-dom';

const CustomerEditPage = () => {

    let { id } = useParams();
    return (
        <div className="container">
            <Menu/>
            <div>
                <BlockGridItem33>
                    <CustomerEdit id={id}/>
                    <CustomerEditCoffee id={id}/>
                </BlockGridItem33>
            </div>
        </div>
    )
}

export default CustomerEditPage;
