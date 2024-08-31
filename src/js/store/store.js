import { configureStore } from "@reduxjs/toolkit";
import kpiTrackerReducer from '../reducer/kpiTrackerSlice'
export const store = configureStore({
    reducer:
    {
        kpiTracker:kpiTrackerReducer
    }
})