import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}))


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});