import { toast } from "react-toastify";
import { setCoffee } from "../../action/coffee";
import coffeeGet from "../../axios/coffee/get";
import coffeePost from "../../axios/coffee/post";
import coffeeGetAllIiko from "../../axios/coffee/coffeeGetAllIiko";
import coffeePostMonth from "../../axios/coffee/postMonth";
import coffeeGetUserWorkingTime from "../../axios/coffee/workingTime";
import { notifyToast, retrieveErrorFromApi } from "../../../helper/helper";
import coffeeShopsDelete from "../../axios/coffee/delete";

export const CoffeeGetThunk = (city) => {
  return (dispatch) => {
    dispatch(
      coffeeGet(
        city,
        (res) => {
          dispatch(setCoffee(res.data));
        },
        (error) => {
          toast.error("Ошибка" + error);
        }
      )
    );
  };
};

export const CoffeeGetAllIikoThunk = (
  callbackSuccess
) => {
  return (dispatch) => {
    dispatch(
      coffeeGetAllIiko(
        (res) => {
          if (typeof callbackSuccess === "function") callbackSuccess(res);
        },
        (error) => {
          toast.error("Ошибка" + error);
        }
      )
    );
  };
};


export const CoffeePostThunk = (data) => {
  return (dispatch) => {
    dispatch(
      coffeePost(
        data,
        (res) => {
          dispatch(CoffeeGetThunk());
          toast.success("Кофешоп добавлен");
        },
        (error) => {
          toast.error("Ошибка" + error);
        }
      )
    );
  };
};

export const CoffeePostMonthThunk = (data) => {
  return (dispatch) => {
    dispatch(
      coffeePostMonth(
        data,
        (res) => {
          toast.success("Кофейня назначена");
        },
        (error) => {
          toast.error("Ошибка" + error);
        }
      )
    );
  };
};

export const coffeeGetUserWorkingTimeThunk = (id, callbackSuccess) => {
  return coffeeGetUserWorkingTime(
    id,
    (res) => {
      if (typeof callbackSuccess === "function") callbackSuccess(res);
    },
    (error) => {
      notifyToast(retrieveErrorFromApi(error), "error");
    }
  );
};

export const CoffeeShopDeleteThunk = (id) => {
  return (dispatch) => {
    dispatch(
      coffeeShopsDelete(
        id,
        (res) => {
          dispatch(CoffeeGetThunk());
          notifyToast("Кофешоп успешно удален");
        },
        (error) => {
            toast.error("Ошибка" + error);
        }
      )
    );
  };
};
