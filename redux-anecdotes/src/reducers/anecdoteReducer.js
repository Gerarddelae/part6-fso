import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
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
        content,
        id: getId(),
        votes: 0
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
export default anecdoteSlice.reducer
