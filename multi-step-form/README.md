# Dynamic Multi-Step Form for Webflow

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()
[![Webflow](https://img.shields.io/badge/Webflow-4353FF?style=for-the-badge&logo=webflow&logoColor=white)]()
[![Airtable](https://img.shields.io/badge/Airtable-F7B928?style=for-the-badge&logo=airtable&logoColor=black)]()

A dynamic, multi-step form component for Webflow, powered by Airtable for easy configuration and management.

## Installation

```bash
npm install
```

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

This will start the Astro development server, and you can view the component at `http://localhost:4321`.

---

## Project structure

- `src/components/DynamicFormGenerator.jsx`: The core React component that handles form logic, state management, validation, and rendering.
- `src/components/DynamicFormGenerator.webflow.tsx`: The Webflow Code Component definition file. It defines the props that appear in the Webflow Designer's settings panel.
- `src/styles/component-styles.css`: The CSS file containing styles for the component, written using Tailwind CSS and DaisyUI.

---

## How it works

This component connects Airtable for configuration, Webflow for presentation, and a webhook for data processing.

1.  **Form Configuration in Airtable**: Design your form in an [Airtable Base](https://airtable.com/appoSYwCLsZ1KeGDA/shrjViMqTb4f7apWi). Define steps, fields, validation, and conditional logic.
2.  **JSON Generation**: An Airtable script generates a JSON configuration for your form.
3.  **Webflow Component**: Add the "Dynamic Form Generator" component in Webflow and paste the JSON configuration.
4.  **Form Rendering**: The React component parses the JSON and renders the multi-step form.
5.  **Data Submission**: Form data is sent to a specified webhook.
6.  **Airtable Automation**: The webhook triggers an Airtable Automation to process the data.

## Setup guide

### 1. Configure the form in Airtable

1.  Open the [Airtable Base Template](https://airtable.com/appoSYwCLsZ1KeGDA/shrjViMqTb4f7apWi) and duplicate it.
2.  In the **Forms** table, create a record for your form.
3.  In the **Form Structure** table, add your questions, assign them to steps, and link them to your form.
4.  Copy the JSON from the `Form Config Script` field in your **Forms** table record.

### 2. Set up the Airtable automation

1.  In your Airtable base, go to **Automations**.
2.  Create an automation with a **"When webhook received"** trigger.
3.  Copy the webhook URL.
4.  Add actions to process the form data
    <details>
    <summary> Action Setup Details</summary>

    1. **Action 1: Create record**: Create a new record in a `Submissions` table with the data received from the webhook.

    2. **Action 2: Run a script**: Add custom logic, to create a new form-specific table for submissions.
    <details>
        <summary>Script Configuration</summary>

    #### Inputs

    | Name       | Value     |
    | ---------- | --------- |
    | `formData` | `payload` |
    | `formId`   | `formId`  |

    #### Script Code

    ```javascript
    // If Form Table doesn't exist - create it
    const { formData, formId } = input.config();
    const baseId = base.id;

    // Get Table
    const tables = base.tables.map((table) => table.name);
    const table = tables.find((name) => name == formId);

    // Create the table with fields
    if (!table) {
      // Get fields from form structure table
      const structureTable = base.getTable("Form Structure");
      const query = await structureTable.selectRecordsAsync({
        fields: structureTable.fields,
      });
      const structureRecords = query.records;
      const formStructure = structureRecords.filter((r) =>
        r
          .getCellValue("FormID")
          .map((f) => f.name)
          .includes(formId)
      );
      console.log("formStructure", formStructure);

      // For each record, create a field in the new table

      const fields = formStructure.map((record) => {
        // Determine field type
        const getFieldType = (fieldType) => {
          switch (fieldType.toLowerCase()) {
            case "number":
              return "number";
            case "text area":
              return "richText";
            case "email":
              return "email";
            case "dropdown":
              return "singleSelect";
            case "scale":
              return "number";
            default:
              return "singleLineText";
          }
        };

        const obj = {
          name: record.name,
          description: record.getCellValueAsString("User Label"),
          type: getFieldType(record.getCellValueAsString("Field Type")),
        };

        if (obj.type == "number") {
          obj.options = {};
          obj.options.precision = 0;
        }

        if (obj.type === "singleSelect") {
          obj.options = {};
          obj.options.choices = record
            .getCellValue("Options")
            .map((values) => ({ name: values.name }));
        }

        return obj;
      });

      console.log(fields);

      const url = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${input.secret("airtableKey")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formId,
          fields: fields,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    ```

    </details>

    3. **Action 3: Run a Script:** Add a script to create new records in the form-specfic table
    <details>
    <summary>Script Configuration</summary>

    #### Inputs

    | Name       | Value     |
    | ---------- | --------- |
    | `formData` | `payload` |
    | `formId`   | `formId`  |

    #### Script Code

    ```javascript
    const { data, formId } = input.config();
    const jsonData = JSON.parse(data);
    console.log(jsonData);

    const table = base.getTable(formId);
    const fields = table.fields;

    const singleSelectFields = fields.filter(
      (field) => field.type == "singleSelect"
    );
    const numberFields = fields.filter((field) => field.type === "number");

    for (let entry in jsonData) {
      // Convert to single select format
      if (singleSelectFields.map((field) => field.name).includes(entry))
        jsonData[entry] = { name: jsonData[entry] };

      // Convert to number format
      if (numberFields.map((fields) => fields.name).includes(entry))
        jsonData[entry] = parseInt(jsonData[entry]);
    }

    table.createRecordAsync(jsonData);
    ```

      </details>

</details>

### 3. Add the component in Webflow

1.  Share the component to your Webflow workspace using the Webflow CLI:
    ```bash
    npx webflow library share
    ```
2.  Install the library in your Webflow site and add the component to a page.
3.  Configure the component's props in the **Settings** panel.

## Component properties

| Prop Name    | Type      | Description                                                                                                                    |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `formName`   | `Text`    | The title displayed at the top of the form.                                                                                    |
| `formConfig` | `Text`    | The JSON string that defines the form structure, copied from the Airtable base.                                                |
| `webhookUrl` | `Text`    | The URL that the form data will be submitted to.                                                                               |
| `formID`     | `Text`    | A unique identifier for the form, which gets included in the submission payload.                                               |
| `devMode`    | `Variant` | If `true`, submitting the form shows a preview of the JSON payload instead of sending it to the webhook. Useful for debugging. |

## Community

For help, discussion about examples and best practices:

[Join the Webflow App Developers Forum](https://discourse.webflow.com/c/app-developers/90)

To connect and swap ideas with other Webflow developers:

[Join the Unofficial Webflow Discord Server](https://discord.gg/webflow)
