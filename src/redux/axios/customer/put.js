import customerInstance from './instance'

const CustomerPut = (data, id, callbackSuccess, callbackError) => {


    return async dispatch => {

        customerInstance.put(
            'api/user/'+id,
            data
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default CustomerPut;
