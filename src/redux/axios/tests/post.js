import testsInstance from './instance'

const TestsPost = (title, attemps, body, who_check, lavel, question_ids, callbackSuccess, callbackError) => {
    return async dispatch => {
        testsInstance.post(
            'api/education/test',
            {
                title: title,
                attemps: attemps,
                body: body,
                who_check: who_check,
                lavel: parseInt(lavel),
                question_ids,
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
