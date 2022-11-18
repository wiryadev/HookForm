import { createReducer } from "@reduxjs/toolkit"
import { statusApi } from "../../../services/statusApi"

const initialState = {
    statuses: []
}

const StatusReducer = createReducer(initialState, (builder) => {
    builder.addMatcher(
        statusApi.endpoints.getStatuses.matchFulfilled,
        (state, action) => {
            console.log('StatusReducer', action.payload.data)
            return {
                ...state,
                statuses: action.payload.data,
            }
        }
    )
})

export default StatusReducer