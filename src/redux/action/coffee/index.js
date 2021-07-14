import { SET_COFFEE } from "../../actionTypes/coffee";

export const setCoffee = content => ({
  type: SET_COFFEE,
  payload: {
    content,
  },
})
