import { toast } from "react-toastify";
import { setQuestion } from "../../action/questions";
import QuestionsGet from "../../axios/questions";
import questionDelete from "../../axios/questions/delete";
import QuestionsPost from "../../axios/questions/post";

export const QuestionsGetThunk = () => {
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

export const QuestionsPostThunk = (data) => {
    return (dispatch) => {
      dispatch(
        QuestionsPost(
          data,
          (res) => {
            toast.success("Кофешоп добавлен");
          },
          (error) => {
            toast.error("Ошибка" + error);
          }
        )
      );
    };
  };

export const QuestionDeleteThunk = (id, callbackSuccess) => {
    return questionDelete(
        id,
        res => {
            toast.success("Вопрос успешно удален")
            if (typeof callbackSuccess === 'function') callbackSuccess()
        },
        error => {
            toast.error("Ошибка" + error)
        },
    )
};