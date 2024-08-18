interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  targetHours: number;
  dailyHours: number[];
}

const parseExerciseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (!args.slice(2).some((arg) => isNaN(Number(arg)))) {
    return {
      targetHours: Number(args[2]),
      dailyHours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce(
    (acc, day) => acc + (day !== 0 ? 1 : 0),
    0
  );
  const totalHours = dailyHours.reduce((acc, day) => acc + day, 0);
  const average = totalHours / periodLength;
  const target = targetHours;
  const success = average > targetHours;
  let rating: number;
  let ratingDescription: string;
  if (!success) {
    rating = 1;
    ratingDescription = 'You did not meet your training goal';
  } else if (average - targetHours < 1) {
    rating = 2;
    ratingDescription = 'You met your training goal';
  } else if (average - targetHours >= 1) {
    rating = 3;
    ratingDescription = 'You greatly exceeded your training goal';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { targetHours, dailyHours } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(dailyHours, targetHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
