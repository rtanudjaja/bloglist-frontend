import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  if (user === null) {
    return (
      <>
        <Login setUser={setUser} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in&nbsp;<button type="button" onClick={() => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
      }}>logout</button></p>
      <CreateForm blogs={blogs} setBlogs={setBlogs} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
