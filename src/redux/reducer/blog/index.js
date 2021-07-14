import { SET_BLOG, SET_BLOG_CATEGORY } from "../../actionTypes/blog"

const initialState = {

}

export function blogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BLOG:
      return {
        ...state,
        blog: action.payload.content,
      }
      case SET_BLOG_CATEGORY:
        return {
          ...state,
          blogCategory: action.payload.content,
        }
    default:
      return state
  }
}





