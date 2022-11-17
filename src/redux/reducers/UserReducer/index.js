import { createReducer } from "@reduxjs/toolkit"
import { userApi } from "../../../services/userApi"

const initialState = {
  users: []
}

const UserReducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    userApi.endpoints.getUsers.matchFulfilled,
    (state, action) => ({
      ...state,
      users: action.payload.data,
    })
  )
})

export default UserReducer