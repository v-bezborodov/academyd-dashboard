import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk } from '../../../redux/thunk/blog';
import { useForm } from "react-hook-form";
import CategoryPageTable from './table';
import { BlockGridItem, BlockGridItem100, BlockGridItem33, BlockGridItemData } from "../../CustomerPage/index.styled";

const CategoryPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const blogCategory = useSelector(store => store.blog.blogCategory)

    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm();

    useEffect(() => {
        dispatch(BlogCategoryThunk())
    }, [])


    const onSubmit = async (data) => {
        if (!data) return
        const formData = new FormData();
            formData.append('title', data.title);
            formData.append('img', data.img);

        await dispatch(BlogCategoryPostThunk(formData));
        await reset();
        await dispatch(BlogCategoryThunk());
    }


    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                <BlockGridItem33>
                <p>Добавить новую категорию</p>
                        <BlockGridItemData>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField {...register("title", { required: 'Не может быть пустым' })}
                            id="title"
                            label="Название"
                            error={errors.title}
                            helperText={errors?.title?.message && errors.title.message}
                        />
                        <TextField {...register("img", { required: 'Не может быть пустым' })}
                            id="img"
                            label="Ссылка на изображение"
                            error={errors.img}
                            helperText={errors?.img?.message && errors.img.message}
                        />
                        {/* <input {...register("img")} type="file" name="img" /> */}
                        <Button
                            variant="contained"
                            // color="primary"
                            type="submit"
                        >
                            Добавить категорию
                        </Button>
                    </form>
                    </BlockGridItemData>
                </BlockGridItem33>
                </div>

                <p>Категории</p>
                <CategoryPageTable data={blogCategory}/>
            </div>
        </div>
    )
}

export default CategoryPage;
