import coffeeInstance from "./instance"

const coffeePost = (name, address, email, phone, 
    // avatar, 
    instagram, fb, vk, working_time, city_id, callbackSuccess, callbackError) => {
    return async dispatch => {
        coffeeInstance.post(
            'api/coffeeshop',
            {
                name: name,
                address: address,
                email: email,
                phone: phone,
                // avatar: avatar,
                instagram: instagram,
                fb: fb,
                vk: vk,
                working_time: working_time,
                city_id: city_id,
            }
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default coffeePost;
