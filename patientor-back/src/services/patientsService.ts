import patientsData from '../../data/patients.json';
import { NewPatientEntry, NonSensitiveDataPatients, Patient } from '../types';
import { v1 as uuid } from 'uuid';
import toNewPatientEntry from '../utils';


const patients: Patient [] = patientsData.map(obj => {
    const object = toNewPatientEntry(obj) as Patient;
    object.id = obj.id;
    return object;
});

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const getPatients = () => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitiveDataPatients[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = ( entry: NewPatientEntry ): Patient => {
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
  addPatient,
  findById
};