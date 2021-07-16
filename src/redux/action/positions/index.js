import { SET_POSITIONS } from '../../actionTypes/position';

export const setPositions = content => ({
  type: SET_POSITIONS,
  payload: {
    content,
  },
})
