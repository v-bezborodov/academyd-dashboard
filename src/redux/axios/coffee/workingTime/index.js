import coffeeInstance from "./../instance"

const coffeeGetUserWorkingTime = (coffeeShop_id, callbackSuccess, callbackError) => {
    return coffeeInstance.get(
        'api/coffeeshop/' + coffeeShop_id + '/user-working-time'
    )
        .then((res) => {
            if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
        })
        .catch(error => {
            typeof callbackError === 'function' && callbackError(error)
        })

}

export default coffeeGetUserWorkingTime;
