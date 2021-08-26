import coffeeShopPlaceInstance from "./instance";

const coffeePlaceGStore = (options, callbackSuccess, callbackError) => {
    return coffeeShopPlaceInstance.post('api/coffee-shop-place', options)
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })


}

export default coffeePlaceStore;
