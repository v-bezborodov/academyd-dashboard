import { toast } from "react-toastify";
import { setBlog, setBlogCategory } from "../../action/blog";
import BlogGet from "../../axios/blog/get";
import BlogGetCategory from "../../axios/blog/getCategory";

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


