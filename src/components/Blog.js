import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, remove }) => {
  const [showHide, setShowHide] = useState(false)
  const loggedUsername = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username || null
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}&nbsp;
        <button type="button" onClick={() => setShowHide(!showHide)}>
          {!showHide ? 'view' : 'hide'}
        </button>
      </span>
      {showHide && (
        <div>
          <span>{blog.url}</span><br/>
          <span>likes {blog.likes}&nbsp;</span>
          <button type="button" onClick={() => addLike(blog)}>
            like
          </button><br/>
          <span>{blog.author}</span><br/>
          {blog.user.username === loggedUsername && (
            <button type="button" style={{ backgroundColor: 'tomato' }} onClick={() => {
              if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                remove(blog)
              }
            }}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Blog