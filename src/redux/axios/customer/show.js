import customerInstance from './instance'

const CustomerShow = (id, callbackSuccess, callbackError) => {
    return async dispatch => {
        customerInstance.get(
            'api/user/'+id
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default CustomerShow;
