import { SET_CUSTOMER } from "../../actionTypes/customer";

export const setCustomer = content => ({
  type: SET_CUSTOMER,
  payload: {
    content,
  },
})
