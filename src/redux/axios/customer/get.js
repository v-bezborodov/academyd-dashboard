import customerInstance from './instance'

const CustomerGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        customerInstance.get(
            'api/user'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default CustomerGet;
