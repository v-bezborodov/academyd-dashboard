import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Menu from "../../../../components/menu";
import {
  BlogCategoryPostThunk,
  BlogCategoryThunk,
  BlogPostThunk,
} from "../../../../redux/thunk/blog";
import { QuestionsPostThunk } from "../../../../redux/thunk/questions";
import { useForm } from "react-hook-form";
import {
  BlockGridItem,
  BlockGridItem100,
  BlockGridItem33,
  BlockGridItemData,
} from "../../../CustomerPage/index.styled";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const QuestionsPageNew = () => {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const [openTypeQuestions, setOpenTypeQuestions] = React.useState(false);
  const [typeQuestions, setTypeQuestions] = React.useState("textQuestions");
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    setOpenTypeQuestions(false);
  };

  const handleOpen = () => {
    setOpenTypeQuestions(true);
  };

  const handleChangeType = (event) => {
    setTypeQuestions(event.target.value);
  };

  const [openLevelQuestions, setOpenLevelQuestions] = React.useState(false);
  const [levelQuestions, setLevelQuestions] = React.useState("");

  const handleCloseLevel = () => {
    setOpenLevelQuestions(false);
  };

  const handleOpenLevel = () => {
    setOpenLevelQuestions(true);
  };

  const handleChangeLevale = (event) => {
    setLevelQuestions(event.target.value);
  };

  const onSubmit = async (data) => {

    const bodys = {
      correct: data.numberCorrect,
      questions: {
        1: data.questions1,
        2: data.questions2,
        3: data.questions3,
        4: data.questions4,
      },
    };


    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("weight", data.weight);
    formData.append("time", data.time);
    formData.append("level", levelQuestions);
    formData.append("question_body", JSON.stringify(bodys));
    formData.append("type", 'ANSWERS');
    // if (data?.questions_img1[0]) formData.append("question_body['questions'][0]", data.data?.questions_img1[0]);
    // if (data?.questions_img2[0]) formData.append("question_body['questions'][1]", data.data?.questions_img2[0]);
    // if (data?.questions_img3[0]) formData.append("question_body['questions'][2]", data.data?.questions_img3[0]);
    // if (data?.questions_img4[0]) formData.append("question_body['questions'][3]", data.data?.questions_img4[0]);
    // formData.append("question_body['type']", data.typeQuestions);

    // if (typeQuestions === "imgQuestions") {
    //   if (data.questions_img1[0])
    //     formData.append("question_body", JSON.stringify(bodysImg));
    // } else {
    //   formData.append("question_body", JSON.stringify(bodys));
    // }

    await dispatch(QuestionsPostThunk(formData));
    // await reset();
    // history.push("/all-questions");
  };

  return (
    <div className="container">
      <Menu />
      <div>
        <div>
          <BlockGridItem100>
            <p>Добавить новый вопрос</p>
            <BlockGridItemData>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Тип вопроса
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="city_id"
                    open={openTypeQuestions}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={typeQuestions}
                    onChange={handleChangeType}
                  >
                    <MenuItem value="imgQuestions">
                      Вопрос с ответами из картинок
                    </MenuItem>
                    <MenuItem value="textQuestions">
                      Вопрос с ответами (текст)
                    </MenuItem>
                    <MenuItem value="openQuestions">
                      Вопрос с открытым ответом
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  {...register("title", { required: "Не может быть пустым" })}
                  id="title"
                  label="Текст вопроса"
                  error={errors.title}
                  helperText={errors?.title?.message && errors.title.message}
                />
                <TextField
                  {...register("weight", { required: "Не может быть пустым" })}
                  id="weight"
                  label="Цена вопроса"
                  error={errors.weight}
                  helperText={errors?.weight?.message && errors.weight.message}
                />
                <TextField
                  {...register("time", { required: "Не может быть пустым" })}
                  id="time"
                  label="Время на прохождение"
                  error={errors.time}
                  helperText={errors?.time?.message && errors.time.message}
                />

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
                {typeQuestions !== "openQuestions" ? (
                  <>
                    {typeQuestions === "textQuestions" ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                          gap: "25px",
                        }}
                      >
                        <TextField
                          id="questions1"
                          label={"Ответ 1"}
                          {...register("questions1", {
                            required: "Не может быть пустым",
                          })}
                          error={errors.questions1}
                          helperText={
                            errors?.questions1?.message &&
                            errors.questions1.message
                          }
                        />
                        <TextField
                          id="questions2"
                          label={"Ответ 2"}
                          {...register("questions2", {
                            required: "Не может быть пустым",
                          })}
                          error={errors.questions2}
                          helperText={
                            errors?.questions2?.message &&
                            errors.questions2.message
                          }
                        />
                        <TextField
                          id="questions3"
                          label={"Ответ 3"}
                          {...register("questions3", {
                            required: "Не может быть пустым",
                          })}
                          error={errors.questions3}
                          helperText={
                            errors?.questions3?.message &&
                            errors.questions3.message
                          }
                        />
                        <TextField
                          id="questions4"
                          label={"Ответ 4"}
                          {...register("questions4", {
                            required: "Не может быть пустым",
                          })}
                          error={errors.questions4}
                          helperText={
                            errors?.questions4?.message &&
                            errors.questions4.message
                          }
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                          gap: "25px",
                        }}
                      >
                        <FormControl>
                          <input
                            {...register("questions_img1")}
                            accept="image/*"
                            style={{ display: "none" }}
                            id="img"
                            type="file"
                          />
                          <label htmlFor="img">
                            <Button variant="contained" component="span">
                              Загрузить 1 ответ
                            </Button>
                          </label>
                        </FormControl>

                        <FormControl>
                          <input
                            {...register("questions_img2")}
                            accept="image/*"
                            style={{ display: "none" }}
                            id="img"
                            type="file"
                          />
                          <label htmlFor="img">
                            <Button variant="contained" component="span">
                              Загрузить 2 ответ
                            </Button>
                          </label>
                        </FormControl>

                        <FormControl>
                          <input
                            {...register("questions_img3")}
                            accept="image/*"
                            style={{ display: "none" }}
                            id="img"
                            type="file"
                          />
                          <label htmlFor="img">
                            <Button variant="contained" component="span">
                              Загрузить 3 ответ
                            </Button>
                          </label>
                        </FormControl>

                        <FormControl>
                          <input
                            {...register("questions_img4")}
                            accept="image/*"
                            style={{ display: "none" }}
                            id="img"
                            type="file"
                          />
                          <label htmlFor="img">
                            <Button variant="contained" component="span">
                              Загрузить 4 ответ
                            </Button>
                          </label>
                        </FormControl>
                      </div>
                    )}
                    <TextField
                      id="numberCorrect"
                      label={
                        typeQuestions === "imgQuestions" ? (
                          "Правильное изображение"
                        ) : typeQuestions === "textQuestions" ? (
                          "Правильный ответ"
                        ) : (
                          <></>
                        )
                      }
                      {...register("numberCorrect", {
                        required: "Не может быть пустым",
                      })}
                      error={errors.numberCorrect}
                      helperText={
                        errors?.numberCorrect?.message &&
                        errors.numberCorrect.message
                      }
                    />
                  </>
                ) : (
                  <></>
                )}
                <Button
                  variant="contained"
                  // color="primary"
                  type="submit"
                >
                  Создать вопрос
                </Button>
              </form>
            </BlockGridItemData>
          </BlockGridItem100>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPageNew;
