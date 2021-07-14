import blogInstance from './instance'

const BlogGet = (callbackSuccess, callbackError) => {
    return async dispatch => {
        blogInstance.get(
            'api/blog/post'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default BlogGet;
