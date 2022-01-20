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
import CustomSelect from "../../../partials/inputs/select";
import { OutlinedInput } from "@mui/material";
import { ListItemText } from "@mui/material";

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
    setValue,
  } = useForm();

  const [openCategoryId, setOpenCategoryId] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState([]);
  const [is_comment, setIsComment] = useState(false);
  const [is_published, setIsPublished] = useState(false);

  const handleChangeCategoryId = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryId(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCloseCategoryId = () => {
    setOpenCategoryId(false);
  };

  const handleOpenCategoryId = () => {
    setOpenCategoryId(true);
  };

  // const handleChangeCategoryId = (event) => {
  //   setCategoryId([event.target.value]);
  // };

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
    dataForm.append("preview", data.preview[0]);
    dataForm.append("time_read", data.time_read);
    dataForm.append("is_published", data.is_published ? 1 : 0);
    dataForm.append("is_comment", data.is_comment ? 1 : 0);
    categoryId.map((item, i)=> {
      return dataForm.append('category_id[]', categoryId[i])
    });

    await dispatch(BlogPostThunk(dataForm));

    await reset();
    await dispatch(BlogCategoryThunk());
    history.push("/blog");
  };

  const handleIsPublished = (event) => {
    if (!event) return;
    setIsPublished(event.target.value);
    setValue("is_published", event.target.value);
  };

  const handleIsCommnet = (event) => {
    if (!event) return;
    setIsComment(event.target.value);
    setValue("is_comment", event.target.value);
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
                <input {...register("preview")} type="file" name="preview" />
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

                <FormControl>
                  <InputLabel id="demo-controlled-open-select-label">
                    Категория
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="category"
                    multiple
                    value={categoryId}
                    onChange={handleChangeCategoryId}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {blogCategory?.map((category, i) => (
                      <MenuItem key={i} value={category.id}>
                        <Checkbox
                          checked={categoryId.indexOf(category.id) > -1}
                        />
                        <ListItemText primary={category.title} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="is_comment-label">
                    Разрешить комментарии
                  </InputLabel>
                  <CustomSelect
                    inputProps={register("is_comment")}
                    labelId="is_comment-label"
                    name="is_comment"
                    id="is_comment"
                    value={is_comment}
                    onChange={(e) => handleIsCommnet(e)}
                    error={!!errors.is_comment}
                  >
                    <MenuItem value={true}>Да</MenuItem>
                    <MenuItem value={false}>Нет</MenuItem>
                  </CustomSelect>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="is_published-label">Опубликован</InputLabel>
                  <CustomSelect
                    inputProps={register("is_published")}
                    labelId="is_published-label"
                    name="is_published"
                    id="is_published"
                    value={is_published}
                    onChange={(e) => handleIsPublished(e)}
                    error={!!errors.is_published}
                  >
                    <MenuItem value={true}>Да</MenuItem>
                    <MenuItem value={false}>Нет</MenuItem>
                  </CustomSelect>
                </FormControl>

                <Button variant="contained" 
                // color="primary" 
                type="submit">
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
