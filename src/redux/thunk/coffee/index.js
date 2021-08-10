import {toast} from "react-toastify";
import {setCoffee} from "../../action/coffee";
import coffeeGet from "../../axios/coffee/get";
import coffeePost from "../../axios/coffee/post";
import coffeeGetUserWorkingTime from "../../axios/coffee/workingTime";
import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";

export const CoffeeGetThunk = (city) => {
    return dispatch => {
        dispatch(
            coffeeGet(
                city,
                res => {
                    dispatch(setCoffee(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};

export const CoffeePostThunk = (data) => {
    return dispatch => {
        dispatch(
            coffeePost(
                data,
                res => {
                    toast.success("Кофешоп добавлен")
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};

export const coffeeGetUserWorkingTimeThunk = (id,  callbackSuccess) => {
    return coffeeGetUserWorkingTime(
        id,
        res => {
            if (typeof callbackSuccess === 'function') callbackSuccess(res)
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    )
};



