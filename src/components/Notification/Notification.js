export const Notification = ({ message, msgStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${msgStyle}`}>
      {message}
    </div>
  )
}