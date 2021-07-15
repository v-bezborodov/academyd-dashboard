import questionsInstance from './instance'

const QuestionsPost = (
    title,
    weight,
    time,
    levelQuestions,
    body,
    callbackSuccess, callbackError) => {
    return async dispatch => {
        questionsInstance.post(
            'api/education/question',
            {
                title: title,
                weight: weight,
                time: time,
                level: levelQuestions,
                question_body: JSON.stringify(body),
            }
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default QuestionsPost;
