import { toast } from "react-toastify";
import { setCoffee } from "../../action/coffee";
import coffeeGet from "../../axios/coffee/get";

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
