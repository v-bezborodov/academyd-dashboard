import { SET_POSITIONS } from "../../actionTypes/position"

const initialState = {

}

export function positionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSITIONS:
      return {
        ...state,
        positions: action.payload.content,
      }
    default:
      return state
  }
}





