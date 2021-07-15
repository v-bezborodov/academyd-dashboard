import cityInstance from './instance'

const cityPost = (name, callbackSuccess, callbackError) => {
    return async dispatch => {
        cityInstance.post(
            'api/city',
            {name: name}
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default cityPost;
