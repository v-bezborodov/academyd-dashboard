import { toast } from "react-toastify";
import { setCity } from "../../action/city";
import cityGet from "../../axios/city";
import cityPost from "../../axios/city/post";

export const  CityGetThunk = () => {
    return dispatch => {
        dispatch(
            cityGet(
                res => {
                        dispatch(setCity(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};

export const  CityPostThunk = (name) => {
    return dispatch => {
        dispatch(
            cityPost(
                name,
                res => {
                    toast.success("Город добавлен")
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};