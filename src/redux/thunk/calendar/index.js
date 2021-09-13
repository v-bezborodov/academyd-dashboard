import {toast} from "react-toastify";
import calendarPost from "../../axios/calendar/post";
import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";
import calendarShow from "../../axios/calendar/show";

export const calendarPostThunk = (data) => {
    return calendarPost(
        data,
        res => {
            toast.success("Календарь сохранен")
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    )
};


export const calendarShowThunk = (id, callbackSuccess) => {

    if (!id) toast.error("Ошибка, не указан id календаря")

    return calendarShow(
        id,
        res => {
            if (typeof callbackSuccess === 'function') callbackSuccess(res)
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    )
};


