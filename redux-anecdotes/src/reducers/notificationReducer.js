import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    }
  }
})

export const { newNotification } = notificationSlice.actions

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch(newNotification(notification))

    setTimeout(() => {
      dispatch(newNotification(null))
    }, displayTime * 1000)
  }
}



export default notificationSlice.reducer
