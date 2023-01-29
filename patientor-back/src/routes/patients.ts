import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, newEntryForPatient } from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patientById = patientsService.findById(req.params.id);
  if (patientById) {
    res.send(patientById)
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(req.body)
  const entryForPatientId = req.params.id;
  console.log(entryForPatientId);
  
  try {
    const addedEntry = newEntryForPatient(req.body);
    const addEntryToPatient = patientsService.addEntryForPatient(entryForPatientId, addedEntry);
    console.log(addEntryToPatient);
    res.json(addEntryToPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatientEntry);
        res.json(addedEntry);
      } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
  })

export default router;