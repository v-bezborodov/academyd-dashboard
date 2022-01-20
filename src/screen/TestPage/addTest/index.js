import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
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
import { TestsPostThunk } from "../../../redux/thunk/tests";
import {
  BlockGridItem,
  BlockGridItem100,
  BlockGridItem33,
  BlockGridItemData,
} from "../../CustomerPage/index.styled";
import { QuestionsGetThunk } from "../../../redux/thunk/questions";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const AddPostTest = () => {
  const classes = useStyles();
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

  const [openTypeTest, setOpenTypeTest] = React.useState(false);
  const [typeTest, setTypeTest] = React.useState("");
  const questions = useSelector((store) => store.questions.questions);

  useEffect(() => {
    getDataQuestions();
  }, []);

  const getDataQuestions = () => {
    dispatch(QuestionsGetThunk());
  };

  const handleClose = () => {
    setOpenTypeTest(false);
  };

  const handleOpen = () => {
    setOpenTypeTest(true);
  };

  const handleChangeType = (event) => {
    setTypeTest(event.target.value);
  };

  const [openLevelQuestions, setOpenLevelQuestions] = React.useState(false);
  const [levelQuestions, setLevelQuestions] = React.useState("");

  const [allQuestions, setAllQuestions] = React.useState([]);

  const handleCloseLevel = () => {
    setOpenLevelQuestions(false);
  };

  const handleOpenLevel = () => {
    setOpenLevelQuestions(true);
  };

  const handleChangeLevale = (event) => {
    setLevelQuestions(event.target.value);
  };

  const [is_comment, setIs_comment] = React.useState(true);

  const handleChange = (event) => {
    setIs_comment(event.target.checked);
  };

  const onSubmit = async (data) => {
    if (!data) return;

    const can_exit = false
    
    await dispatch(
      TestsPostThunk(
        data.title,
        data.attempts,
        data.body,
        typeTest,
        levelQuestions,
        allQuestions,
        data.threshold_percent,
        can_exit,
      )
    );
    await reset();
    history.push("/all-test");
  };

  const onEditorStateChange = (stateQuestions) => {
    // let copy = Object.assign([], allQuestions);
    // copy.push('кот');
    const overEighteen = stateQuestions.map((question) => {
      return question.id;
    });
    setAllQuestions(overEighteen);
  };
  //   const editorContent = watch("question_ids");

  return (
    <div className="container">
      <Menu />
      <div>
        <div>
          <BlockGridItem100>
            <p>Добавить новый тест</p>
            <BlockGridItemData>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("title", { required: "Не может быть пустым" })}
                  id="title"
                  label="Название"
                  error={errors.title}
                  helperText={errors?.title?.message && errors.title.message}
                />
                <TextField
                  {...register("attempts", {
                    required: "Не может быть пустым",
                  })}
                  id="attempts"
                  label="Коль-во попыток"
                  error={errors.attempts}
                  helperText={
                    errors?.attempts?.message && errors.attempts.message
                  }
                />
                <TextField
                  {...register("body", { required: "Не может быть пустым" })}
                  id="body"
                  label="Тело теста"
                  error={errors.body}
                  helperText={errors?.body?.message && errors.body.message}
                />
                <TextField
                  {...register("threshold_percent", { required: "Не может быть пустым" })}
                  id="threshold_percent"
                  label="Минимальный процент прохождения"
                  error={errors.body}
                  helperText={errors?.body?.message && errors.body.message}
                />
                
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Тип теста
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="who_check"
                    open={openTypeTest}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={typeTest}
                    onChange={handleChangeType}
                  >
                    <MenuItem value="AUTO">Закрытый тест</MenuItem>
                    <MenuItem value="MANUAL">Открытый тест</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Уровень вопроса
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="level"
                    open={openLevelQuestions}
                    onClose={handleCloseLevel}
                    onOpen={handleOpenLevel}
                    value={levelQuestions}
                    onChange={handleChangeLevale}
                  >
                    <MenuItem value="BLUE">Низкий уровень</MenuItem>
                    <MenuItem value="RED">Средний уровень</MenuItem>
                    <MenuItem value="BLACK">Максимальный уровень</MenuItem>
                  </Select>
                </FormControl>
                {/* <TextField
                  {...register("question_ids", { required: "номера" })}
                  id="question_ids"
                  label="Номера вопросов"
                  error={errors.question_ids}
                  helperText={
                    errors?.question_ids?.message && errors.question_ids.message
                  }
                /> */}
                {questions && (
                  <Autocomplete
                    {...register("question_ids")}
                    multiple
                    limitTags={3}
                    onChange={(event, value) => onEditorStateChange(value)}
                    id="multiple-limit-tags"
                    options={questions}
                    getOptionLabel={(option) => option.title}
                    disableCloseOnSelect
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          //   icon={icon}
                          //   checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Вопросы"
                        placeholder="Все вопросы"
                      />
                    )}
                  />
                )}

                <Button
                  variant="contained"
                  // color="primary"
                  type="submit"
                >
                  Создать тест
                </Button>
              </form>
            </BlockGridItemData>
          </BlockGridItem100>
        </div>
      </div>
    </div>
  );
};

export default AddPostTest;
