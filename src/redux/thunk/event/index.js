import { toast } from "react-toastify";
import eventGet from "../../axios/event";
import eventPost from "../../axios/event/post";
import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";
import eventDelete from "../../axios/event/delete";

export const  EventGetThunk = (callback) => {
    return dispatch => {
        dispatch(
            eventGet(
                res => {
                    if (res) callback(res)
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};

export const  EventPostThunk = (data) => {
    return dispatch => {
        dispatch(
            eventPost(
                data,
                res => {
                    if (res) notifyToast('Мероприятие успешно создано');
                },
                error => {
                    notifyToast(retrieveErrorFromApi(error), 'error');
                },
            ),
        );
    };
};

export const  EventDeleteThunk = (id) => {
    return dispatch => {
        dispatch(
            eventDelete(
                id,
                res => {
                    if (res) notifyToast(retrieveErrorFromApi(res));
                },
                error => {
                    notifyToast(retrieveErrorFromApi(error), 'error');
                },
            ),
        );
    };
};
