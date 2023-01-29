import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitiveDataPatients, Patient, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';
// import toNewPatientEntry from '../utils';


//const patients: Patient [] = patientsData.map(obj => {
//   const object = toNewPatientEntry(obj) as Patient;
//    object.id = obj.id;
//    return object;
//});

const patients: Patient[] = patientsData;

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const getPatients = () => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitiveDataPatients[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }))
}

const addEntryForPatient = (id : string, newEntry: EntryWithoutId ): Patient => {
    const newEntryItem = {
        ...newEntry,
        id: '5'
    };
    console.log(newEntryItem);
    const modifiedPatient = findById(id);
    console.log(modifiedPatient);
    if (!modifiedPatient) {
        throw console.error("Unknown id");
    }
    modifiedPatient.entries.push(newEntryItem);
    return modifiedPatient;
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
  findById,
  addEntryForPatient
};