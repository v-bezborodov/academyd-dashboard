import { SET_CITY } from "../../actionTypes/city"

const initialState = {

}

export function cityReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        city: action.payload.content,
      }
    default:
      return state
  }
}





