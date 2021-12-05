import customerInstance from './instance'

const CustomerRegistration = (options, callbackSuccess, callbackError) => {
    return customerInstance.post('api/auth/customer/register', options)
            .then((res) => {
                if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })


}

export default CustomerRegistration;
