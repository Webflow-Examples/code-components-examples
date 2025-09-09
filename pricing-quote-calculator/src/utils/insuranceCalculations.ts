// Age-based rates per $1,000 of coverage (monthly)
export interface HeightOption {
  value: number;
  display: string;
}

export interface AgeRates {
  [key: number]: number;
}

export interface GenderRates {
  male: AgeRates;
  female: AgeRates;
}

export const AGE_RATES: GenderRates = {
  male: {
    18: 0.08, 20: 0.09, 25: 0.10, 30: 0.12, 35: 0.15, 40: 0.18,
    45: 0.25, 50: 0.35, 55: 0.50, 60: 0.70, 65: 1.00, 70: 1.40,
    75: 2.00, 80: 3.00, 85: 4.50, 90: 6.50, 95: 9.00, 100: 12.00
  },
  female: {
    18: 0.06, 20: 0.07, 25: 0.08, 30: 0.10, 35: 0.12, 40: 0.15,
    45: 0.20, 50: 0.28, 55: 0.40, 60: 0.55, 65: 0.80, 70: 1.10,
    75: 1.60, 80: 2.40, 85: 3.60, 90: 5.20, 95: 7.20, 100: 9.60
  }
};

/**
 * Generate height options from 4'0" to 7'0"
 * @returns Array of height options with value (inches) and display text
 */
export const generateHeightOptions = (): HeightOption[] => {
  const options: HeightOption[] = [];
  for (let feet = 4; feet <= 7; feet++) {
    const maxInches = feet === 7 ? 0 : 11; // 7'0" is the max
    for (let inches = 0; inches <= maxInches; inches++) {
      const totalInches = feet * 12 + inches;
      const display = `${feet}'${inches}"`;
      options.push({ value: totalInches, display });
    }
  }
  return options;
};

/**
 * Get age-based rate for given age and gender
 * @param age - Age of the person
 * @param gender - Gender ('male' or 'female')
 * @returns Age-based rate per $1,000 of coverage
 */
export const getAgeRate = (age: number, gender: 'male' | 'female'): number => {
  const rates = AGE_RATES[gender];
  const ages = Object.keys(rates).map(Number).sort((a, b) => a - b);
  
  // Find the closest age bracket
  for (let i = 0; i < ages.length; i++) {
    if (age <= ages[i]) {
      return rates[ages[i]];
    }
  }
  
  // If age is higher than our highest bracket, use the highest rate
  return rates[ages[ages.length - 1]];
};

/**
 * Calculate BMI from height and weight
 * @param height - Height in inches
 * @param weight - Weight in pounds
 * @returns BMI value
 */
export const calculateBMI = (height: number, weight: number): number => {
  const heightInMeters = (height * 2.54) / 100;
  const weightInKg = weight * 0.453592;
  return weightInKg / (heightInMeters * heightInMeters);
};

/**
 * Get BMI multiplier for premium calculation
 * @param bmi - BMI value
 * @returns Multiplier for premium calculation
 */
export const getBMIMultiplier = (bmi: number): number => {
  if (bmi < 18.5 || bmi > 30) {
    return 1.2; // 20% increase for underweight or obese
  } else if (bmi > 25) {
    return 1.1; // 10% increase for overweight
  }
  return 1.0; // Normal weight
};

/**
 * Calculate dummy monthly premium for life insurance based on loose equation here:
 * https://thagency.com/how-to-calculate-life-insurance-premium-formula-steps/
 * Note: This is not a real premium calculation and is only for demonstration purposes.
 * 
 * @param coverageAmount - Coverage amount in dollars
 * @param age - Age of the person
 * @param gender - Gender ('male' or 'female')
 * @param height - Height in inches
 * @param weight - Weight in pounds
 * @returns Monthly premium amount
 */
export const calculatePremium = (
  coverageAmount: number, 
  age: number, 
  gender: 'male' | 'female', 
  height: number, 
  weight: number
): number => {
  const baseRate = getAgeRate(age, gender);
  const bmi = calculateBMI(height, weight);
  const bmiMultiplier = getBMIMultiplier(bmi);
  
  const units = coverageAmount / 1000;
  return Math.round(units * baseRate * bmiMultiplier * 100) / 100;
};
