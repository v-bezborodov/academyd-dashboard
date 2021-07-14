import { SET_BLOG, SET_BLOG_CATEGORY } from "../../actionTypes/blog";

export const setBlog = content => ({
  type: SET_BLOG,
  payload: {
    content,
  },
})

export const setBlogCategory = content => ({
  type: SET_BLOG_CATEGORY,
  payload: {
    content,
  },
})
