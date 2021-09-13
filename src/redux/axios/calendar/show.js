import calendarInstance from "./instance"

const calendarShow = (id, callbackSuccess, callbackError) => {
    return calendarInstance.get('api/calendar/' + id)
        .then((res) => {
            if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
        })
        .catch(error => {
            typeof callbackError === 'function' && callbackError(error)
        })

}

export default calendarShow;
