import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    likes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      return state.concat({
        content
      })
    },
    vote(state, action) {
      const id = action.payload
      const voteAnecdote = state.find((n) => n.id === id)
      const updatedVotes = { ...voteAnecdote, votes: voteAnecdote.votes + 1 }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedVotes
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// const reducer = (state = initialState, action) => {

//   switch (action.type) {
//     case "NEW_ANECDOTE":
//       return state.concat(action.data)
//     case "VOTE": {
//       const id = action.data.id
//       const voteAnecdote = state.find((n) => n.id === id)
//       const updatedVotes = { ...voteAnecdote, votes: voteAnecdote.votes + 1 }
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : updatedVotes
//       )
//     }
//     default:
//       return state
//   }
// }

// export const vote = (id) => {
//   return {
//     type: "VOTE",
//     data: { id },
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: "NEW_ANECDOTE",
//     data: {
//       content: anecdote,
//       id: getId(),
//       votes: 0,
//     },
//   }
// }

export const { newAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVotes = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(vote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
