import customerInstance from './instance'

const CustomerRegistration = (options, callbackSuccess, callbackError) => {
    return async dispatch => {
        customerInstance.post(
            'api/customer/register',
            options
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default CustomerRegistration;
