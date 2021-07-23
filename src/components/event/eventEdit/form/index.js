import React, {useEffect, useState} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import {BlockGridItem33, BlockGridItemData} from "./index.styled";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import CustomTextField from "../../../../partials/inputs/text";
import {Button, FormControl, InputLabel, MenuItem, TextField} from "@material-ui/core";
import CustomSelect from "../../../../partials/inputs/select";
import CustomButton from "../../../../partials/button";
import {EventGetThunk, EventPostThunk, EventShowThunk} from "../../../../redux/thunk/event";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
}));

const EventEditForm = () => {

    let {id} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch()
    const {register, handleSubmit, watch, formState: {errors}, reset, setValue} = useForm();
    const [data, setData] = useState({});

    const [is_published, setIsPublished] = useState(true);

    useEffect(() => {
        getDataEvents()
    }, [])

    const getDataEvents = () => {
        dispatch(EventShowThunk(id, getDataCallback))
    }

    const getDataCallback = (data) => {
        console.log('data', data)
        if (!data) return
        // setData(data);
        setValue('title', data.title);
    }

    const onSubmit = async (data) => {

        // console.log('post events', data)
        // if (!data) return
        //
        // const formData = new FormData();
        // formData.append('title', data.title);
        // formData.append('body', data.body);
        // formData.append('address', data.address);
        // formData.append('max_attendee', data.max_attendee);
        // if (data.img[0]) formData.append('img', data.img[0]);
        // formData.append('is_published', JSON.stringify(data.is_published));
        //
        // await dispatch(EventPostThunk(formData));

        // triggerUpdate();
        // await reset();
        // await dispatch(CityGetThunk())
    }


    return (
        <div>
            <BlockGridItem33>
                <p>Редактировать мероприятие {id}</p>
                <BlockGridItemData>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <CustomTextField inputProps={register("title", {required: 'Не может быть пустым'})}
                                             id="title"
                                             name="title"
                                             placeholder="Название мероприятия"
                                             error={errors.title}
                                             helperText={errors?.title?.message && errors.title.message}/>
                        </FormControl>
                        <FormControl>
                            <CustomTextField {...register("body", {required: 'Не может быть пустым'})}
                                             id="body"
                                             label="Описание"
                                             error={errors.body}
                                             helperText={errors?.body?.message && errors.body.message}/>
                        </FormControl>
                        <FormControl>
                            <CustomTextField {...register("address", {required: 'Не может быть пустым'})}
                                             id="address"
                                             label="Адрес"
                                             error={errors.address}
                                             helperText={errors?.address?.message && errors.address.message}/>
                        </FormControl>
                        <FormControl>
                            <CustomTextField {...register("max_attendee", {required: 'Не может быть пустым'})}
                                             id="max_attendee"
                                             label="Кол-во участников"
                                             error={errors.max_attendee}
                                             helperText={errors?.max_attendee?.message && errors.max_attendee.message}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="is_published-label">Опубликован</InputLabel>
                            <CustomSelect
                                inputProps={register("is_published", {required: 'Не может быть пустым'})}
                                labelId="is_published-label"
                                name="is_published"
                                id="is_published"
                                value={is_published}
                                onChange={event => setIsPublished(event.target.value)}
                                error={!!errors.is_published}
                            >
                                <MenuItem value="true">Да</MenuItem>
                                <MenuItem value="false">Нет</MenuItem>
                            </CustomSelect>
                        </FormControl>

                        <FormControl>
                            <input
                                {...register("img")}
                                accept="image/*"
                                style={{display: 'none'}}
                                id="img"
                                type="file"
                            />
                            <label htmlFor="img">
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>

                            {/*{avatar ?*/}
                            {/*    <a href={avatar}>*/}
                            {/*        <img className={classes.table_img} src={process.env.REACT_APP_BASE_URL + avatar}/></a>*/}
                            {/*    :*/}
                            {/*    <img className={classes.table_img} src="/img/template/no-image.png"/>*/}
                            {/*}*/}
                        </FormControl>

                        <FormControl>
                            <CustomButton
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Добавить мероприятие
                            </CustomButton>
                        </FormControl>
                    </form>
                </BlockGridItemData>
            </BlockGridItem33>
        </div>
    )
}

export default EventEditForm;
