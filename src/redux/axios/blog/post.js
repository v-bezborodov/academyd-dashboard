import blogInstance from './instance'

const BlogPost = (FormData, callbackSuccess, callbackError) => {
    return async dispatch => {
        blogInstance.post(
            'api/blog/post',
            FormData,
        )
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })
    }

}

export default BlogPost;
