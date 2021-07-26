import {toast} from "react-toastify";
import eventGet from "../../axios/event";
import eventPost from "../../axios/event/post";
import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";
import eventDelete from "../../axios/event/delete";
import eventShow from "../../axios/event/show";
import eventPut from "../../axios/event/put";

export const EventGetThunk = (callback) => {
    return dispatch => {
        dispatch(
            eventGet(
                res => {
                    if (res) callback(res)
                },
                error => {
                    notifyToast(retrieveErrorFromApi(error), 'error');
                },
            ),
        );
    };
};

export const EventShowThunk = (id, callback) => {
    return eventShow(id,
        res => {
            if (res) callback(res)
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        }
    )
};

export const EventPostThunk = (data, callbackSuccess) => {
    return eventPost(data,
        res => {
            if (res) notifyToast('Мероприятие успешно создано');
            if (typeof callbackSuccess === 'function') callbackSuccess()
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    )

};

export const EventUpdateThunk = (data, id, callbackSuccess) => {
    if (!id) notifyToast('Не удалось сохранить, отсутствует необходимый параметр', 'error');
    return eventPut(data,
        id,
        res => {
            if (res) notifyToast('Мероприятие успешно сохранено');
            if (typeof callbackSuccess === 'function') callbackSuccess()
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    )

};

export const EventDeleteThunk = (id, callbackSuccess) => {
    return eventDelete(
        id,
        res => {
            notifyToast('Мероприятие успешно удалено');
            if (typeof callbackSuccess === 'function') callbackSuccess()
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    )
};
