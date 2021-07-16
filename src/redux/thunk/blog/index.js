import { toast } from "react-toastify";
import { setBlog, setBlogCategory } from "../../action/blog";
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




