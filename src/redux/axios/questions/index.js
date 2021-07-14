import questionsInstance from './instance'

const QuestionsGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        questionsInstance.get(
            'api/education/question'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default QuestionsGet;
