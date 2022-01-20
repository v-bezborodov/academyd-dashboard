import coffeeInstance from "./instance"

const coffeeGetAllIiko = ( callbackSuccess, callbackError) => {
    return async dispatch => {
        coffeeInstance.get(
            'api/iiko/departments'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default coffeeGetAllIiko;
