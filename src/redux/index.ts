import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import alertSlice from "./slices/alertSlice"
import favsSlice from "./slices/favsSlice"
import courseSlice from "./slices/courseSlice"

const baseReducer = combineReducers({
    alerts: alertSlice,
    favs: favsSlice,
    courses: courseSlice
})




export const store = configureStore({
    reducer: baseReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // devTools: import.meta.env.NODE_ENV === 'development'
})


export type RootState = ReturnType<typeof store.getState> //creates the type for the store
export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
