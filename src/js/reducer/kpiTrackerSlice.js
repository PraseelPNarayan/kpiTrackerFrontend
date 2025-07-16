import { createSlice } from "@reduxjs/toolkit";
import { createWorkPage } from "../actions/actionType";
import Api from "../api/apiService";

import moment from "moment/moment";
import ActionType from "../actions/actionType";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";

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
  users: [],
  userToUpdate: {},
  loggedInStaff: {},
  officeList: [],
  officeToUpdate: {},
  fromDate: moment({
    year:
      moment().month() + 1 >= 7 && moment().month() + 1 <= 12
        ? moment().year()
        : moment().year() - 1,
    month: 6,
    day: 1,
  }),
  toDate: moment({
    year:
      moment().month() >= 6 && moment().month() <= 11
        ? moment().year() + 1
        : moment().year(),
    month: 5,
    day: 30,
  }),
  filteredWorkpackage: [],
  filterWPText: "",
  filterOperatorText: "",
  filterInspDate: "",
  OldFilterWPText: "",
  OldFilterOperatorText: "",
  OldFilterInspDate: "",
  filters: {},
  notUploaded : []
};

export const kpiTrackerSlice = createSlice({
  name: ActionType.createWorkPage,
  initialState: initialState,
  reducers: {
    updateSuccessFlag: (state, action) => {
      state.success = false;
    },
    updatePutSuccessFlag: (state, action) => {
      state.putSuccess = false;
    },
    updateErrorFlag: (state, action) => {
      state.error = false;
      state.errorMessage = null;
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
    updateNotUploaded: (state, action) => {
      state.notUploaded = action.payload;},
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
  
    updateCoder: (state, action) => {
      state.coderToUpdate = action.payload;
    },
    updateStaff: (state, action) => {
      state.userToUpdate = action.payload;
    },
    officeToUpdate: (state, action) => {
      state.officeToUpdate = action.payload;
    },
    loginStaff: (state, action) => {
      state.loggedInStaff = action.payload;
    },
    resetErrorFlag: (state, action) => {
      state.error = false;
      state.errorMessage = null;
    },
    updateFromDate: (state, action) => {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
    },
    updateFilterData: (state, action) => {
      Object.keys(action.payload).map((k) => {
        state.filterData[k] = action.payload[k];
      });
    },
    setFilterWpText: (state, action) => {
      state.filterWPText = action.payload;
    },
    setFilterOperatorText: (state, action) => {
      state.filterOperatorText = action.payload;
    },
    setFilterInspDate: (state, action) => {

      state.filterInspDate = action.payload;
    },
    setFilteredWP: (state, action) => {
      const {filterName, filterValue} = action.payload
     

      if(filterValue){state.filters[filterName]=filterValue}
      else {delete state.filters[filterName]}

        state.filteredWorkpackage =  state.workPackage.filter((wp) => {
       return Object.keys(state.filters).every((filter)=>{
     
        if(filter ==='wp')
        {
          console.log('wp', wp.wp, filterValue);
          
          return wp.wp.toLowerCase() === filterValue.toLowerCase();
        }
        if(filter ==='operator')
          {
            return wp.operator !== null && wp.operator.toLowerCase().match(state.filters[filter].toLowerCase());
          }
        if(filter ==='inspDate')
          {
            return wp.inspection_Date !== null && wp.inspection_Date === state.filters[filter];
          }
       })
      
      });

    },
    deleteDate: (state, action) => {
      delete state.filterInspDate;
  
    },
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
        // state.headersOn = action.payload;
        state.missingWorkPackages = action.payload;
    
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
        let index = state.headersOn.findIndex(
          (x) => x.id === action.payload.id
        );
        state.headersOn[index] = action.payload;
        state.putSuccess = true;
      })
      .addCase(Api.putHeadersOn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.errorMessage = action.error.message;
        state.putSuccess = false;
        state.success = false;
      })
      .addCase(Api.putHeadersOnBatch.pending, (state) => {
        state.success = false;
        state.toggleSpinner = true;
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
        state.toggleSpinner = false;
        state.error = true;
      })
      .addCase(Api.putHeadersOnBatchEntries.pending, (state) => {
        state.success = false;
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.putHeadersOnBatchEntries.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.forEach((response) => {
          let index = state.headersOn.findIndex((x) => x.id === response.id);

          state.headersOn[index] = response;
        });

        state.success = true;
        state.toggleSpinner = false;
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
      .addCase(Api.getAllWorkpackages.pending, (state, action) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.getAllWorkpackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workPackage = action.payload;
        state.filteredWorkpackage = action.payload;
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
        state.errorMessage = action.error.message;
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
        state.errorMessage = action.error.message;
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
        state.success = false;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.putWorkpackagesBatch.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.forEach(wp => {
          let index = state.workPackage.findIndex(x => x.id === wp.id)
       

          state.workPackage[index] = wp;

        })
        // state.missingWorkPackages = action.payload;
        state.success = true;
      })
      .addCase(Api.putWorkpackagesBatch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.success = false;
        state.error = true;
      })

      .addCase(Api.createOffice.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.createOffice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.officeList.push(action.payload);
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.createOffice.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.toggleSpinner = false;
        state.error = true;
      })

      .addCase(Api.updateOffice.pending, (state) => {
        state.success = false;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.updateOffice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.officeToUpdate = {};
        // action.payload.forEach(headersOn => {
        //   let index = state.headersOn.findIndex(x => x.id === headersOn.id)

        //   state.headersOn[index] = headersOn;

        // })
        // state.missingWorkPackages = action.payload;
        state.success = true;
      })
      .addCase(Api.updateOffice.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        state.success = false;
        state.error = true;
      })

      .addCase(Api.getAllOffices.pending, (state) => {
        state.status = "pending";
        state.toggleSpinner = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(Api.getAllOffices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.officeList = action.payload;
        state.toggleSpinner = false;
        state.success = true;
      })
      .addCase(Api.getAllOffices.rejected, (state, action) => {
        state.toggleSpinner = false;
        state.success = false;
        state.status = "failed";
        state.error = true;
        state.errorMessage = action.error.message;
      });
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
  updateFromDate,
  updateFilterData,
  loginStaff,
  resetErrorFlag,
  officeToUpdate,
  setFilteredWP,
  setFilterWpText,
  setFilterOperatorText,
  setFilterInspDate,
  deleteDate,
  updateNotUploaded
} = kpiTrackerSlice.actions;

export default kpiTrackerSlice.reducer;

export const selectApiStatus = (state) => state.kpiTracker.status;
export const workPackage = (state) => state.kpiTracker.filteredWorkpackage;
