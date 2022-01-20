import eventInstance from "./instance";

const questionDelete = (id, callbackSuccess, callbackError) => {
    return eventInstance.delete('api/education/question/' + id)
            .then((res) => {
                if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            });
}

export default questionDelete;
