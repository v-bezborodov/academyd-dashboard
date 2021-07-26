import eventInstance from "./instance";

const eventShow = (id, callbackSuccess, callbackError) => {
    return eventInstance.get('api/event/' + id)
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })

}

export default eventShow;

