import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteNote, createAnecdote } from './request'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotificationDispatch } from './notificationContext'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch({
        type: 'SET',
        payload: 'too short anecdote, must have length 5 or more'
      })

      notificationDispatch(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const voteAnecdoteMutation = useMutation(voteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({
      type: 'SET',
      payload: `voted for "${anecdote.content}"`
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
