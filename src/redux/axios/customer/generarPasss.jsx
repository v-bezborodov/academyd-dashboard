import customerInstance from "./instance";

const customerGenerarPass= (id, callbackSuccess, callbackError) => {
    return customerInstance.post('api/password/generate', {id: id})
            .then((res) => {
                if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            });
}

export default customerGenerarPass;
