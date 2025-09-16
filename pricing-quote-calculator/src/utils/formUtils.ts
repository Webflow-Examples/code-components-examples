/**
 * Utility functions for form validation and data handling
 */

export interface FormData {
  height: number;
  weight: number;
  age: number;
  sex: string;
  coverage: number;
}

export interface Results {
  monthly: number;
  annual: number;
}

/**
 * Validate that all required form fields are filled
 */
export const validateFormData = (formData: FormData): string | null => {
  const { height, weight, age, sex, coverage } = formData;
  
  if (!height || !weight || !age || !sex || !coverage) {
    return 'Please fill in all fields to calculate your premium.';
  }
  
  return null;
};

/**
 * Form input onChange handler for Input and Select elements
 */
export const createInputChangeHandler = (
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Clear error message when user starts typing
    setErrorMessage('');
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
};

/**
 * Form input coverage change handler for range input
 */
export const createCoverageChangeHandler = (
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // Clear error message when user interacts with form
    setErrorMessage('');
    setFormData(prev => ({
      ...prev,
      coverage: value
    }));
  };
};
