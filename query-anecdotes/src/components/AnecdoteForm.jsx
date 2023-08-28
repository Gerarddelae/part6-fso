import { useNotificationDispatch } from "../notificationContext"

const AnecdoteForm = ({newAnecdoteMutation}) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const notificationDispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})
    notificationDispatch({
      type: 'SET',
      payload: `created note "${content}"`
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
