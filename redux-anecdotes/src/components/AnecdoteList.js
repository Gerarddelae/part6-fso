import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.notes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const byVotes = (a, b) => b.votes - a.votes
  const filterFunction = (word) => word.content.toLowerCase().startsWith(filter.toLowerCase())
  const anecdotesFiltered = anecdotes.filter(filterFunction)
  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(newNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(newNotification(null))
    }, 5000)
  }
  return (
    <div>
      {anecdotesFiltered.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
