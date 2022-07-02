import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from "./components/Notification";
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event, newTitle, newAuthor, newUrl) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }

    return blogService.create(blogObject)
      .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
      .then(() => {
        setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage(`fail to add blog`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <>
        <Login setUser={setUser} setSuccessMessage={setSuccessMessage}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} msgStyle={"success"} />
      <Notification message={errorMessage} msgStyle={"error"} />
      <p>{user.name} logged in&nbsp;<button type="button" onClick={() => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
      }}>logout</button></p>
      <CreateForm addBlog={addBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
