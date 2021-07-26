import customerInstance from './instance'

const customerGet = (callbackSuccess, callbackError) => {
    return customerInstance.get('api/user')
        .then((res) => {
            if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
        })
        .catch(error => {
            typeof callbackError === 'function' && callbackError(error)
        })
}

export default customerGet;
