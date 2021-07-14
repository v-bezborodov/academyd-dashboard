import { toast } from "react-toastify";
import { setCoffee } from "../../action/coffee";
import coffeeGet from "../../axios/coffee/get";
import coffeePost from "../../axios/coffee/post";

export const  CoffeeGetThunk = () => {
    return dispatch => {
        dispatch(
            coffeeGet(
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

export const  CoffeePostThunk = (name, address, email, phone, 
    // avatar, 
    instagram, fb, vk, working_time, city_id) => {
    return dispatch => {
        dispatch(
            coffeePost(
                name, address, email, phone, 
                // avatar, 
                instagram, fb, vk, working_time, city_id,
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


