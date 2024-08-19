import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  if (!req.query.height || !req.query.weight) {
    res
      .status(400)
      .json({ error: 'Missing parameters: height and weight are required' });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: 'Malformatted parameters: height and weight must be numbers',
    });
  }

  try {
    const result = calculateBmi(Number(height), Number(weight));
    res.send({ ...req.query, bmi: result });
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
