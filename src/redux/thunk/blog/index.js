import { toast } from "react-toastify";
import { setBlog, setBlogCategory } from "../../action/blog";
import PostDelete from "../../axios/blog/delete";
import CategoryDelete from "../../axios/blog/deleteCategory";
import BlogGet from "../../axios/blog/get";
import BlogGetCategory from "../../axios/blog/getCategory";
import BlogPost from "../../axios/blog/post";
import BlogPostCategory from "../../axios/blog/postCategory";

export const  BlogGetThunk = () => {
    return dispatch => {
        dispatch(
            BlogGet(
                res => {
                        dispatch(setBlog(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};

export const  BlogCategoryThunk = () => {
    return dispatch => {
        dispatch(
            BlogGetCategory(
                res => {
                        dispatch(setBlogCategory(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};


export const  BlogCategoryPostThunk = (formData) => {
    return dispatch => {
        dispatch(
            BlogPostCategory(
                formData,
                res => {
                    toast.success("Категория добавлена")
                },
                error => {
                    
                },
            ),
        );
    };
};

export const BlogPostThunk = (FormData) => {
    return dispatch => {
        dispatch(
            BlogPost(
                FormData,
                res => {
                    toast.success("Категория добавлена")
                },
                error => {
                    
                },
            ),
        );
    };
};

export const PostDeleteThunk = (id) => {
    return dispatch => {
        dispatch(
            PostDelete(
                id,
                res => {
                    dispatch(BlogGetThunk())
                    toast.success("Пост успешно удален")
                },
                error => {
                    toast.error("Пост не удален " + {error})
                },
            ),
        );
    };
};

export const CategoryDeleteThunk = (id) => {
    return dispatch => {
        dispatch(
            CategoryDelete(
                id,
                res => {
                    dispatch(BlogCategoryThunk())
                    toast.success("Категория успешно удалена")
                },
                error => {
                    toast.error("Категория не удалена " + {error})
                },
            ),
        );
    };
};


