import coffeeShopPlaceInstance from "./instance";

const coffeePlaceGet = ( callbackSuccess, callbackError) => {
    return coffeeShopPlaceInstance.get('api/coffee-shop-place')
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })


}

export default coffeePlaceGet;
