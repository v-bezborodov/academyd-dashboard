import customerInstance from './instance'

const CustomerPut = (data, id, callbackSuccess, callbackError) => {

    if (!data instanceof FormData) return
    data.append('_method', 'PUT')
    return async dispatch => {
        customerInstance.post('api/user/'+id, data)
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default CustomerPut;
