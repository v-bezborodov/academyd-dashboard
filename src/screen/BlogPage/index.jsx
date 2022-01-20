import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Menu from "../../components/menu";
import { BlogCategoryThunk, BlogGetThunk } from "../../redux/thunk/blog";
import PostPageTable from "./AddPost/table";
import {
  BlockGridItem,
  BlockGridItem100,
  BlockGridItem33,
  BlockGridItem50,
  BlockGridItemData,
} from "../CustomerPage/index.styled";

const BlogPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const blog = useSelector((store) => store.blog.blog);
  const blogCategory = useSelector((store) => store.blog.blogCategory);

  useEffect(() => {
    dispatch(BlogGetThunk());
    dispatch(BlogCategoryThunk());
  }, []);

  return (
    <div className="container">
      <Menu />
      <div>
        <BlockGridItem50>
          <BlockGridItemData style={{display: "grid", gridTemplateColumns: "1fr 0.6fr", gap: "15px",}}>
            <Button
              variant="contained"
              // color="primary"
              onClick={() => history.push("/blog/category")}
            >
              Перейти к категориям
            </Button>
            <Button
              variant="contained"
              // color="primary"
              onClick={() => history.push("/blog/newPost")}
            >
              Создать пост
            </Button>
          </BlockGridItemData>
        </BlockGridItem50>

        <PostPageTable data={blog} />
      </div>
    </div>
  );
};

export default BlogPage;
