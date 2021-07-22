import eventInstance from "./instance";

const eventDelete= (id, callbackSuccess, callbackError) => {
    return async dispatch => {
        eventInstance.delete(
            'api/event/' + id,
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default eventDelete;
