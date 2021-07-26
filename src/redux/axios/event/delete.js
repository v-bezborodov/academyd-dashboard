import eventInstance from "./instance";

const eventDelete= (id, callbackSuccess, callbackError) => {
    return eventInstance.delete('api/event/' + id)
            .then((res) => {
                if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            });
}

export default eventDelete;
