import { toast } from "react-toastify";
import { setPositions } from "../../action/positions";
import positionsGet from "../../axios/position";


export const  PositionsGetThunk = () => {
    return dispatch => {
        dispatch(
            positionsGet(
                res => {
                        dispatch(setPositions(res.data))
                },
                error => {
                    toast.error("Ошибка" + error)
                },
            ),
        );
    };
};
