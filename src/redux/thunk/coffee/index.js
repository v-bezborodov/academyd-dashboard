import { toast } from "react-toastify";
import { setCoffee } from "../../action/coffee";
import coffeeGet from "../../axios/coffee/get";
import coffeePost from "../../axios/coffee/post";

export const  CoffeeGetThunk = (city) => {
    return dispatch => {
        dispatch(
            coffeeGet(
                city,
                res => {
                        dispatch(setCoffee(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};

export const  CoffeePostThunk = (data) => {
    return dispatch => {
                dispatch(
                    coffeePost(
                        data,
                        res => {
                            toast.success("Кофешоп добавлен")
                        },
                        error => {
                            toast.error("Ошибка" + error)
                        },
                    ),
                );
            };
};


