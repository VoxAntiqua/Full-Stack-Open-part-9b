interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 3, 2, 4.5, 5, 3, 1], 2));
