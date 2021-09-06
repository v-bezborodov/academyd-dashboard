import {toast} from "react-toastify";
import calendarPost from "../../axios/calendar/post";
import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";

export const CalendarPostThunk = (data) => {
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


