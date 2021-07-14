import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import FormattedInputs from "../../components/elements/phoneInput";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData} from "./index.styled";
import SmsIcon from "@material-ui/icons/Sms";
import DenseTable from "../../components/elements/table";
import {useDispatch, useSelector} from "react-redux";
import {CustomerGetThunk, СustomerRegistrationThunk} from "../../redux/thunk/customer";
import TextField from "@material-ui/core/TextField";


const CastomerPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const [phoneDat, setPhoneData] = useState()
    const customer = useSelector(store => store.customer.customer)

    const cubCustomerNew = () => {
        let customerPhoneData = {
            phone : phoneDat
        }
        dispatch(СustomerRegistrationThunk(customerPhoneData))
    }


    useEffect(() => {
        if(localStorage.accessToken){
            dispatch(CustomerGetThunk())
        }else {
            history.push('/')
        }
    }, [])


    return (
        <div className="container">
            <Menu/>
            <div>
                <BlockGridItem33>
                    <p>Добавить сотрудника</p>
                    <BlockGridItemData>
                        <TextField onChange={(event)=>setPhoneData(event.target.value )}  id="Phone" label="Login" />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={cubCustomerNew}
                            endIcon={<SmsIcon/>}>
                            Отправить пароль
                        </Button>
                    </BlockGridItemData>
                </BlockGridItem33>
                <BlockGridItem33>
                    <p>Восстановить пароль юзера</p>
                    <BlockGridItemData>
                        <TextField onChange={(event)=>setPhoneData(event.target.value )}  id="Phone" label="Login" />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={cubCustomerNew}
                            endIcon={<SmsIcon/>}>
                            Отправить пароль
                        </Button>
                    </BlockGridItemData>
                </BlockGridItem33>
                <BlockGridItem100>
                    <p>Все сотрудники</p>
                    <DenseTable rows={customer} />
                    
                </BlockGridItem100>
            </div>

        </div>
    )
}

export default CastomerPage;
