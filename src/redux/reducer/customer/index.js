import { SET_CUSTOMER } from "../../actionTypes/customer"

const initialState = {

}

export function customerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload.content,
      }
    default:
      return state
  }
}





