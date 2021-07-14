import { toast } from "react-toastify";
import { setTests } from "../../action/tests";
import TestsGet from "../../axios/tests/get";

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
