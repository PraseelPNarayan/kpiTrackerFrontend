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
           options:[
            {label:'Added', value:'Added'},
            {label:'Yes', value:'Yes'}
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
        key: "Asset ID",
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
        label: "Received Date",
        // This is the key used for this field when we call onSubmit.
        key: "Received Date",
        // Used when editing and validating information.
        fieldType: {
          // There are 3 types - "input" / "checkbox" / "select".
          type: "input",
          
        },
        
        // Used in the first step to provide an example of what data is expected in this field. Optional.
        example: "yyyy-mm-dd",
        // Can have multiple validations that are visible in Validation Step table.
    
      }
  ] 

  const workPackage =  [
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
           options:[
            {label:'Added', value:'Added'},
            {label:'Yes', value:'Yes'}
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
        key: "Asset ID",
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
    
      }
  ] 

  export default{
    initialWorkPackageFields
  }