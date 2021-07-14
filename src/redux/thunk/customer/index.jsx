import {batch} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCustomer } from '../../action/customer';
import CustomerGet from '../../axios/customer/get';
import CustomerRegistration from "../../axios/customer/post";

export const СustomerRegistrationThunk = dataPhone => {
    return dispatch => {
        dispatch(
            CustomerRegistration(
                dataPhone,
                res => {
                    batch(() => {
                        toast.success("Круто! Вы успешно отправили")
                    });

                },
                error => {
                    toast.error("Похоже ты ошиблися паролем дорогуша: " + error)
                },
            ),
        );
    };
};


export const CustomerGetThunk = () => {
    return dispatch => {
        dispatch(
            CustomerGet(
                res => {
                        dispatch(setCustomer(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                    console.log("1" + error)
                },
            ),
        );
    };
};
