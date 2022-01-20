import testsInstance from './instance'

const TestsPost = (title, attemps, body, typeTest, levelQuestions, allQuestions, threshold_percent, can_exit, callbackSuccess, callbackError) => {
    return async dispatch => {
        testsInstance.post(
            'api/education/test',
            {
                title: title,
                attempts: attemps,
                body: body,
                who_check: typeTest,
                level: levelQuestions,
                question_ids: allQuestions,
                threshold_percent: threshold_percent,
                can_exit: can_exit,
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

export default TestsPost;
