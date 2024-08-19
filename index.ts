import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req: Request, res: Response) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({
      error: 'Missing parameters: daily_exercises and target are required',
    });
  } else {
    const dailyHours: number[] = req.body.daily_exercises.map((n: string) =>
      Number(n)
    );
    const target: number = Number(req.body.target);

    if (dailyHours.some((n) => isNaN(n)) || isNaN(target)) {
      res.status(400).json({
        error: 'Malformatted parameters: all parameters must be numbers',
      });
    }
    res.send('Request okay');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
