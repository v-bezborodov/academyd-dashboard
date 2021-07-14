import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Menu from "../../components/menu";
import { BlogCategoryThunk, BlogGetThunk } from '../../redux/thunk/blog';


const BlogPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const blog = useSelector(store => store.blog.blog)
    const blogCategory = useSelector(store => store.blog.blogCategory)

    useEffect(() => {
        if(localStorage.accessToken){
            dispatch(BlogGetThunk())
            dispatch(BlogCategoryThunk())
        }else {
            history.push('/')
        }
    }, [])

    return (
        <div className="container">
            <Menu/>
            <div>
            <p>Категории</p>
                {blogCategory?.map((row) => (
                    <div>
                        <img src={row.img_public}/>
                        {row.title}
                        {row.body}
                    </div>
                    ))}
                <p>Блог</p>
                {blog?.map((row) => (
                    <div>
                        <img src={row.img_public}/>
                        {row.title}
                        {row.body}
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default BlogPage;
