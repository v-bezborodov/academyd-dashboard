import { Button, TextField } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk, BlogPostThunk } from '../../../redux/thunk/blog';
import { useForm } from "react-hook-form";


const AddPostPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const blogCategory = useSelector(store => store.blog.blogCategory)
    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();


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
        await dispatch(BlogPostThunk(data.title, data.body, data.img, data.time_read, is_comment));
        await reset();
        await dispatch(BlogCategoryThunk());
        history.push('/blog')
    }


    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField {...register("title", { required: 'Не может быть пустым' })}
                            id="title"
                            label="Название"
                            error={errors.title}
                            helperText={errors?.title?.message && errors.title.message}
                        />
                        <TextField {...register("body", { required: 'Не может быть пустым' })}
                            id="body"
                            label="Тело поста"
                            error={errors.body}
                            helperText={errors?.body?.message && errors.body.message}
                        />
                        <input  type="file" id="img" label="img" />
                        <TextField {...register("time_read", { required: 'Не может быть пустым' })}
                            id="time_read"
                            label="Время чтения"
                            error={errors.time_read}
                            helperText={errors?.time_read?.message && errors.time_read.message}
                        />
                        <CheckBox
                            id="is_comment"
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            checked={is_comment}
                            onChange={handleChange}
                        />
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

export default AddPostPage;
