import { useState } from "react"
import blogService from '../services/blogs'

const CreateForm = ({ blogs, setBlogs }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <label for="title">title</label>&nbsp;<input
        value={newTitle}
        onChange={handleTitleChange}
      /><br/>
      <label for="author">author</label>&nbsp;<input
        value={newAuthor}
        onChange={handleAuthorChange}
      /><br/>
      <label for="url">url</label>&nbsp;<input
        value={newUrl}
        onChange={handleUrlChange}
      /><br/>
      <button type="submit">save</button>
    </form>   
  )
}

export default CreateForm