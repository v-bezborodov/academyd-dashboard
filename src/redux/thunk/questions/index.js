import { toast } from "react-toastify";
import { setQuestion } from "../../action/questions";
import QuestionsGet from "../../axios/questions";
import QuestionsPost from "../../axios/questions/post";

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

export const  QuestionsPostThunk = (
    title,
    weight,
    time,
    levelQuestions,
    body,
) => {
    return dispatch => {
        dispatch(
            QuestionsPost(
                title,
                weight,
                time,
                levelQuestions,
                body,
                res => {
                    toast.success("Вопрос добавлен")
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};

