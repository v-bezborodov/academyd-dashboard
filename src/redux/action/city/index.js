import { SET_CITY } from "../../actionTypes/city";

export const setCity = content => ({
  type: SET_CITY,
  payload: {
    content,
  },
})
