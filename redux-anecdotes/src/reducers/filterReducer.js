import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.filter
//     default:
//       return state
//   }
// }

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     filter
//   }
// }

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer

