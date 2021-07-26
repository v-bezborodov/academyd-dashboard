import eventInstance from "./instance";

const eventPut = (data, id, callbackSuccess, callbackError) => {
    if (!data instanceof FormData) return
    data.append('_method', 'PUT')
    return eventInstance.post('api/event/' + id, data)
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
}

export default eventPut;
