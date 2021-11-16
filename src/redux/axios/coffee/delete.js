import customerInstance from "./instance";

const coffeeShopsDelete = (id, callbackSuccess, callbackError)  => {
    return async dispatch => {
        customerInstance.delete('api/coffeeshop/' + id)
        .then((res) => {
            if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
        })
        .catch(error => {
            typeof callbackError === 'function' && callbackError(error)
        });
    }

}

export default coffeeShopsDelete;
