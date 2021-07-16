import { toast } from "react-toastify";
import { setTests } from "../../action/tests";
import TestsGet from "../../axios/tests/get";
import TestsPost from "../../axios/tests/post";

export const  TestsGetThunk = () => {
    return dispatch => {
        dispatch(
            TestsGet(
                res => {
                        dispatch(setTests(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};
export const  TestsPostThunk = (title, attemps, body, who_check, lavel, question_ids) => {
    return dispatch => {
        dispatch(
            TestsPost(
                title, attemps, body, who_check, lavel,question_ids,
                res => {
                    toast.success("Тест добавлен")
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};
