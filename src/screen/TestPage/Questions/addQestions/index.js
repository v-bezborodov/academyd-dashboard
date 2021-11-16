import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk, BlogPostThunk } from '../../../../redux/thunk/blog';
import { QuestionsPostThunk } from '../../../../redux/thunk/questions';
import { useForm } from "react-hook-form";
import { BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData } from "../../../CustomerPage/index.styled";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
}));

const QuestionsPageNew = () => {
    const classes = useStyles();
    let history = useHistory()
    const dispatch = useDispatch()
    const [openTypeQuestions, setOpenTypeQuestions] = React.useState(false);
    const [typeQuestions, setTypeQuestions] = React.useState('textQuestions');
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();


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
    const [levelQuestions, setLevelQuestions] = React.useState('');


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
        if (!data) return

        const bodys = {
            "correct": data.numberCorrect,
            "questions": { "1": data.questions1, "2": data.questions2, "3": data.questions3, "4": data.questions4 },
            "type": typeQuestions,
        }

        await dispatch(QuestionsPostThunk(data.title, data.weight, data.value, levelQuestions, bodys));
        await reset();
        await dispatch(BlogCategoryThunk());
        history.push('/all-questions')
    }

    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                    <BlockGridItem33>
                        <p>Добавить новый вопрос</p>
                        <BlockGridItemData>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Тип вопроса</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="city_id"
                                        open={openTypeQuestions}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={typeQuestions}
                                        onChange={handleChangeType}
                                    >
                                        <MenuItem value="imgQuestions">Вопрос с ответами из картинок</MenuItem>
                                        <MenuItem value="textQuestions">Вопрос с ответами (текст)</MenuItem>
                                        <MenuItem value="openQuestions">Вопрос с открытым ответом</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField {...register("title", { required: 'Не может быть пустым' })}
                                    id="title"
                                    label="Текст вопроса"
                                    error={errors.title}
                                    helperText={errors?.title?.message && errors.title.message}
                                />
                                <TextField {...register("weight", { required: 'Не может быть пустым' })}
                                    id="weight"
                                    label="Цена вопроса"
                                    error={errors.weight}
                                    helperText={errors?.weight?.message && errors.weight.message}
                                />
                                <TextField {...register("time", { required: 'Не может быть пустым' })}
                                    id="time"
                                    label="Время на прохождение"
                                    error={errors.time}
                                    helperText={errors?.time?.message && errors.time.message}
                                />

                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Уровень вопроса</InputLabel>
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
                                {
                                    typeQuestions !== "openQuestions" ?
                                        <>
                                            <TextField id="questions1" label=
                                                {
                                                    typeQuestions === "imgQuestions" ?
                                                        "Изображение ответа 1"
                                                        :
                                                        typeQuestions === "textQuestions" ?
                                                            "Ответ 1"
                                                            :
                                                            <></>
                                                }
                                                {...register("questions1", { required: 'Не может быть пустым' })}
                                                error={errors.questions1}
                                                helperText={errors?.questions1?.message && errors.questions1.message}
                                            />
                                            <TextField id="questions2" label=
                                                {
                                                    typeQuestions === "imgQuestions" ?
                                                        "Изображение ответа 2"
                                                        :
                                                        typeQuestions === "textQuestions" ?
                                                            "Ответ 2"
                                                            :
                                                            <></>
                                                }
                                                {...register("questions2", { required: 'Не может быть пустым' })}
                                                error={errors.questions2}
                                                helperText={errors?.questions2?.message && errors.questions2.message}
                                            />
                                            <TextField id="questions3" label=
                                                {
                                                    typeQuestions === "imgQuestions" ?
                                                        "Изображение ответа 3"
                                                        :
                                                        typeQuestions === "textQuestions" ?
                                                            "Ответ 3"
                                                            :
                                                            <></>
                                                }
                                                {...register("questions3", { required: 'Не может быть пустым' })}
                                                error={errors.questions3}
                                                helperText={errors?.questions3?.message && errors.questions3.message}
                                            />
                                            <TextField id="questions4" label=
                                                {
                                                    typeQuestions === "imgQuestions" ?
                                                        "Изображение ответа 4"
                                                        :
                                                        typeQuestions === "textQuestions" ?
                                                            "Ответ 4"
                                                            :
                                                            <></>
                                                }
                                                {...register("questions4", { required: 'Не может быть пустым' })}
                                                error={errors.questions4}
                                                helperText={errors?.questions4?.message && errors.questions4.message}
                                            />
                                            <TextField id="numberCorrect" label=
                                                {
                                                    typeQuestions === "imgQuestions" ?
                                                        "Правильное изображение"
                                                        :
                                                        typeQuestions === "textQuestions" ?
                                                            "Правильный ответ"
                                                            :
                                                            <></>
                                                }
                                                {...register("numberCorrect", { required: 'Не может быть пустым' })}
                                                error={errors.numberCorrect}
                                                helperText={errors?.numberCorrect?.message && errors.numberCorrect.message}
                                            />
                                        </>
                                        :
                                        <></>
                                }
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    type="submit"
                                >
                                    Создать пост
                                </Button>
                            </form>
                        </BlockGridItemData>
                        </BlockGridItem33>
                </div>
            </div>
                </div>
                )
}

                export default QuestionsPageNew;
