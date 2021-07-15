import React from 'react'
import {useParams} from "react-router-dom";
import CustomerEdit from "../../../components/user/CustomerEdit";
import Menu from "../../../components/menu";
import {BlockGridItem33} from "../index.styled";

const CustomerEditPage = () => {

    let {id} = useParams();

    return (
        <div className="container">
            <Menu/>
            <div>
                <BlockGridItem33>
                    <CustomerEdit {...{id}}/>
                </BlockGridItem33>
            </div>
        </div>
    )
}

export default CustomerEditPage;
