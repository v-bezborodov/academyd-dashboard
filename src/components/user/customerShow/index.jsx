import React, {useEffect, useState} from 'react';
import CustomerForm from "./form";
import {customerGetThunk} from "../../../redux/thunk/customer";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import CustomerTable from "./table";


export default function CustomerMain() {
    const dispatch = useDispatch();
    let history = useHistory();
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.accessToken) {
            getCustomers();
        } else {
            history.push('/')
        }
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
