import { Button, FormControl, InputLabel,makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk, BlogPostThunk } from '../../../redux/thunk/blog';
import { useForm } from "react-hook-form";
import { TestsPostThunk } from '../../../redux/thunk/tests';
import { BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData } from "../../CustomerPage/index.styled";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
}));

const AddPostTest = () => {
    const classes = useStyles();
    let history = useHistory()
    const dispatch = useDispatch()
    const blogCategory = useSelector(store => store.blog.blogCategory)
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const [openTypeTest, setOpenTypeTest] = React.useState(false);
    const [typeTest, setTypeTest] = React.useState('');
    
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


    useEffect(() => {
        if (localStorage.accessToken) {
            // dispatch(BlogCategoryThunk())
        } else {
            history.push('/')
        }
    }, [])

    const [is_comment, setIs_comment] = React.useState(true);

    const handleChange = (event) => {
        setIs_comment(event.target.checked);
    };


    const onSubmit = async (data) => {
        if (!data) return

        const question_ids = [
            data.question_ids,
        ]

        await dispatch(TestsPostThunk(data.title, data.attempts, data.body, typeTest, levelQuestions, question_ids));
        await reset();
        history.push('/all-test')
    }


    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                <BlockGridItem33>
                        <p>Добавить новый тест</p>
                        <BlockGridItemData>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField {...register("title", { required: 'Не может быть пустым' })}
                            id="title"
                            label="Название"
                            error={errors.title}
                            helperText={errors?.title?.message && errors.title.message}
                        />
                        <TextField {...register("attempts", { required: 'Не может быть пустым' })}
                            id="attempts"
                            label="Коль-во попыток"
                            error={errors.attempts}
                            helperText={errors?.attempts?.message && errors.attempts.message}
                        />
                        <TextField {...register("body", { required: 'Не может быть пустым' })}
                            id="body"
                            label="Тело теста"
                            error={errors.body}
                            helperText={errors?.body?.message && errors.body.message}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Тип теста</InputLabel>
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
                        <TextField {...register("question_ids", { required: 'номера' })}
                            id="question_ids"
                            label="Номера вопросов"
                            error={errors.question_ids}
                            helperText={errors?.question_ids?.message && errors.question_ids.message}
                        />
                        <Button
                            variant="contained"
                            color="primary"
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

export default AddPostTest;
