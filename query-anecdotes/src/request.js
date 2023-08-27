import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const voteNote = votedNote =>
  axios.put(`${baseUrl}/${votedNote.id}`, votedNote).then(res => res.data)