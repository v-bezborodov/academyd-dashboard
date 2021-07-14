import coffeeInstance from "./instance"

const coffeeGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        coffeeInstance.get(
            'api/coffeeshop'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default coffeeGet;
