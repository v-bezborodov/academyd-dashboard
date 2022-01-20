import coffeeInstance from "./instance";

const coffeePost = (data, callbackSuccess, callbackError) => {
  return async (dispatch) => {
    coffeeInstance
      .post("api/coffeeshop", data)
      .then((res) => {
        if (res.data)
          typeof callbackSuccess === "function" && callbackSuccess(res);
      })
      .catch((error) => {
        typeof callbackError === "function" && callbackError(error);
      });
  };
};

export default coffeePost;
