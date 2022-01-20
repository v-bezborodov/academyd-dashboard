import questionsInstance from "./instance";

const QuestionsPost = (data, callbackSuccess, callbackError) => {
  return async (dispatch) => {
    questionsInstance
      .post("api/education/question", data)
      .then((res) => {
        if (res.data)
          typeof callbackSuccess === "function" && callbackSuccess(res);
      })
      .catch((error) => {
        typeof callbackError === "function" && callbackError(error);
      });
  };
};

export default QuestionsPost;
