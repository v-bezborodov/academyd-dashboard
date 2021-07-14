import blogInstance from './instance'

const BlogPost = (title , body, 
    img, 
    time_read, is_comment, created_by, callbackSuccess, callbackError) => {
    return async dispatch => {
        blogInstance.post(
            'api/blog/post',
            {
                title: title,
                body: body,
                img: img,
                created_by: created_by,
                time_read: time_read,
                is_published: true,
                is_comment: is_comment,

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

export default BlogPost;
