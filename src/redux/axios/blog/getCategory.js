import blogInstance from './instance'

const BlogGetCategory = (callbackSuccess, callbackError) => {
    return async dispatch => {
        blogInstance.get(
            'api/blog/category'
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default BlogGetCategory;
