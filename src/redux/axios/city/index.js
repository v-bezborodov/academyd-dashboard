import cityInstance from './instance'

const cityGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        cityInstance.get(
            'api/city'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default cityGet;
