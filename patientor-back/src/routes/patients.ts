import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';


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