import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
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