import customerInstance from './instance'

const CustomerPutPositionCoffee = (data, id, callbackSuccess, callbackError) => {
    return async dispatch => {
        customerInstance.post(
            'api/user/'+id+'/position/coffeeshop',
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

export default CustomerPutPositionCoffee;
