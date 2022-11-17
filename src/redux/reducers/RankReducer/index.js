import { createReducer } from "@reduxjs/toolkit"
import { rankApi } from "../../../services/rankApi"

const initialState = {
  ranks: []
}

const RankReducer = createReducer(initialState, (builder) => {
  builder.addMatcher(
    rankApi.endpoints.getRanks.matchFulfilled,
    (state, action) => {
      console.log('RankReducer', action.payload.data)
      return {
        ...state,
        ranks: action.payload.data,
      }
    }
  )
})

export default RankReducer