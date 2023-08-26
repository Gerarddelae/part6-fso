import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { updateVotes } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const voteHandler = () => {
    dispatch(updateVotes(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  return (
  <div>
      <div>
          {anecdote.content}
      </div>
      <div>
          has {anecdote.votes}
          <button onClick={voteHandler}>vote</button>
      </div>
  </div>
  )
}

export const AnecdoteList = () => {  
const anecdotes = useSelector(({filter, anecdote}) => {
  if ( filter === null ) {
    return anecdote
  }
  const regex = new RegExp( filter, 'i' )
  return anecdote.filter(anecdote => anecdote.content.match(regex))
})
const byVotes = (b1, b2) => b2.votes - b1.votes
const anecdotesToShow = [...anecdotes]
return(
  anecdotesToShow.sort(byVotes).map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)
)
}


