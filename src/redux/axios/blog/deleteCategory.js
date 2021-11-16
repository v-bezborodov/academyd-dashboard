import customerInstance from "./instance";

const CategoryDelete = (id, callbackSuccess, callbackError)  => {
    return async dispatch => {
        customerInstance.delete('api/blog/category/' + id)
        .then((res) => {
            if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
        })
        .catch(error => {
            typeof callbackError === 'function' && callbackError(error)
        });
    }

}

export default CategoryDelete;
