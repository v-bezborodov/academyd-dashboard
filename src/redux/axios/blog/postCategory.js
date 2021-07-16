import blogInstance from './instance'

const BlogPostCategory = (formData ,callbackSuccess, callbackError) => {
    return async dispatch => {
        blogInstance.post(
            'api/blog/category',
            formData
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default BlogPostCategory;
