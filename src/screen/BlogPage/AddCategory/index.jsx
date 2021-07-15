import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk } from '../../../redux/thunk/blog';
import { useForm } from "react-hook-form";

const CategoryPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const blogCategory = useSelector(store => store.blog.blogCategory)

    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (localStorage.accessToken) {
            dispatch(BlogCategoryThunk())
        } else {
            history.push('/')
        }
    }, [])


    const onSubmit = async (data) => {
        if (!data) return
        await dispatch(BlogCategoryPostThunk(data.title
            // avatar.value, 
        ));
        await reset();
        await dispatch(BlogCategoryThunk());
    }


    return (
        <div className="container">
            <Menu/>
            <div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField {...register("title", { required: 'Не может быть пустым' })}
                                    id="title"
                                    label="Название"
                                    error={errors.title}
                                    helperText={errors?.title?.message&&errors.title.message} 
                                     />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            >
                            Добавить категорию
                        </Button>
                    </form>
                </div>
                
                <p>Категории</p>
                {blogCategory?.map((row) => (
                    <div>
                        {row.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryPage;
