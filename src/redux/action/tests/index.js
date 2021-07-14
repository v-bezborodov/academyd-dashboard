import { SET_TESTS } from '../../actionTypes/tests';

export const setTests = content => ({
  type: SET_TESTS,
  payload: {
    content,
  },
})
