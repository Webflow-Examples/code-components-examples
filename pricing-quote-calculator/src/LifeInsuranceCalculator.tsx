import React, { useState } from 'react';
import { generateHeightOptions, calculatePremium } from './utils/insuranceCalculations';
import { formatCurrency, formatCoverage } from './utils/formatters';

interface LifeInsuranceCalculatorProps {
  defaultHeight?: number;
  defaultWeight?: number;
  defaultAge?: number;
  defaultSex?: 'male' | 'female';
  defaultCoverage?: number;
  title?: string;
  showTitle?: boolean;
  buttonText?: string;
  primaryColor?: string;
  ctaButtonText?: string;
  ctaLink?: string;
}

interface FormData {
  height: number;
  weight: number;
  age: number;
  sex: string;
  coverage: number;
}

interface Results {
  monthly: number;
  annual: number;
}

const LifeInsuranceCalculator: React.FC<LifeInsuranceCalculatorProps> = ({
  defaultHeight = 68, // 5'8" default
  defaultWeight = 170,
  defaultAge = 35,
  defaultSex = 'male',
  defaultCoverage = 250000,
  title = 'Life Insurance Quote Calculator',
  showTitle = true,
  buttonText = 'Calculate Premium',
  primaryColor = '#570df8',
  ctaButtonText = 'Get Started',
  ctaLink = '#'
}) => {
  const [formData, setFormData] = useState<FormData>({
    height: defaultHeight,
    weight: defaultWeight,
    age: defaultAge,
    sex: defaultSex,
    coverage: defaultCoverage
  });
  
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const heightOptions = generateHeightOptions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // Clear error message when user interacts with form
    if (errorMessage) {
      setErrorMessage('');
    }
    setFormData(prev => ({
      ...prev,
      coverage: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { height, weight, age, sex, coverage } = formData;
    
    // Validate all fields are filled
    if (!height || !weight || !age || !sex || !coverage) {
      setErrorMessage('Please fill in all fields to calculate your premium.');
      return;
    }
    
    // Clear any existing error
    setErrorMessage('');

    const monthlyPremium = calculatePremium(
      coverage, 
      age, 
      sex as 'male' | 'female', 
      height, 
      weight
    );
    const annualPremium = monthlyPremium * 12;

    setResults({
      monthly: monthlyPremium,
      annual: annualPremium
    });
    setShowResults(true);
  };

  const handleBackToForm = () => {
    setShowResults(false);
    setResults(null);
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[600px]">
        {!showResults ? (
          // Form View
          <div className="p-8">
            {showTitle && (
              <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: primaryColor }}>
                {title}
              </h1>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Height Input */}
              <div className="form-control">
                <label htmlFor="height-input" className="label">
                  <span className="label-text font-semibold">Height</span>
                </label>
                <select 
                  id="height-input"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="select select-bordered w-full" 
                  required
                >
                  <option value="">Select your height</option>
                  {heightOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weight Input */}
              <div className="form-control">
                <label htmlFor="weight-input" className="label">
                  <span className="label-text font-semibold">Weight (lbs)</span>
                </label>
                <input 
                  id="weight-input"
                  type="number" 
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="input input-bordered w-full" 
                  min="50" 
                  max="500" 
                  step="1"
                  placeholder="Enter your weight"
                  required
                />
              </div>

              {/* Age Input */}
              <div className="form-control">
                <label htmlFor="age-input" className="label">
                  <span className="label-text font-semibold">Age</span>
                </label>
                <input 
                  id="age-input"
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="input input-bordered w-full" 
                  min="10" 
                  max="120" 
                  step="1"
                  placeholder="Enter your age"
                  required
                />
              </div>

              {/* Sex Input */}
              <div className="form-control">
                <label htmlFor="sex-input" className="label">
                  <span className="label-text font-semibold">Sex assigned at birth</span>
                </label>
                <select 
                  id="sex-input"
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="select select-bordered w-full" 
                  required
                >
                  <option value="">Select sex assigned at birth</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Coverage Amount */}
              <div className="form-control">
                <label htmlFor="coverage-input" className="label">
                  <span className="label-text font-semibold">Coverage Amount</span>
                </label>
                <input 
                  id="coverage-input"
                  type="range" 
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleCoverageChange}
                  className="range range-primary block w-full" 
                  min="100000" 
                  max="1000000" 
                  step="50000"
                  style={{ accentColor: primaryColor }}
                  aria-label="Coverage amount from $100,000 to $1,000,000"
                />
                <div className="w-full flex justify-between text-xs px-2 mt-2 relative">
                  <span className="absolute left-0">$100K</span>
                  <span className="absolute right-0">$1M</span>
                </div>
                <div className="text-center mt-4">
                  <span className="text-lg font-bold" style={{ color: primaryColor }}>
                    {formatCoverage(formData.coverage)}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-error mt-6">
                  <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Calculate Button */}
              <div className="form-control mt-8">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-full"
                  style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Results View
          <div className="p-8 h-full flex flex-col justify-between">
            {/* Back Button */}
            <div className="flex items-center mb-8">
              <button 
                onClick={handleBackToForm}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>

            {/* Results */}
            <div className="flex-1 flex flex-col justify-center text-center">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">Your Estimated Premium</h3>
              
              <div className="mb-8">
                <div className="text-6xl font-black mb-2" style={{ color: primaryColor }}>
                  {results && formatCurrency(results.monthly)}
                </div>
                <div className="text-xl font-semibold text-gray-600 mb-4">
                  per month
                </div>
                <div className="text-lg text-gray-500">
                  {results && formatCurrency(results.annual)}/year
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <a 
                href={ctaLink}
                className="btn btn-primary btn-lg w-full"
                style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
              >
                {ctaButtonText}
              </a>
              <small><b>Note: </b> This is only an example calculation for the purposes of a demo code component and the rate/premium shown here is not a real quote or representation of a legitimate premium estimate.</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeInsuranceCalculator;
