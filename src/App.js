import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [notification, setNotification] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    


    useEffect(() => {
        blogService
            .getAll().then(initialBlogs => {
                const sortedByLikes = initialBlogs.sort((a, b) => b.likes - a.likes)
                setBlogs(sortedByLikes)
            })
    }, [])


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = React.createRef()

    const addNewBlog = (event) => {
        event.preventDefault()

        const blogObject = {
            title: title,
            author: author,
            url: url,
            user: user.name
        }

        blogFormRef.current.toggleVisibility()

        console.log(user)

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotification(
                    `a new blog ${blogObject.title} added`
                )
                setTimeout(() => {
                    setNotification(null)
                }, 3000)
                setTitle('')
                setAuthor('')
                setUrl('')
            })
    }


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }


    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        window.location.reload()
    }


    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">
                login
            </button>
        </form>
    )

    


    const blogList = () => (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user.name} />
            )}
        </div>
    )


    return (
        <div>
            <h1>Blogs</h1>

            <Notification message={notification} />
            <Error message={errorMessage} />

            {!user && loginForm()}
            {user &&
                <div>
                <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
                <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                    <BlogForm
                        addNewBlog={addNewBlog}
                        title={title}
                        author={author}
                        url={url}
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setUrl={setUrl}
                    />
                </Togglable>
                {blogList()}
            </div>
            }
      
        </div>
    )
}

export default App