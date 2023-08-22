import {   createSlice, PayloadAction } from "@reduxjs/toolkit"
import uniqid from "uniqid"
const initialState: { alerts: IError[] } = {
    alerts: [] as IError[]
}




const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        addAlert: (state, { payload }: PayloadAction<IError>) => {
            state.alerts = [...state.alerts, {...payload, id: uniqid()}]
        },
        removeAlert: (state,{payload}:PayloadAction<string>)=> {
            state.alerts = state.alerts.filter(al => al.id !== payload)
        }
    },
})
export const { addAlert, removeAlert } = alertSlice.actions
export default alertSlice.reducer
