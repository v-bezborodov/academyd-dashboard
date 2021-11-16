import React, {useEffect, useState} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import {BlockGridItem33, BlockGridItemData} from "./index.styled";
import {useForm} from "react-hook-form";
import CustomTextField from "../../../../partials/inputs/text";
import {Button, FormControl, InputLabel, MenuItem} from "@material-ui/core";
import CustomSelect from "../../../../partials/inputs/select";
import CustomButton from "../../../../partials/button";
import { EventShowThunk, EventUpdateThunk} from "../../../../redux/thunk/event";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
    img: {
        width: '50px',
        height: 'auto'
    },
}));

const EventEditForm = () => {

    let {id} = useParams();
    const classes = useStyles();
    const {register, handleSubmit, watch, formState: {errors}, setValue} = useForm();
    const [img, setImg] = useState('/img/template/no-image.png');
    const [is_published, setIsPublished] = useState(false);

    useEffect(() => {
        getDataEvents()
    }, [])

    const getDataEvents = () => {
       EventShowThunk(id, getDataCallback);
    }

    const getDataCallback = (data) => {
        if (!data) return
        setValue('title', data.title);
        setValue('body', data.body);
        setValue('address', data.address);
        setValue('max_attendee', data.max_attendee);
        setValue('is_published', data.is_published)
        setIsPublished(data.is_published)
        setImg(data.img_public);
    }

    const onSubmit = async (data) => {
        if (!data) return

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('body', data.body);
        formData.append('address', data.address);
        formData.append('max_attendee', data.max_attendee);
        if (data.img[0]) formData.append('img', data.img[0]);
        formData.append('is_published', data.is_published?1:0);

        EventUpdateThunk(formData, id);
    }

    const handleIsPublished= (event) => {
        if (!event) return
        setIsPublished(event.target.value);
        setValue('is_published', event.target.value)
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
                            <CustomTextField inputProps={register("body", {required: 'Не может быть пустым'})}
                                             id="body"
                                             placeholder="Описание"
                                             error={errors.body}
                                             helperText={errors?.body?.message && errors.body.message}/>
                        </FormControl>
                        <FormControl>
                            <CustomTextField inputProps={register("address", {required: 'Не может быть пустым'})}
                                             id="address"
                                             placeholder="Адрес"
                                             error={errors.address}
                                             helperText={errors?.address?.message && errors.address.message}/>
                        </FormControl>
                        <FormControl>
                            <CustomTextField inputProps={register("max_attendee", {required: 'Не может быть пустым'})}
                                             id="max_attendee"
                                             placeholder="Кол-во участников"
                                             error={errors.max_attendee}
                                             helperText={errors?.max_attendee?.message && errors.max_attendee.message}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="is_published-label">Опубликован</InputLabel>
                            <CustomSelect
                                inputProps={register("is_published")}
                                labelId="is_published-label"
                                name="is_published"
                                id="is_published"
                                value={is_published}
                                onChange={e=>handleIsPublished(e)}
                                error={!!errors.is_published}
                            >
                                <MenuItem value={true}>Да</MenuItem>
                                <MenuItem value={false}>Нет</MenuItem>
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

                            {img ?
                                <a href={img}>
                                    <img className={classes.img} src={process.env.REACT_APP_BASE_URL + img}/></a>
                                :
                                <img className={classes.img} src="/img/template/no-image.png"/>
                            }
                        </FormControl>

                        <FormControl>
                            <CustomButton
                                variant="contained"
                                // color="primary"
                                type="submit"
                            >
                                Сохранить мероприятие
                            </CustomButton>
                        </FormControl>
                    </form>
                </BlockGridItemData>
            </BlockGridItem33>
        </div>
    )
}

export default EventEditForm;
