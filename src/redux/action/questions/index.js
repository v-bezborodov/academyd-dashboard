import { SET_QUESTIONS } from '../../actionTypes/questions';

export const setQuestion = content => ({
  type: SET_QUESTIONS,
  payload: {
    content,
  },
})
