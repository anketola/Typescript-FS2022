import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection, SelectField } from "./FormField";
import { Entry, HealthCheckRating } from "../types";


export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthOptions = [
  { value: HealthCheckRating.LowRisk, label: "0" },
  { value: HealthCheckRating.Healthy, label: "1" },
  { value: HealthCheckRating.HighRisk, label: "2" },
  { value: HealthCheckRating.CriticalRisk, label: "3" },
];

enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupaionalHealthcare"
}

//const entryTypeOptions: EntryTypeOption[] = [
//  { value: EntryType.HealthCheck, label: "Health check" },
// { value: EntryType.Hospital, label: "Hospial" },
//  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" }
//];


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  

  return (
    
    <Formik
      initialValues={{
        description: "Massive headache",
        date: "1-1-1111",
        type: EntryType.HealthCheck,
        specialist: "df",
        healthCheckRating: 0
    }}
      onSubmit={onSubmit}
      validate={(values) => {
        //const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        console.log(values);
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched, dirty, isValid }) => {
        
        return (
          <Form className="form ui">
            
              <Field
              label="Description"
              placeholder="Name"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist name"
              name="specialist"
              component={TextField}
            />
            <SelectField
              name="healthCheckRating"
              label="healthCheckRating"
              options={healthOptions}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />  
          

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;