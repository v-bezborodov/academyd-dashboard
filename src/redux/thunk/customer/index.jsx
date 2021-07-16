import {batch} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCustomer } from '../../action/customer';
import CustomerGet from '../../axios/customer/get';
import CustomerRegistration from "../../axios/customer/post";
import CustomerPut from '../../axios/customer/put';
import CustomerPutPositionCoffee from '../../axios/customer/putPositionCoffee';
import CustomerShow from "../../axios/customer/show";

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
                    toast.error("" + error)
                },
            ),
        );
    };
};

export const СustomerPutPositionCoffeeThunk = (data,id) => {
    return dispatch => {
        dispatch(
            CustomerPutPositionCoffee(
                data, id,
                res => {
                    batch(() => {
                        toast.success("Юзер обновлен")
                    });

                },
                error => {
                    toast.error("" + error)
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

export const CustomerShowThunk = (id) => {
    return dispatch => {
        dispatch(
            CustomerShow(
                id,
                res => {
                    // TODO
                    // dispatch(setCustomer(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                    console.log("1" + error)
                },
            ),
        );
    };
};

export const CustomerPutThunk = (data, id) => {
    return dispatch => {
        dispatch(
            CustomerPut(
                data, id,
                res => {
                    toast.success('Сотрудник обновлен')
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};