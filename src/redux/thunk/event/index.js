import { toast } from "react-toastify";
import eventGet from "../../axios/event";

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
