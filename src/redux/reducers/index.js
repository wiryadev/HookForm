import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../../services/baseApi";
import RankReducer from "./RankReducer";
import StatusReducer from "./StatusReducer";
import UserReducer from "./UserReducer";

const reducers = combineReducers({
  api: baseApi.reducer,
  user: UserReducer,
  rank: RankReducer,
  status: StatusReducer,
})

export default reducers
