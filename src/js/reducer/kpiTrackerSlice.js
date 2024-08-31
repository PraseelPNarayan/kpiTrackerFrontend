import { createSlice } from "@reduxjs/toolkit";
import { createWorkPage, createAwaitingFootage } from "./actionType";

const initialState={
    workPackage:[],
    headersOn:[]
}

export const kpiTrackerSlice = createSlice({
name: createWorkPage,
initialState: initialState,
reducers:{
addWorkPackage:(state,action)=>{

    state.workPackage = action.payload

},
loadWorkPackage:(state, action)=>{
    state.workPackage += action.payload
}
}})

export const {addWorkPackage} = kpiTrackerSlice.actions
export default kpiTrackerSlice.reducer