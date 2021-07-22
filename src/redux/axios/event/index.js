import eventInstance from "./instance";

const eventGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        eventInstance.get(
            'api/event'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default eventGet;
