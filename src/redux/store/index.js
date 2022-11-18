import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { rankApi } from "../../services/rankApi";
import { statusApi } from "../../services/statusApi";
import { userApi } from "../../services/userApi";
import reducers from "../reducers";

const persistedReducer = persistReducer(
  {
    key: 'mabes',
    storage: AsyncStorage,
  },
  reducers,
)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
    .concat(userApi.middleware)
    .concat(rankApi.middleware)
    .concat(statusApi.middleware)
})

const persistor = persistStore(store)

export { store, persistor }