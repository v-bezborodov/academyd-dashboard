import calendarInstance from "./instance"

const calendarPost = (data, callbackSuccess, callbackError) => {
    return calendarInstance.post('api/calendar', data)
        .then((res) => {
            if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
        })
        .catch(error => {
            typeof callbackError === 'function' && callbackError(error)
        })

}

export default calendarPost;
