import { toast } from "react-toastify";
import { setTests } from "../../action/tests";
import testDelete from "../../axios/tests/delete";
import TestsGet from "../../axios/tests/get";
import TestsPost from "../../axios/tests/post";

export const TestsGetThunk = () => {
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


export const TestsPostThunk = (title, attemps, body, typeTest, levelQuestions, allQuestions, threshold_percent, can_exit,) => {
    return dispatch => {
        dispatch(
            TestsPost(
                title, attemps, body, typeTest, levelQuestions, allQuestions, threshold_percent, can_exit,
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

export const TestDeleteThunk = (id, callbackSuccess) => {
    return testDelete(
        id,
        res => {
            toast.success("Тест успешно удален")
            if (typeof callbackSuccess === 'function') callbackSuccess()
        },
        error => {
            toast.error("Ошибка" + error)
        },
    )
};
