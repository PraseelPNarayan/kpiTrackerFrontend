
import axios from "axios";
import Types from "../actions/actionType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectApiStatus } from "../reducer/kpiTrackerSlice";


export const baseUrl= "https://localhost:7192/api"

const getAllHeadersOn=createAsyncThunk(Types.fetchAllHeadersOn, async ()=>{
 

  const response =   await axios.get(baseUrl+'/headerson/fetchAllheaderson')

  
return response.data
}
// ,
//   {
//     condition(arg, thunkApi) {
//       const postsStatus = selectApiStatus(thunkApi.getState())
//       if (postsStatus !== 'idle') {
//         return false
//       }
//     }
//   }
)

const postCreateHeadersOn=createAsyncThunk(Types.createHeadersOn, async (payload)=>{
  const response =await  axios.post(baseUrl+'/headerson/createHeadersOn',payload)
   return response.data;
 
 }
 )

 const putHeadersOn=createAsyncThunk(Types.updateHeadersOn, async (payload)=>{
  const response =await  axios.put(baseUrl+'/headerson/putheaderson',payload)
   return response.data;
 
 }
 )

 const putHeadersOnBatch=createAsyncThunk(Types.updateBatchHeadersOn, async (payload)=>{
  const response =await  axios.put(baseUrl+'/headerson/putheadersonbatch',payload)
   return response.data;
 
 }
 )
 const putHeadersOnBatchEntries=createAsyncThunk(Types.updateBatchEntriesHeadersOn, async (payload)=>{
  const response =await  axios.put(baseUrl+'/headerson/putheadersonbatchentries',payload)
   return response.data;
 
 }
 )



 const getAllWorkpackages=createAsyncThunk(Types.fetchAllWorkPackages, async (payload)=>{
  const response = await axios.post(baseUrl+`/workpackages/fetchallworkpackages/${payload.fromDate}/${payload.toDate}`)
 return response.data
 })
 
 const postCreateWorkpackages=createAsyncThunk(Types.createWorkPage, async (payload)=>{
   const response =await  axios.post(baseUrl+'/workpackages/createworkpackages',payload)
    return response.data;
  
  }
  )
 
  const putWorkpackage=createAsyncThunk(Types.updateHeadersOn, async (payload)=>{
   const response =await  axios.put(baseUrl+'/workpackages/updateworkpackage',payload)
    return response.data;
  
  }
  )
 
  const putWorkpackagesBatch=createAsyncThunk(Types.updateBatchHeadersOn, async (payload)=>{
   const response =await  axios.put(baseUrl+'/workpackages/putbatchworkpackages',payload)
    return response.data;
  
  }
  )
 

 const getAllCoders=createAsyncThunk(Types.fetchAllCoders, async ()=>{
  const response = await axios.get(baseUrl+'/coders/fetchAllCoders')
 return response.data
})

 const createCoder=createAsyncThunk(Types.createCoder, async (payload)=>{
  const response = await axios.post(baseUrl+'/coders/createCoder',payload)
 return response.data
 })

 const updateCoder=createAsyncThunk(Types.updateCoder, async (payload)=>{
  const response = await axios.put(baseUrl+'/coders/updatecoder',payload)
 return response.data
 })

 const getAllUsers=createAsyncThunk(Types.fetchAllUsers, async ()=>{
  const response = await axios.get(baseUrl+'/users/getallusers')
 return response.data
})

 const createUser=createAsyncThunk(Types.registerUser, async (payload)=>{
  const response = await axios.post(baseUrl+'/login/register',payload)
 return response.data
 })

 const updateUser=createAsyncThunk(Types.updateUser, async (payload)=>{
  const response = await axios.put(baseUrl+'/users/updateuser',payload)
 return response.data
 })


 const login=createAsyncThunk(Types.login, async (payload)=>{
  const response = await axios.put(baseUrl+'/login/login',payload)
 return response.data
 })




