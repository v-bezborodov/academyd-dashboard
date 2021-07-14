import blogInstance from './instance'

const BlogPostCategory = (title ,callbackSuccess, callbackError) => {
    return async dispatch => {
        blogInstance.post(
            'api/blog/category',
            {
                title: title,
            }
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
