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


export const  BlogCategoryPostThunk = (title) => {
    return dispatch => {
        dispatch(
            BlogPostCategory(
                title,
                res => {
                    toast.success("Категория добавлена")
                },
                error => {
                    
                },
            ),
        );
    };
};

export const BlogPostThunk = (title , body, 
    // img, 
    time_read, is_comment, category) => {
    return dispatch => {
        dispatch(
            BlogPost(
                title , body, 
                // img, 
                time_read, is_comment, 
                category,
                res => {
                    toast.success("Категория добавлена")
                },
                error => {
                    
                },
            ),
        );
    };
};




