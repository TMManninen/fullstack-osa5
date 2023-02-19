import PropTypes from 'prop-types'


const BlogForm = ({ addNewBlog, title, setTitle, author, setAuthor, url, setUrl }) => {

    BlogForm.propTypes = {
        addNewBlog: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }

    return (
        <div>
            <form onSubmit={addNewBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm