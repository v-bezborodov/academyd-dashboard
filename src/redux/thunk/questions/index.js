import { toast } from "react-toastify";
import { setQuestion } from "../../action/questions";
import QuestionsGet from "../../axios/questions";

export const  QuestionsGetThunk = () => {
    return dispatch => {
        dispatch(
            QuestionsGet(
                res => {
                        dispatch(setQuestion(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};
