import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()
  const byVotes = (a, b) => b.votes - a.votes
  return (
    <div>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
