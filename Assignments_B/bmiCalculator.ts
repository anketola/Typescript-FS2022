
const calculateBmi = (height: number, weight: number): string => {
    const BMI = (weight / ((height/100)**2));
    
    if (BMI < 16) return "Underweight (Severe thinness)";
    if (BMI >= 16 && BMI < 17) return "Underweight (Moderate thinness)";
    if (BMI >= 17 && BMI < 18.5) return "Underweight (Mild thinness)";
    if (BMI >= 18.5 && BMI < 25) return "Normal (healthy weight)";
    if (BMI >= 25 && BMI < 30) return "Overweight (Pre-obese)";
    if (BMI >= 30 && BMI < 35) return "Obese (Class I)";
    if (BMI >= 35 && BMI < 40) return "Obese (Class II)";
    if (BMI >= 40) return "Obese (Class III)";
    
}


console.log(calculateBmi(180, 74));