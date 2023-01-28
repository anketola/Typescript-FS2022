import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
    type: "FILL_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_INDIVIDUALDATA";
      payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FILL_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis }), {}
          ),
          ...state.diagnosis
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_INDIVIDUALDATA":
      return {
        ...state,
        individualPatients: {
          ...state.individualPatients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const fetchAllDiagnosisData = (fetchAllDiagnosis: Diagnosis[]): Action => {
  return {
    type: 'FILL_DIAGNOSIS_LIST',
    payload: fetchAllDiagnosis
  };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient
  };
};

export const addIndividualData = (individualData: Patient): Action => {
  return {
    type: 'ADD_INDIVIDUALDATA',
    payload: individualData
  };
};

