import { SET_TESTS } from '../../actionTypes/tests';

const initialState = {

}

export function testsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TESTS:
      return {
        ...state,
        tests: action.payload.content,
      }
    default:
      return state
  }
}





