import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post('/exercises', (req, res) => {
  const target = req.body.target;
  const daily = req.body.daily_exercises;
  if (!target || !daily) {
    const error = "parameters missing";
    return res.status(400).json({
      error
    })
  }
  if (isNaN(target) || !Array.isArray(daily)) {
    const error = "malformatted parameters";
    return res.status(400).json({
      error
    })
  }
  const results = calculateExercises(target, daily);
  console.log(results);
  return res.json(results);
});

app.get('/bmi', (req, res) => {
  //console.log(req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    const error = "malformatted parameters";
    return res.json({
      error
    });
  }
  const bmi = String(calculateBmi(height, weight));
  //console.log(bmi;
  return res.json({
    weight,
    height,
    bmi
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});