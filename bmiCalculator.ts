interface BmiValues {
  height: number;
  mass: number;
}

export const parseBmiArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  try {
    const { height, mass } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, mass));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
