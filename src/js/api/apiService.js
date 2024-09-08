const initialWorkPackageFields = [
  {
    // Visible in table header and when matching columns.
    label: "WP",
    // This is the key used for this field when we call onSubmit.
    key: "WP",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "WP83",
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "WP is required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
  },
  {
    // Visible in table header and when matching columns.
    label: "Urgent",
    // This is the key used for this field when we call onSubmit.
    key: "Urgent",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "select",
      options: [
        { label: "Added", value: "Added" },
        { label: "Yes", value: "Yes" },
        { label: "Yes and Added", value: "Yes and Added" },
      ],
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Added",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Asset ID",
    // This is the key used for this field when we call onSubmit.
    key: "Asset_ID",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "2000157620",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "GIS Length",
    // This is the key used for this field when we call onSubmit.
    key: "GIS_Length",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "33.33",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Surveyed m",
    // This is the key used for this field when we call onSubmit.
    key: "Surveyed_M",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "20.03",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Abandoned m",
    // This is the key used for this field when we call onSubmit.
    key: "Abandoned_M",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "23.33",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Diameter",
    // This is the key used for this field when we call onSubmit.
    key: "Diameter",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "100",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Address",
    // This is the key used for this field when we call onSubmit.
    key: "Address",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
];

const workPackageFields = [
  {
    // Visible in table header and when matching columns.
    label: "WP",
    // This is the key used for this field when we call onSubmit.
    key: "WP",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "WP83",
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "WP is required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
  },
  {
    // Visible in table header and when matching columns.
    label: "Urgent",
    // This is the key used for this field when we call onSubmit.
    key: "Urgent",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "select",
      options: [
        { label: "Added", value: "Added" },
        { label: "Yes and Added", value: "Yes and Added" },
        { label: "Yes", value: "Yes" },
      ],
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Added",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Asset ID",
    // This is the key used for this field when we call onSubmit.
    key: "Asset_ID",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "2000157620",
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "Asset ID required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "GIS Length",
    // This is the key used for this field when we call onSubmit.
    key: "GIS Length",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "33.33",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Surveyed m",
    // This is the key used for this field when we call onSubmit.
    key: "Surveyed m",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "20.03",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Abandoned m",
    // This is the key used for this field when we call onSubmit.
    key: "Abandoned m",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "23.33",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Diameter",
    // This is the key used for this field when we call onSubmit.
    key: "Diameter",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "100",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Address",
    // This is the key used for this field when we call onSubmit.
    key: "Address",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Map No.",
    // This is the key used for this field when we call onSubmit.
    key: "Map No.",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Z12",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Received Date",
    // This is the key used for this field when we call onSubmit.
    key: "Received Date",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "date",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "yyyy-mm-dd",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    label: "Inspection Date",
    key: "Inspection Date",
    fieldType: { type: "input" },
    example: "44816",
  },
  {
    label: "Rego",
    key: "Rego",
    fieldType: { type: "input" },
    example: "GAG223",
  },
  {
    label: "Operator",
    key: "Operator",
    fieldType: { type: "input" },
    example: "Bach Bendle",
  },
  {
    label: "Coder",
    key: "Coder",
    fieldType: { type: "input" },
    example: "Te Rewa Price",
  },
  {
    label: "Sent for Coding",
    key: "Sent_for_Coding",
    fieldType: { type: "input" },
    example: "44835",
  },
  {
    label: "Coding Received",
    key: "Coding Received",
    fieldType: { type: "input" },
    example: "44838",
  },
  {
    label: "Completion Status",
    key: "Completion Status",
    fieldType: { type: "input" },
    example: "Completed Asset",
  },
  {
    label: "Completion Characterization",
    key: "Completion Characterization",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Characterization",
    key: "Characterization",
    fieldType: { type: "input" },
    example: "",
  },
  { label: "IC/UI", key: "IC/UI", fieldType: { type: "input" }, example: "IC" },
  { label: "DVD#", key: "DVD#", fieldType: { type: "input" }, example: "" },
  {
    label: "Night Shift",
    key: "Night Shift",
    fieldType: { type: "input" },
    example: "NO",
  },
  {
    label: "As-built Required?",
    key: "As-built Required?",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "As-built Already Done?",
    key: "As-built Already Done?",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "As-Built File Name",
    key: "As-Built File Name",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Uploaded Date",
    key: "Uploaded Date",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Cleaning Type",
    key: "Cleaning Type",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Cleaning Date",
    key: "Cleaning Date",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Confined Space Entry",
    key: "Confined Space Entry",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Traffic Management",
    key: "Traffic Management",
    fieldType: { type: "input" },
    example: "",
  },
  { label: "Dig Up", key: "Dig Up", fieldType: { type: "input" }, example: "" },
  {
    label: "Batch #",
    key: "Batch #",
    fieldType: { type: "input" },
    example: "AT Culverts - Batch #0001",
  },
  {
    label: "Batch Date",
    key: "Batch Date",
    fieldType: { type: "input" },
    example: "44840",
  },
  {
    label: "if Re-batched, old Batch ID#",
    key: "if Re-batched, old Batch ID#",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Claimed",
    key: "Claimed",
    fieldType: { type: "input" },
    example: "Claimed - Already marked as Claimed, unable to confirm",
  },
  {
    label: "General Comments from the Field APP ( CCTV Crew )",
    key: "General Comments from the Field APP ( CCTV Crew )",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "General Comments ( From MOATA )",
    key: "General Comments ( From MOATA )",
    fieldType: { type: "input" },
    example: "U/S Inlet, D/S Outlet no depths",
  },
  {
    label: "Time of Inspection",
    key: "Time of Inspection",
    fieldType: { type: "input" },
    example: "0.595138888888889",
  },
  {
    label: "Submitted Twice?",
    key: "Submitted Twice?",
    fieldType: { type: "input" },
    example: "",
  },
];

const dailyReportFields = [
  {
    // Visible in table header and when matching columns.
    label: "WP",
    // This is the key used for this field when we call onSubmit.
    key: "WP",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "WP83",
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "WP is required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
  },
  {
    // Visible in table header and when matching columns.
    label: "Urgent",
    // This is the key used for this field when we call onSubmit.
    key: "Urgent",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "select",
      options: [
        { label: "Added", value: "Added" },
        { label: "Yes", value: "Yes" },
        { label: "Yes and Added", value: "Yes and Added" },
      ],
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Added",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Asset_ID",
    // This is the key used for this field when we call onSubmit.
    key: "Asset_ID",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "2000157620",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "GIS_Length",
    // This is the key used for this field when we call onSubmit.
    key: "GIS_Length",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "33.33",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Surveyed_M",
    // This is the key used for this field when we call onSubmit.
    key: "Surveyed_M",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "20.03",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Abandoned_M",
    // This is the key used for this field when we call onSubmit.
    key: "Abandoned_M",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "23.33",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Diameter",
    // This is the key used for this field when we call onSubmit.
    key: "Diameter",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "100",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Address",
    // This is the key used for this field when we call onSubmit.
    key: "Address",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Batch_ID_#",
    // This is the key used for this field when we call onSubmit.
    key: "Batch_ID_#",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Wincan_Project_Name",
    // This is the key used for this field when we call onSubmit.
    key: "Wincan_Project_Name",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Up_Node_Ref",
    // This is the key used for this field when we call onSubmit.
    key: "Up_Node_Ref",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Down_Node_Ref",
    // This is the key used for this field when we call onSubmit.
    key: "Down_Node_Ref",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Setup",
    // This is the key used for this field when we call onSubmit.
    key: "Setup",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Parallel_Line",
    // This is the key used for this field when we call onSubmit.
    key: "Parallel_Line",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Up_Node_Loc",
    // This is the key used for this field when we call onSubmit.
    key: "Up_Node_Loc",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },
  {
    // Visible in table header and when matching columns.
    label: "Down_Node_Loc",
    // This is the key used for this field when we call onSubmit.
    key: "Down_Node_Loc",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
  },

  {
    // Visible in table header and when matching columns.
    label: "Standard",
    // This is the key used for this field when we call onSubmit.
    key: "Standard",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },

    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "21 Foxlaw Street Randwick Park",
    // Can have multiple validations that are visible in Validation Step table.
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
    label: "Batch_ID_#",
    key: "Batch_ID_#",
    fieldType: { type: "input" },
    example: "2023_Papatoetoe_Tamaki_River - Batch #0001",
  },
  {
    label: "Wincan_Project_Name",
    key: "Wincan_Project_Name",
    fieldType: { type: "input" },
    example: "2022_08_19_Papatoetoe_Bach",
  },
  {
    label: "Asset_ID",
    key: "Asset_ID",
    fieldType: { type: "input" },
    example: "2000383805",
  },
  {
    label: "Up_node_reference",
    key: "Up_Node_Ref",
    fieldType: { type: "input" },
    example: "3000085511",
  },
  {
    label: "Down_node_reference",
    key: "Down_Node_Ref",
    fieldType: { type: "input" },
    example: "2000435949",
  },
  {
    label: "Setup",
    key: "Setup",
    fieldType: { type: "input" },
    example: "Downstream node",
  },
  {
    label: "Parallel_Line",
    key: "Parallel_Line",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Upstream_node_Location",
    key: "Up_Node_Loc",
    fieldType: { type: "input" },
    example: "116 Buckland Road",
  },
  {
    label: "Downstream_node_location",
    key: "Down_Node_Loc",
    fieldType: { type: "input" },
    example: "112B Buckland Road",
  },
  {
    label: "Standard",
    key: "Standard",
    fieldType: { type: "input" },
    example: "NZPIM (Gravity)—4th Edition 2019",
  },
  {
    label: "Date_of_Inspection",
    key: "Date_of_Inspection",
    fieldType: { type: "input" },
    example: "dd-mm-yyyy",
  },
  {
    label: "Time_of_Inspection",
    key: "Time_of_Inspection",
    fieldType: { type: "input" },
    example: "0.661111111111111",
  },
  {
    label: "Name_of_Operator",
    key: "Operator",
    fieldType: { type: "input" },
    example: "Bach Bendle",
  },
  {
    label: "Video_volume_reference_1",
    key: "Video_Ref",
    fieldType: { type: "input" },
    example: "2000383805_190822_PR_D",
  },
  {
    label: "Purpose_of_inspection",
    key: "Purpose_of_inspection",
    fieldType: { type: "input" },
    example: "Routine inspection of condition",
  },
  {
    label: "Pipe_Length_[m]",
    key: "GIS_Length",
    fieldType: { type: "input" },
    example: "38.8",
  },
  {
    label: "Surveyed_Length_[m]",
    key: "Surveyed_M",
    fieldType: { type: "input" },
    example: "38.8",
  },
  {
    label: "Inspection_Completion_Status",
    key: "Inspection_Completion_Status",
    fieldType: { type: "input" },
    example: "Inspection complete",
  },
  {
    label: "Name_of_Coder",
    key: "Coder",
    fieldType: { type: "input" },
    example: "-",
  },
  {
    label: "Date_Sent",
    key: "Date_Sent",
    fieldType: { type: "input" },
    example: "-",
  
  },
  {
    label: "Shape",
    key: "Shape",
    fieldType: { type: "input" },
    example: "Circular",
  },
  {
    label: "Height_mm",
    key: "Height_mm",
    fieldType: { type: "input" },
    example: "450",
  },
  {
    label: "Width_[mm]",
    key: "Diameter",
    fieldType: { type: "input" },
    example: "450",
  },
  {
    label: "Material",
    key: "Material",
    fieldType: { type: "input" },
    example: "Steel Reinforced Concrete",
  },
  {
    label: "Lining_type",
    key: "Lining_type",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Lining_material",
    key: "Lining_material",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Joint_Spacing_[m]",
    key: "Joint_Spacing_M",
    fieldType: { type: "input" },
    example: "2.4",
  },
  {
    label: "Operation_of_Pipeline",
    key: "Operation_of_Pipeline",
    fieldType: { type: "input" },
    example: "Gravity",
  },
  {
    label: "Use_of_Pipeline",
    key: "Use_of_Pipeline",
    fieldType: { type: "input" },
    example: "Stormwater",
  },
  {
    label: "Cleaning_Status",
    key: "Cleaning_Status",
    fieldType: { type: "input" },
    example: "No cleaning",
  },
  {
    label: "General_comment",
    key: "General_Comment",
    fieldType: { type: "input" },
    example: "",
  },
  {
    label: "Town_or_suburb",
    key: "Town_or_suburb",
    fieldType: { type: "input" },
    example: "Papatoetoe",
  },
  {
    label: "Depth_at_upstream_node_[m]",
    key: "Depth_at_Up_Node_M",
    fieldType: { type: "input" },
    example: "2.09",
  },
  {
    label: "Depth_at_downstream_node_[m]",
    key: "Depth_at_Down_Node_M",
    fieldType: { type: "input" },
    example: "2.16",
  },
  {
    label: "Up_Node_Type",
    key: "Up_Node_Type",
    fieldType: { type: "input" },
    example: "STMH",
  },
  {
    label: "Down_Node_Type",
    key: "Down_Node_Type",
    fieldType: { type: "input" },
    example: "STMH",
  },
  { label: "WP", key: "WP", fieldType: { type: "input" }, example: "WP02" },
  {
    label: "Night_Shift",
    key: "Night_Shift",
    fieldType: { type: "input" },
    example: "NO",
  },

];

export default {
  initialWorkPackageFields,
  dailyReportFields,
  workPackageFields,
  headersOnFields
};
