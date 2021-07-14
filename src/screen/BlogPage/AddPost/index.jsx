import { Button, TextField } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu';
import { BlogCategoryPostThunk, BlogCategoryThunk, BlogPostThunk } from '../../../redux/thunk/blog';


const AddPostPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const blogCategory = useSelector(store => store.blog.blogCategory)

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

    const handleSubmit = (event) => {
        event.preventDefault()

        const { title, body, img, time_read, 
        } = event.target.elements
        alert(img.files[0].name,)
        dispatch(BlogPostThunk(
            title.value, body.value,
            img.files[0],
            time_read.value, 
            is_comment,
        ));

    }

    return (
        <div className="container">
            <Menu />
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField id="title" label="Название" />
                        <TextField id="body" label="Тело поста" />
                        <input type="file" id="img" label="img" />
                        <TextField id="time_read" label="Время чтения" />
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
