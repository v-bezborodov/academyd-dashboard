import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk } from '../../../redux/thunk/blog';


const CategoryPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const blogCategory = useSelector(store => store.blog.blogCategory)

    useEffect(() => {
        if (localStorage.accessToken) {
            dispatch(BlogCategoryThunk())
        } else {
            history.push('/')
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const { title,
            // avatar, 
        } = event.target.elements
        dispatch(BlogCategoryPostThunk(title.value
            // avatar.value, 
        ));
        
        dispatch(BlogCategoryThunk())
    }

    return (
        <div className="container">
            <Menu/>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField id="title" label="Название" />
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
