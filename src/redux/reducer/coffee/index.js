import { SET_COFFEE } from "../../actionTypes/coffee"

const initialState = {

}

export function coffeeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COFFEE:
      return {
        ...state,
        coffeeShops: action.payload.content,
      }
    default:
      return state
  }
}





