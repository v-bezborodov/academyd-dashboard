import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import {BlockGridItem33, BlockGridItemData} from "./index.styled";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import CustomTextField from "../../../partials/inputs/text";
import {FormControl, InputLabel, MenuItem} from "@material-ui/core";
import CustomSelect from "../../../partials/inputs/select";
import CustomButton from "../../../partials/button";
import {EventPostThunk} from "../../../redux/thunk/event";

const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: 'fixed',
    },
}));

const EventForm = ({triggerUpdate}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {register, handleSubmit, watch, formState: {errors}, reset} = useForm();

    const [is_published, setIsPublished] = useState(true);

    const onSubmit = async (data) => {
        if (!data) return
        await dispatch(EventPostThunk(data));
        triggerUpdate();
        // await reset();
        // await dispatch(CityGetThunk())
    }


    return (
        <div>
            <BlockGridItem33>
                <p>Добавить мероприятие</p>
                <BlockGridItemData>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <CustomTextField {...register("title", {required: 'Не может быть пустым'})}
                                             id="title"
                                             label="Название мероприятия"
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
                                <MenuItem value={true}>Да</MenuItem>
                                <MenuItem value={false}>Нет</MenuItem>
                            </CustomSelect>
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

export default EventForm;
