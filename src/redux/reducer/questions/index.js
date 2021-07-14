import { SET_QUESTIONS } from "../../actionTypes/questions"

const initialState = {

}

export function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.content,
      }
    default:
      return state
  }
}





