import customerInstance from "./instance";

const PostDelete = (id, callbackSuccess, callbackError)  => {
    return async dispatch => {
        customerInstance.delete('api/blog/post/' + id)
        .then((res) => {
            if (res) typeof callbackSuccess === 'function' && callbackSuccess(res)
        })
        .catch(error => {
            typeof callbackError === 'function' && callbackError(error)
        });
    }

}

export default PostDelete;
