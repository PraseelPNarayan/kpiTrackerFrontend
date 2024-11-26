import { createSlice } from "@reduxjs/toolkit";
import { createWorkPage } from "../actions/actionType";
import Api from "../api/apiService";

import moment from "moment/moment";
import ActionType from "../actions/actionType";

const initialState = {
  initialWorkPackage: [],
  workPackage: [],
  headersOn: [],
  toggleSpinner: false,
  error: false,
  errorMessage: "",
  success: false,
  putSuccess: false,
  putErrorMessage: "",
  coders: [],
  status: "idel",
  missingWorkPackages: [],
  coderToUpdate: {},
  users:[],
  userToUpdate: {},
  loggedInStaff: {},

};

export const kpiTrackerSlice = createSlice({
  name: ActionType.createWorkPage,
  initialState: initialState,
  reducers: {
    updateSuccessFlag: (state, action) => {
      state.success = !state.success;
    },
    updatePutSuccessFlag: (state, action) => {
      state.putSuccess = !state.putSuccess;
    },
    updateErrorFlag: (state, action) => {
      state.error = action.payload;
    },
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
      state.headersOn.forEach((m) => {
        let dateOfInsp = m.Date_of_Inspection + "00:00:00";
        m.Date_of_Inspection = moment(dateOfInsp, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
      });
    },
    updateMissingWP: (state, action) => {
      state.missingWorkPackages = null;
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
    // updateHeadersOnStatus: (state, action) => {
    //   let copyCurrentHeadersOn = [...state.headersOn];
    //   let copyWorkPackage = [...state.workPackage];

    //   action.payload.ids.map((id) => {
    //     let toChange = copyCurrentHeadersOn[id];
    //     toChange["status"] = action.payload.status;
    //     toChange["Coder"] = action.payload.coder;
    //     toChange["Date_Sent"] = action.payload.dateSent;
    //     copyCurrentHeadersOn[id] = toChange;

    //     state.headersOn[id] = toChange;

    //     copyWorkPackage.forEach((i) => {
    //       if (i.Asset_ID === toChange.Asset_ID) {
    //         i["Sent_for_Coding"] = action.payload.dateSent;
    //         i["Coder"] = action.payload.coder;
    //       }
    //     });
    //   });

    //   state.workPackage = copyWorkPackage;
    // },
    updateCoder: (state, action) => {
      state.coderToUpdate = action.payload;
    },
    updateStaff: (state, action) => {
      state.userToUpdate = action.payload;
    },
    loginStaff: (state,action) =>{
      state.loggedInStaff = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Api.postCreateHeadersOn.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.postCreateHeadersOn.fulfilled, (state, action) => {
        state.status = "succeeded";
        // let copyCurrentState = [...state.headersOn]
        // copyCurrentState.push(action.payload);
        state.headersOn = action.payload;
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.postCreateHeadersOn.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })
      .addCase(Api.getAllHeadersOn.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.getAllHeadersOn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.headersOn = action.payload;
        state.toggleSpinner = false;
      })
      .addCase(Api.getAllHeadersOn.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })
      .addCase(Api.putHeadersOn.pending, (state) => {
        state.status = "pending";
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.putHeadersOn.fulfilled, (state, action) => {
        state.status = "succeeded";
       let index = state.headersOn.findIndex(x => x.id === action.payload.id)
       state.headersOn[index] = action.payload
        state.putSuccess = true;
      })
      .addCase(Api.putHeadersOn.rejected, (state, action) => {
        state.status = "failed";
        state.putErrorMessage = action.error.message;
        state.putSuccess = false;
      })
      .addCase(Api.putHeadersOnBatch.pending, (state) => {
        state.success = "pending";
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.putHeadersOnBatch.fulfilled, (state, action) => {
        state.status = "succeeded";
        // action.payload.forEach(headersOn => {
        //   let index = state.headersOn.findIndex(x => x.id === headersOn.id)

        //   state.headersOn[index] = headersOn;

        // })
        state.missingWorkPackages = action.payload;
        state.success = true;
      })
      .addCase(Api.putHeadersOnBatch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.success = false;
        state.error = true;
      })
      .addCase(Api.putHeadersOnBatchEntries.pending, (state) => {
        state.success = "pending";
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.putHeadersOnBatchEntries.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.forEach(response => {
          let index = state.headersOn.findIndex(x => x.id === response.id)

          state.headersOn[index] = response;

        })
    
        state.success = true;
      })
      .addCase(Api.putHeadersOnBatchEntries.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.success = false;
        state.error = true;
      })
      .addCase(Api.getAllCoders.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.getAllCoders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coders = action.payload;
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.getAllCoders.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })
      .addCase(Api.getAllWorkpackages.pending, (state,action) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.getAllWorkpackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workPackage=action.payload;
        state.toggleSpinner = false;
      })
      .addCase(Api.getAllWorkpackages.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.error = true;
        state.toggleSpinner = false;
      })
      .addCase(Api.postCreateWorkpackages.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.postCreateWorkpackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        // let copyCurrentState = [...state.headersOn]
        // copyCurrentState.push(action.payload);
        // state.workPackage.push(action.payload);
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.postCreateWorkpackages.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })
      .addCase(Api.createCoder.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.createCoder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coders.push(action.payload);
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.createCoder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })
      .addCase(Api.updateCoder.pending, (state) => {
        state.status = "pending";
        state.error = false;
        state.errorMessage = null;

        state.toggleSpinner = true;
      })
      .addCase(Api.updateCoder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
        state.toggleSpinner = false;
        let index = state.coders.findIndex((x) => x.id === action.payload.id);

        state.coders[index] = action.payload;

      })
      .addCase(Api.updateCoder.rejected, (state, action) => {
        state.status = "failed";
        state.putErrorMessage = action.error.message;
        state.success = false;
        state.error = true;
      })
      .addCase(Api.getAllUsers.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })
      .addCase(Api.updateUser.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
        state.toggleSpinner = false;
        let index = state.users.findIndex((x) => x.id === action.payload.id);
        state.users[index] = action.payload;

      })
      .addCase(Api.updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.putErrorMessage = action.error.message;
        state.success = false;
        state.error = true;
        state.toggleSpinner = false;
      })
      .addCase(Api.createUser.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.createUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })

      .addCase(Api.putWorkpackagesBatch.pending, (state) => {
        state.success = "pending";
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.putWorkpackagesBatch.fulfilled, (state, action) => {
        state.status = "succeeded";
        // action.payload.forEach(headersOn => {
        //   let index = state.headersOn.findIndex(x => x.id === headersOn.id)

        //   state.headersOn[index] = headersOn;

        // })
        // state.missingWorkPackages = action.payload;
        state.success = true;
      })
      .addCase(Api.putWorkpackagesBatch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.success = false;
        state.error = true;
      })
  },
});

export const {
  addInitialWorkPackage,
  uploadDailyReport,
  loadWorkPackage,
  updateWorkPackageRow,
  updateHeadersOnStatus,
  updateHeadersOnRow,
  updateSuccessFlag,
  updateErrorFlag,
  updatePutSuccessFlag,
  updateMissingWP,
  updateCoder,
  updateStaff,
  loginStaff
} = kpiTrackerSlice.actions;

export default kpiTrackerSlice.reducer;

export const selectApiStatus = (state) => state.kpiTracker.status;
export const workPackage =(state) => state.kpiTracker.workPackage