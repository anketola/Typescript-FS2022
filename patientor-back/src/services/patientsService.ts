import patientsData from '../../data/patients.json';
import { NewPatientEntry, NonSensitiveDataPatients, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<NonSensitiveDataPatients> = patientsData; 

const getPatients = () => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitiveDataPatients[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = ( entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};