import {batch} from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerRegistration from "../../axios/customer/post";
import CustomerPut from '../../axios/customer/put';
import CustomerPutPositionCoffee from '../../axios/customer/putPositionCoffee';
import CustomerShow from "../../axios/customer/show";
import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";
import customerGet from "../../axios/customer/get";
import eventDelete from "../../axios/event/delete";
import customerDelete from "../../axios/customer/delete";

export const СustomerRegistrationThunk = (dataPhone, callback) => {
    return CustomerRegistration(
        dataPhone,
        res => {
            batch(() => {
                toast.success("Круто! Вы успешно отправили")
            });
            if (res) callback(res)

        },
        error => {
            toast.error("" + error)
        },
    );


};

export const СustomerPutPositionCoffeeThunk = (data, id) => {
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


export const customerGetThunk = (callback) => {
    return customerGet(
        res => {
            if (res) callback(res)
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    );
};

export const CustomerShowThunk = (id, callbackSuccess) => {
    return dispatch => {
        dispatch(
            CustomerShow(
                id,
                res => {
                    if (callbackSuccess && res.data) callbackSuccess(res.data)
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
                data,
                id,
                res => {
                    toast.success('Сотрудник обновлен')
                },
                error => {
                    notifyToast(retrieveErrorFromApi(error), 'error');
                },
            ),
        );
    };
};

export const CustomerDeleteThunk = (id, callbackSuccess) => {
    return customerDelete(
        id,
        res => {
            notifyToast('Юзер успешно удален');
            if (typeof callbackSuccess === 'function') callbackSuccess()
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    )
};
