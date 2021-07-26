import eventInstance from "./instance";

const eventPost = (option, callbackSuccess, callbackError) => {
    return eventInstance.post('api/event', option)
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
}

export default eventPost;
