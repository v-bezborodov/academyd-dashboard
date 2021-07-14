import { toast } from "react-toastify";
import { setCity } from "../../action/city";
import cityGet from "../../axios/city";

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
