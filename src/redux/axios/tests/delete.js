import eventInstance from "./instance";

const testDelete = (id, callbackSuccess, callbackError) => {
    return eventInstance.delete('api/education/test/' + id)
            .then((res) => {
                if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            });
}

export default testDelete;
