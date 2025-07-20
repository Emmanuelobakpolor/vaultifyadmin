import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer  from "./User/userSlice.js"
import {PERSIST, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { persistStore } from 'redux-persist';
const rootReducer = combineReducers({ 
    user:userReducer
})
const PERSIST_CONFIG = {
    key: "root",
    version : 1,
    storage
}
const persistedReducer= persistReducer(PERSIST_CONFIG, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)