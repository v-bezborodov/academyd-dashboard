import customerInstance from "./instance";

const customerDelete= (id, callbackSuccess, callbackError) => {
    return customerInstance.delete('api/user/' + id)
            .then((res) => {
                if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            });
}

export default customerDelete;
