import testsInstance from './instance'

const TestsGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        testsInstance.get(
            'api/education/test'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default TestsGet;
