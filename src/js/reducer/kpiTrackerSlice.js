import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { createWorkPage } from "./actionType";

const initialState = {
  initialWorkPackage: [],
  workPackage: [],
  headersOn: [],
};

export const kpiTrackerSlice = createSlice({
  name: createWorkPage,
  initialState: initialState,
  reducers: {
    addInitialWorkPackage: (state, action) => {
      let copyInitialWorkPackage = [...state.workPackage];
      state.initialWorkPackage = action.payload;
      action.payload.forEach((element) => {
        copyInitialWorkPackage.push(element);
      });

      //   copyInitialWorkPackage.push(action.payload);
      state.workPackage = copyInitialWorkPackage;
    },
    loadWorkPackage: (state, action) => {
      state.initialWorkPackage += action.payload;
    },
    uploadDailyReport: (state, action) => {
      state.headersOn = action.payload;
    },
    updateWorkPackageRow: (state, action) => {
      let creatWorkPackageCopy = [...state.workPackage];
      creatWorkPackageCopy[action.payload.id] = action.payload;
      state.workPackage = creatWorkPackageCopy;
    },
    updateHeadersOnRow: (state, action) => {
      let createHeadersOnCopy = [...state.headersOn];
      createHeadersOnCopy[action.payload.id] = action.payload;
      state.headersOn = createHeadersOnCopy;
    },
    updateHeadersOnStatus:(state,action)=>{
      let copyCurrentHeadersOn = [...state.headersOn]
      let copyWorkPackage = [...state.workPackage]

      
      action.payload.ids.map((id)=>{
        
        let toChange = copyCurrentHeadersOn[id]
        toChange['status'] = action.payload.status
        toChange['Coder'] = action.payload.coder
        toChange['Date_Sent'] = action.payload.dateSent
        copyCurrentHeadersOn[id] = toChange

        state.headersOn[id] = toChange

        copyWorkPackage.forEach(i => {
      if( i.Asset_ID === toChange.Asset_ID)
      {
        i['Sent_for_Coding'] = action.payload.dateSent;
        i['Coder'] = action.payload.coder;

      }
      
      } )
      })
      
state.workPackage = copyWorkPackage
    }
  },
});

export const {
  addInitialWorkPackage,
  uploadDailyReport,
  loadWorkPackage,
  updateWorkPackageRow,
  updateHeadersOnStatus,
  updateHeadersOnRow
} = kpiTrackerSlice.actions;

export default kpiTrackerSlice.reducer;
