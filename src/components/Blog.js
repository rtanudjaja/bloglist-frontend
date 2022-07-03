import { useState } from "react"

const Blog = ({ blog, addLike }) => {
  const [showHide, setShowHide] = useState(false)
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
          {!showHide ? "view" : "hide"}
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
        </div>
      )}
  </div>
)}

export default Blog