import { useState } from "react"

const CreateForm = ({ addBlog }) => {
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

  const handleAddBlog = (event) => {
    addBlog(event, newTitle, newAuthor, newUrl).then(() => {
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })
  }

  return (
    <form onSubmit={handleAddBlog}>
      <h2>create new</h2>
      <label htmlFor="title">title</label>&nbsp;<input
        value={newTitle}
        onChange={handleTitleChange}
      /><br/>
      <label htmlFor="author">author</label>&nbsp;<input
        value={newAuthor}
        onChange={handleAuthorChange}
      /><br/>
      <label htmlFor="url">url</label>&nbsp;<input
        value={newUrl}
        onChange={handleUrlChange}
      /><br/>
      <button type="submit">save</button>
    </form>   
  )
}

export default CreateForm