import {notifyToast, retrieveErrorFromApi} from "../../../helper/helper";
import coffeePlaceGet from "../../axios/coffee_shop_place/get";

export const coffeePlaceGetThunk = (callbackSuccess) => {
    return coffeePlaceGet (
        res => {
            if (typeof callbackSuccess === 'function') callbackSuccess(res)
        },
        error => {
            notifyToast(retrieveErrorFromApi(error), 'error');
        },
    );
};




