import coffeeInstance from "./instance"

const coffeeGet = (city, callbackSuccess, callbackError) => {
    return async dispatch => {
        coffeeInstance.get(
            'api/coffeeshop'+'?city='+city
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
