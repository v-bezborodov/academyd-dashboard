import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Menu from "../../../components/menu";
import {
  BlogCategoryPostThunk,
  BlogCategoryThunk,
  BlogPostThunk,
} from "../../../redux/thunk/blog";
import { useForm } from "react-hook-form";
import {
  BlockGridItem,
  BlockGridItem100,
  BlockGridItem33,
  BlockGridItem50,
  BlockGridItemData,
} from "../../CustomerPage/index.styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const AddPostPage = () => {
  const classes = useStyles();
  const [valueBody, setValueBody] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();
  const blogCategory = useSelector((store) => store.blog.blogCategory);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [openCategoryId, setOpenCategoryId] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState([]);
  const [isComment, setIsComment] = React.useState(false);

  const handleCloseCategoryId = () => {
    setOpenCategoryId(false);
  };

  const handleOpenCategoryId = () => {
    setOpenCategoryId(true);
  };

  const handleChangeCategoryId = (event) => {
    setCategoryId([event.target.value]);
  };

  const handleChange = (event) => {
    console.log(event.target.checked);
    setIsComment(event.target.checked);
  };

  const onSubmit = async (data) => {
    if (!data) return;
    const dataForm = new FormData();
    dataForm.append("title", data.title);
    dataForm.append("body", valueBody);
    dataForm.append("img", data.img[0]);
    dataForm.append("created_by", 1);
    dataForm.append("time_read", data.time_read);
    dataForm.append("is_published", true);
    dataForm.append("is_comment", true);
    // dataForm.append("category_id", categoryId);

    await dispatch(BlogPostThunk(dataForm));

    await reset();
    await dispatch(BlogCategoryThunk());
    history.push("/blog");
  };

  return (
    <div className="container">
      <Menu />
      <div>
        <div>
          <BlockGridItem50>
            <p>Добавить новый пост</p>
            <BlockGridItemData>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("title", { required: "Не может быть пустым" })}
                  id="title"
                  label="Название"
                  error={errors.title}
                  helperText={errors?.title?.message && errors.title.message}
                />
                {/* <TextField {...register("body", { required: 'Не может быть пустым' })}
                                    id="body"
                                    label="Тело поста"
                                    error={errors.body}
                                    helperText={errors?.body?.message && errors.body.message}
                                /> */}
                <ReactQuill
                  theme="snow"
                  value={valueBody}
                  onChange={setValueBody}
                />
                <br />
                <input {...register("img")} type="file" name="img" />
                <TextField
                  {...register("time_read", {
                    required: "Не может быть пустым",
                  })}
                  id="time_read"
                  label="Время чтения"
                  error={errors.time_read}
                  helperText={
                    errors?.time_read?.message && errors.time_read.message
                  }
                />

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Категория
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="level"
                    open={openCategoryId}
                    onClose={handleCloseCategoryId}
                    onOpen={handleOpenCategoryId}
                    value={categoryId}
                    onChange={handleChangeCategoryId}
                  >
                    {blogCategory?.map((row) => (
                      <MenuItem value={row.id}>{row.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div style={{ display: "flex" }}>
                  <Checkbox
                    id="is_comment"
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    checked={isComment}
                    onChange={handleChange}
                  />
                  <InputLabel
                    style={{ margin: "auto 0px" }}
                    id="demo-controlled-open-select-label"
                  >
                    Разрешить комментарии
                  </InputLabel>
                </div>

                <Button variant="contained" color="primary" type="submit">
                  Создать пост
                </Button>
              </form>
            </BlockGridItemData>
          </BlockGridItem50>
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;