const initialWorkPackageFields = [
  {
    label: "WP",

    key: "WP",

    fieldType: {
      type: "input",
    },

    example: "WP83",

    validations: [
      {
        rule: "required",
        errorMessage: "WP is required",

        level: "error",
      },
    ],
  },
  {
    label: "Urgent",

    key: "Urgent",

    fieldType: {
      type: "select",
      options: [
        { label: "Added", value: "Added" },
        { label: "Yes", value: "Yes" },
        { label: "Yes and Added", value: "Yes and Added" },
      ],
    },
    type:"singleSelect",
    valueOptions: ['Yes','Added', 'Yes and Added'],

    example: "Added",
  },
  {
    label: "Asset ID",

    key: "Asset_ID",

    fieldType: {
      type: "input",
    },

    example: "2000157620",
  },
  {
    label: "GIS Length",

    key: "GIS_Length",

    fieldType: {
      type: "input",
    },

    example: "33.33",
  },
  {
    label: "Surveyed m",

    key: "Surveyed_M",

    fieldType: {
      type: "input",
    },

    example: "20.03",
  },
  {
    label: "Abandoned m",

    key: "Abandoned_M",

    fieldType: {
      type: "input",
    },

    example: "23.33",
  },
  {
    label: "Diameter",

    key: "Diameter",

    fieldType: {
      type: "input",
    },

    example: "100",
  },
  {
    label: "Address",

    key: "Address",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
];

const workPackageFields = [
  {
    label: "Id",
    key: "id",

    fieldType: {
      type: "input",
    },

  },
  {
    label: "Status",
    key: "status",

    fieldType: {
      type: "input",
    },

  },
  {
    label: "WP",
    key: "wp",

    fieldType: {
      type: "input",
    },

    example: "WP83",

    validations: [
      {
        rule: "required",
        errorMessage: "WP is required",

        level: "error",
      },
    ],
  },
  {
    label: "Urgent",

    key: "urgent",

    fieldType: {
      type: "select",
      options: [
        { label: "Added", value: "Added" },

        { label: "Yes", value: "Yes" },
        { label: "Add", value: "Add" },     
           { label: "Yes and Added", value: "Yes and Added" }
      ],
    },

    example: "Added",
    type:'singleSelect',
    valueOptions:['Yes', 'Added', 'Yes and Added']
  },
  {
    label: "Asset ID",

    key: "asset_ID",

    fieldType: {
      type: "input",
    },

    example: "2000157620",
    validations: [
      {
        rule: "required",
        errorMessage: "Asset ID required",

        level: "error",
      },
    ],
  },
  {
    label: "GIS Length",

    key: "giS_Length",

    fieldType: {
      type: "input",
    },

    example: "33.33",
  },
  {
    label: "Surveyed m",

    key: "surveyed_m",

    fieldType: {
      type: "input",
    },

    example: "20.03",
  },
  {
    label: "Abandoned m",

    key: "abandoned_M",

    fieldType: {
      type: "input",
    },

    example: "23.33",
  },
  {
    label: "Diameter",

    key: "diameter",

    fieldType: {
      type: "input",
    },

    example: "100",
  },
  {
    label: "Address",

    key: "address",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Map No.",

    key: "map_No",

    fieldType: {
      type: "input",
    },

    example: "Z12",
  },
  {
    label: "Received Date",

    key: "received_Date",

    fieldType: {
      type: "date",
    },

    example: "yyyy-mm-dd",
    // type:'date'
  },
  {
    label: "Inspection Date",
    key: "inspection_Date",
    fieldType: { type: "date" },
     example: "yyyy-mm-dd",
 
  },
  {
    label: "Rego",
    key: "rego",
    fieldType: { type: "input" },
    example: "GAG223",
  },
  {
    label: "Operator",
    key: "operator",
    fieldType: { type: "input" },
    example: "Bach Bendle",
  },
  {
    label: "Coder",
    key: "coder",
    fieldType: { type: "input" },
    example: "Te Rewa Price",
  },
  {
    label: "Sent for Coding",
    key: 'sent_for_Coding',
    fieldType: { type: "input" },
    example: "44835",
  },
  {
    label: "Coding Received",
    key: "coding_Received",
    fieldType: { type: "date" },
    example: "44838",
        // type:'date',
   
     
  },
  {
    label: "Completion Status",
    key: "completion_Status",
    fieldType: { type: "input" },
    example: "Completed Asset",
  },
  {
    label: "Completion Characterization",
    key: "completion_Characterization",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Characterization",
    key: "characterization",
    fieldType: { type: "input" },
    example: "",
  },
  { label: "IC/UI", key: "iC_UI", fieldType: { type: "input" }, example: "IC" },
  { label: "DVD#", key: "DVD", fieldType: { type: "input" }, example: "" },
  {
    label: "Night Shift",
    key: "night_Shift",
    fieldType: { type: "input" },
    example: "NO",
  },
  {
    label: "As-built Required?",
    key: "as_built_Required",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "As-built Already Done?",
    key: "as_built_Already_Done",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "As-Built File Name",
    key: "as_Built_File_Name",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Uploaded Date",
    key: "uploaded_Date",
    fieldType: { type: "input" },
    example: "",
        type:'date'
  },
  {
    label: "Cleaning Type",
    key: "cleaning_Type",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Cleaning Date",
    key: "cleaning_Date",
    fieldType: { type: "input" },
    example: "",
        type:'date'
  },
  {
    label: "Confined Space Entry",
    key: "confined_Space_Entry",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Traffic Management",
    key: "traffic_Management",
    fieldType: { type: "input" },
    example: "",
  },
  { label: "Dig Up", key: "dig_Up", fieldType: { type: "input" }, example: "" },
  {
    label: "Batch #",
    key: "batch_No",
    fieldType: { type: "input" },
    example: "AT Culverts - Batch #0001",
  },
  {
    label: "Batch Date",
    key: "batch_Date",
    fieldType: { type: "input" },
    example: "44840",
        type:'date'
  },
  {
    label: "if Re-batched, old Batch ID#",
    key: "old_Batch_No",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Claimed",
    key: "claimed",
    fieldType: { type: "input" },
    example: "Claimed - Already marked as Claimed, unable to confirm",
  },
  {
    label: "General Comments from the Field APP ( CCTV Crew )",
    key: "general_Comments_Field_App",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "General Comments ( From MOATA )",
    key: "general_Comments_Moata",
    fieldType: { type: "input" },
    example: "U/S Inlet, D/S Outlet no depths",
  },
  {
    label: "Time of Inspection",
    key: "time_of_Inspection",
    fieldType: { type: "input" },
    example: "0.595138888888889",
  },
  {
    label: "Submitted Twice?",
    key: "submitted_Twice",
    fieldType: { type: "input" },
    example: "",
  },
];

const dailyReportFields = [
  {
    label: "WP",

    key: "WP",

    fieldType: {
      type: "input",
    },

    example: "WP83",

    validations: [
      {
        rule: "required",
        errorMessage: "WP is required",

        level: "error",
      },
    ],
  },
  {
    label: "Urgent",

    key: "Urgent",

    fieldType: {
      type: "select",
      options: [
        { label: "Added", value: "Added" },
        { label: "Yes", value: "Yes" },
        { label: "Yes and Added", value: "Yes and Added" },
      ],
    },

    example: "Added",
  },
  {
    label: "Asset_ID",

    key: "Asset_ID",

    fieldType: {
      type: "input",
    },

    example: "2000157620",
  },
  {
    label: "GIS_Length",

    key: "GIS_Length",

    fieldType: {
      type: "input",
    },

    example: "33.33",
  },
  {
    label: "Surveyed_M",

    key: "Surveyed_M",

    fieldType: {
      type: "input",
    },

    example: "20.03",
  },
  {
    label: "Abandoned_M",

    key: "Abandoned_M",

    fieldType: {
      type: "input",
    },

    example: "23.33",
  },
  {
    label: "Diameter",

    key: "Diameter",

    fieldType: {
      type: "input",
    },

    example: "100",
  },
  {
    label: "Address",

    key: "Address",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Batch_ID_#",

    key: "Batch_ID",

    fieldType: {
      type: "input",
    },

    example: "",
  },
  {
    label: "Wincan_Project_Name",

    key: "Wincan_Project_Name",

    fieldType: {
      type: "input",
    },

    example: "",
  },
  {
    label: "Up_Node_Ref",

    key: "Up_Node_Ref",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Down_Node_Ref",

    key: "Down_Node_Ref",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Setup",

    key: "Setup",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Parallel_Line",

    key: "Parallel_Line",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Up_Node_Loc",

    key: "Up_Node_Loc",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Down_Node_Loc",

    key: "Down_Node_Loc",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },

  {
    label: "Standard",

    key: "Standard",

    fieldType: {
      type: "input",
    },

    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Date_of_Inspection",
    key: "Date_of_Inspection",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Time_of_Inspection",
    key: "Time_of_Inspection",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Operator",
    key: "Operator",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Video_Ref",
    key: "Video_Ref",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Purpose_of_Inspection",
    key: "Purpose_of_Inspection",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Inspection_Completion_Status",
    key: "Inspection_Completion_Status",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Coder",
    key: "Coder",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Shape",
    key: "Shape",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Height_mm",
    key: "Height_mm",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Material",
    key: "Material",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Lining_Type",
    key: "Lining_Type",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Lining_Material",
    key: "Lining_Material",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Joint_Spacing_M",
    key: "Joint_Spacing_M",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Operation_of_Pipeline",
    key: "Operation_of_Pipeline",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Use_of_Pipeline",
    key: "Use_of_Pipeline",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Cleaning_Status",
    key: "Cleaning_Status",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "General_Comment",
    key: "General_Comment",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Town_or_Suburb",
    key: "Town_or_Suburb",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Depth_at_Up_Node_M",
    key: "Depth_at_Up_Node_M",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Depth_at_Down_Node_M",
    key: "Depth_at_Down_Node_M",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Up_Node_Type",
    key: "Up_Node_Type",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Down_Node_Type",
    key: "Down_Node_Type",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Asset_Owner",
    key: "Asset_Owner",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Flow_Control_Measures",
    key: "Flow_Control_Measures",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Storage_Medium_for_Video",
    key: "Storage_Medium_for_Video",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Precipitation",
    key: "Precipitation",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Method_of_Inspection",
    key: "Method_of_Inspection",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Inspection_Currency_Status",
    key: "Inspection_Currency_Status",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Location_Type",
    key: "Location_Type",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Status ",
    key: "Status ",
    fieldType: {
      type: "select",
      options: [
        { label: "Awaiting Footage", value: "Awaiting Footage" },
        { label: "To Send to a Coder", value: "To Send to a Coder" },
        { label: "Allocated to Coder", value: "Allocated to Coder" },
        { label: "With Coder", value: "With Coder" },
        { label: "To upload", value: "To upload" },
        { label: "Uploaded to Moata", value: "Uploaded to Moata" },
      ],
    },
  },
];

const headersOnFields = [
  {
    label: "status",
    key: "status",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "id",
    key: "id",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Urgent",

    key: "urgent",

    fieldType: {
      type: "select",
      options: [
        { label: "Added", value: "Added" },
        { label: "Yes", value: "Yes" },
        { label: "Yes and Added", value: "Yes and Added" },
      ],
    },
    type:"singleSelect",
    valueOptions: ['Yes','Added', 'Yes and Added'],
    example: "Added",
  },
  {
    label: "Batch_ID",
    key: "batch_ID",
    fieldType: { type: "input" },
    example: "2023_Papatoetoe_Tamaki_River - Batch #0001",
  },
  {
    label: "Wincan_Project_Name",
    key: "wincan_Project_Name",
    fieldType: { type: "input" },
    example: "2022_08_19_Papatoetoe_Bach",
  },
  {
    label: "Asset_ID",
    key: "asset_ID",
    fieldType: { type: "input" },
    example: "2000383805",
  },
  {
    label: "Up_node_reference",
    key: "up_Node_Ref",
    fieldType: { type: "input" },
    example: "3000085511",
  },
  {
    label: "Down_node_reference",
    key: "down_Node_Ref",
    fieldType: { type: "input" },
    example: "2000435949",
  },
  {
    label: "Setup",
    key: "setup",
    fieldType: { type: "input" },
    example: "Downstream node",
  },
  {
    label: "Parallel_Line",
    key: "parallel_Line",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Upstream_node_Location",
    key: "up_Node_Loc",
    fieldType: { type: "input" },
    example: "116 Buckland Road",
  },
  {
    label: "Downstream_node_location",
    key: "down_Node_Loc",
    fieldType: { type: "input" },
    example: "112B Buckland Road",
  },
  {
    label: "Standard",
    key: "standard",
    fieldType: { type: "input" },
    example: "NZPIM (Gravity)—4th Edition 2019",
  },
  {
    label: "Date_of_Inspection",
    key: "date_of_Inspection",
    fieldType: { type: "date" },
    example: "dd-mm-yyyy",
    type:'date'
  },
  {
    label: "Date Receieved from Coder",
    key: "date_Received_From_Coder",
    fieldType: { type: "input" },
    example: "dd-mm-yyyy",
     type:'date'
  },
  {
    label: "Time_of_Inspection",
    key: "time_of_Inspection",
    fieldType: { type: "input" },
    example: "0.661111111111111",
  },
  {
    label: "Name_of_Operator",
    key: "operator",
    fieldType: { type: "input" },
    example: "Bach Bendle",
  },
  {
    label: "Video_volume_reference_1",
    key: "video_Ref",
    fieldType: { type: "input" },
    example: "2000383805_190822_PR_D",
  },
  {
    label: "Purpose_of_inspection",
    key: "purpose_of_inspection",
    fieldType: { type: "input" },
    example: "Routine inspection of condition",
  },
  {
    label: "Pipe_Length_[m]",
    key: "giS_Length",
    fieldType: { type: "input" },
    example: "38.8",
  },
  {
    label: "Surveyed_Length_[m]",
    key: "surveyed_m",
    fieldType: { type: "input" },
    example: "38.8",
  },
  {
    label: "Abandoned_M",
    key: "abandoned_M",
    fieldType: { type: "input" },
    example: "38.8",
  },
  {
    label: "Inspection_Completion_Status",
    key: "inspection_Completion_Status",
    fieldType: { type: "input" },
    example: "Inspection complete",
  },
  {
    label: "Name_of_Coder",
    key: "coder",
    fieldType: { type: "input" },
    example: "-",
  },
  {
    label: "Date_Sent",
    key: "date_Sent",
    fieldType: { type: "input" },
    example: "-",
    type:'date'
  },
  {
    label: "Shape",
    key: "shape",
    fieldType: { type: "input" },
    example: "Circular",
  },
  {
    label: "Height_mm",
    key: "height_mm",
    fieldType: { type: "input" },
    example: "450",
  },
  {
    label: "Width_[mm]",
    key: "diameter",
    fieldType: { type: "input" },
    example: "450",
  },
  {
    label: "Material",
    key: "material",
    fieldType: { type: "input" },
    example: "Steel Reinforced Concrete",
  },
  {
    label: "Lining_type",
    key: "lining_type",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Lining_material",
    key: "lining_material",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Joint_Spacing_[m]",
    key: "joint_Spacing_M",
    fieldType: { type: "input" },
    example: "2.4",
  },
  {
    label: "Operation_of_Pipeline",
    key: "operation_of_Pipeline",
    fieldType: { type: "input" },
    example: "Gravity",
  },
  {
    label: "Use_of_Pipeline",
    key: "use_of_Pipeline",
    fieldType: { type: "input" },
    example: "Stormwater",
  },
  {
    label: "Cleaning_Status",
    key: "cleaning_Status",
    fieldType: { type: "input" },
    example: "No cleaning",
  },
  {
    label: "General_comment",
    key: "general_Comment",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Town_or_suburb",
    key: "town_or_suburb",
    fieldType: { type: "input" },
    example: "Papatoetoe",
  },
  {
    label: "Depth_at_upstream_node_[m]",
    key: "depth_at_Up_Node_M",
    fieldType: { type: "input" },
    example: "2.09",
  },
  {
    label: "Depth_at_downstream_node_[m]",
    key: "depth_at_Down_Node_M",
    fieldType: { type: "input" },
    example: "2.16",
  },
  {
    label: "Up_Node_Type",
    key: "up_Node_Type",
    fieldType: { type: "input" },
    example: "STMH",
  },
  {
    label: "Down_Node_Type",
    key: "down_Node_Type",
    fieldType: { type: "input" },
    example: "STMH",
  },
  { label: "WP", key: "wp", fieldType: { type: "input" }, example: "WP02" },
  {
    label: "Night_Shift",
    key: "night_Shift",
    fieldType: { type: "input" },
    example: "NO",
  },
  {
    label: "Asset_Owner",
    key: "asset_Owner",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Flow_Control_Measures",
    key: "flow_Control_Measures",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Storage_Medium_for_Video",
    key: "storage_Medium_for_Video",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Precipitation",
    key: "precipitation",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Method_of_Inspection",
    key: "method_of_Inspection",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Inspection_Currency_Status",
    key: "inspection_Currency_Status",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
  {
    label: "Location_Type",
    key: "location_Type",
    fieldType: { type: "input" },
    example: "21 Foxlaw Street Randwick Park",
  },
];

export default {
  initialWorkPackageFields,
  dailyReportFields,
  workPackageFields,
  headersOnFields,
  postCreateHeadersOn,
  getAllHeadersOn,
  putHeadersOn,
  putHeadersOnBatch,
  putHeadersOnBatchEntries,
  getAllCoders,
  getAllWorkpackages,
  postCreateWorkpackages,
  createCoder,
  updateCoder,
  getAllUsers,
  updateUser,
  createUser

};
