import { toast } from "react-toastify";
import eventGet from "../../axios/event";
import eventPost from "../../axios/event/post";
import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";

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
                    if (res) notifyToast(retrieveErrorFromApi(res));
                },
                error => {
                    // toast.error("Ошибка" + error)
                    notifyToast(retrieveErrorFromApi(error), 'error');
                },
            ),
        );
    };
};
