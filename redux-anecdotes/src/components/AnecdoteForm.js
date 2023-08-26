import { useDispatch } from "react-redux"
import { newAnecdote, appendAnecdote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newcontent = await anecdoteService.createNew(content)
    dispatch(newAnecdote(content))
    dispatch(appendAnecdote(newcontent))
    dispatch(newNotification(`created new anecdote`))
    setTimeout(() => {
      dispatch(newNotification(null))
    }, 5000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
