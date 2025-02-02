import React, {useEffect, useState} from 'react';
import CustomerForm from "../customerStore/form";
import {customerGetThunk} from "../../../redux/thunk/customer";
import {useHistory} from "react-router-dom";
import CustomerTable from "./table";


export default function CustomerMain() {
    let history = useHistory();
    const [data, setData] = useState({});

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        customerGetThunk(handleDataCallback);
    }

    const triggerUpdate = () => {
        getCustomers();
    }

    const handleDataCallback = (data) => {
        if (!data) return
        setData(data);
    }

    return (
        <>
            <div>
                <CustomerForm {...{triggerUpdate}}/>
                <CustomerTable {...{data, triggerUpdate}}/>
            </div>
        </>
    );
}
