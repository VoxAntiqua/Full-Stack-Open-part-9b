const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi <= 29.9) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  }
};

const height: number = Number(process.argv[2]);
const mass: number = Number(process.argv[3]);

console.log(calculateBmi(height, mass));
