import { configureStore } from "@reduxjs/toolkit";
import kpiTrackerSlice from "../reducer/kpiTrackerSlice";
export const store = configureStore({
    reducer:
    {
        kpiTracker:kpiTrackerSlice
    }
})