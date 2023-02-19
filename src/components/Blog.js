import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {

    const [info, setInfo] = useState(false)
    const [likes, setLikes] = useState(blog.likes)


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = async (blog) => {
        const blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: (blog.likes + 1),
            user: blog.user
        }
        await blogService.update(blog.id, blogObject)
        setLikes(likes + 1)
    }


    const handleRemove = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            await blogService.deleteBlog(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }
    }


    return (
        <div style={blogStyle}>
            {info ?
                <div className='visible'>
                    <p>{blog.title} {blog.author} <button onClick={() => setInfo(false)} > hide</button></p>
                    <p>{blog.url}</p>
                    <p>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
                    <p>{user}</p>
                    <button onClick={() => handleRemove(blog)}>remove</button>
                     </div>
                :
                <div className='hidden'>
                    <p>{blog.title} {blog.author} <button onClick={() => setInfo(true)} > view</button></p>
                    </div>}
                </div>
    )
}

export default Blog