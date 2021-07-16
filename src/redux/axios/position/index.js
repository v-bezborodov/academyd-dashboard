import positionsInstance from './instance'

const positionsGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        positionsInstance.get(
            'api/position'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default positionsGet;
