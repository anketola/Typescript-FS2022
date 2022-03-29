import patientsData from '../../data/patients.json';
import { NonSensitiveDataPatients } from '../types';


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

export default {
  getPatients,
  getNonSensitivePatients
};