interface BmiValues {
    height: number;
    weight: number;
}


const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4 || args.length > 4) throw new Error("Please give two arguments, height (cm) and weight (kg).");
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error("Please provide height (cm) and weight (kg) as numbers.");
    }
  };

export const calculateBmi = (height: number, weight: number): string => {
    const BMI = (weight / ((height/100)**2));
    
    if (BMI < 16) return "Underweight (Severe thinness)";
    if (BMI >= 16 && BMI < 17) return "Underweight (Moderate thinness)";
    if (BMI >= 17 && BMI < 18.5) return "Underweight (Mild thinness)";
    if (BMI >= 18.5 && BMI < 25) return "Normal (healthy weight)";
    if (BMI >= 25 && BMI < 30) return "Overweight (Pre-obese)";
    if (BMI >= 30 && BMI < 35) return "Obese (Class I)";
    if (BMI >= 35 && BMI < 40) return "Obese (Class II)";
    if (BMI >= 40) return "Obese (Class III)";
    return "unknown";
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error) {
    let errorMessage = 'An error occurred.';
    if (error instanceof Error) {
        errorMessage += ' Error message: ' + error.message;
    }
    console.log(errorMessage);
  }
