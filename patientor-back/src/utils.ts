import { NewPatientEntry, Gender, HealthCheckEntry, EntryWithoutId } from './types';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: []
  };

  return newEntry;
};

export const newEntryForPatient = (entryItem : any): EntryWithoutId => {
    switch (entryItem.type) {
        case 'HealthCheck':
            const newEntry: HealthCheckEntry = {
                id: "",
                description: parseString(entryItem.description),
                type: "HealthCheck",
                date: parseDate(entryItem.date),
                specialist: parseString(entryItem.specialist),
                healthCheckRating: entryItem.healthCheckRating,
                diagnosisCodes: []
            };
            return newEntry;
        default:
            throw console.error("No matching entry type");
        }

};



const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing string');
    }
  
    return comment;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};