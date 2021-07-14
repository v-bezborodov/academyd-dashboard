import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk, BlogPostThunk } from '../../../../redux/thunk/blog';
import { QuestionsPostThunk } from '../../../../redux/thunk/questions';

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
    const [typeQuestions, setTypeQuestions] = React.useState('');


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


    useEffect(() => {
        if (localStorage.accessToken) {
            // dispatch(BlogCategoryThunk())
        } else {
            history.push('/')
        }
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault()

        const { weight, time, numberCorrect, questions1, questions2, questions3, questions4 } = event.target.elements

        if(!numberCorrect || !numberCorrect.value){
            return
        }

        const bodys = {
            "correct": numberCorrect.value, 
            "questions": {"1": questions1.value, "2": questions2.value, "3": questions3.value, "4": questions4.value},
            "type" : typeQuestions,
        }

        dispatch(QuestionsPostThunk(
            weight.value,
            time.value,
            levelQuestions,
            bodys
        ));

    }

    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                    <form onSubmit={handleSubmit}>

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


                        <TextField id="weight" label="Цена вопроса" />
                        <TextField id="time" label="Время на прохождение вопроса" />

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
                            typeQuestions === "imgQuestions" ?
                                <>
                                        <TextField id="questions1" label="Изображение ответа 1" />
                                        <TextField id="questions2" label="Изображение ответа 2" />
                                        <TextField id="questions3" label="Изображение ответа 3" />
                                        <TextField id="questions4" label="Изображение ответа 4" />
                                    <TextField id="numberCorrect" label="Номер правильного ответа" />
                                </>
                                :
                                typeQuestions === "textQuestions" ?
                                    <>
                                        <TextField id="questions1" label="Ответ 1" />
                                        <TextField id="questions2" label="Ответ 2" />
                                        <TextField id="questions3" label="Ответ 3" />
                                        <TextField id="questions4" label="Ответ 4" />
                                        <TextField id="numberCorrect" label="Номер правильного ответа" />
                                    </>
                                    :
                                    <>
                                        <p>Ответ будет открытый в поле ввода</p>
                                    </>
                        }
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Создать пост
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default QuestionsPageNew;
