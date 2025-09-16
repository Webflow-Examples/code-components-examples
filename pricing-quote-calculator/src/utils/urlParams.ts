/**
 * Get a query parameter value from the current URL
 */
export const getQueryParam = (param: string): string | null => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

/**
 * Get a numeric query parameter with fallback value
 */
export const getNumericQueryParam = (param: string, fallback: number): number => {
  const value = getQueryParam(param);
  if (value === null) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Get a string query parameter with fallback value
 */
export const getStringQueryParam = (param: string, fallback: string): string => {
  const value = getQueryParam(param);
  return value === null ? fallback : value;
};

/**
 * Parse all quote-related query parameters and return form data
 */
export const parseQuoteParams = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const formData: { [key: string]: any } = {};

  // Parse height parameter
  if (urlParams.has('quote_height')) {
    const height = parseInt(urlParams.get('quote_height') || '68', 10);
    if (!isNaN(height)) formData.height = height;
  }

  // Parse weight parameter
  if (urlParams.has('quote_weight')) {
    const weight = parseInt(urlParams.get('quote_weight') || '170', 10);
    if (!isNaN(weight)) formData.weight = weight;
  }

  // Parse age parameter
  if (urlParams.has('quote_age')) {
    const age = parseInt(urlParams.get('quote_age') || '35', 10);
    if (!isNaN(age)) formData.age = age;
  }

  // Parse sex parameter
  if (urlParams.has('quote_sex')) {
    const sex = urlParams.get('quote_sex');
    if (sex === 'male' || sex === 'female') formData.sex = sex;
  }

  // Parse coverage parameter
  if (urlParams.has('quote_coverage')) {
    const coverage = parseInt(urlParams.get('quote_coverage') || '250000', 10);
    if (!isNaN(coverage)) formData.coverage = coverage;
  }

  return formData;
};

/**
 * Initialize form data with props, query params, and defaults
 */
export const initializeFormData = (props: {
  defaultHeight?: number;
  defaultWeight?: number;
  defaultAge?: number;
  defaultSex?: 'male' | 'female';
  defaultCoverage?: number;
}) => {
  const {
    defaultHeight,
    defaultWeight,
    defaultAge,
    defaultSex,
    defaultCoverage
  } = props;

  // Initialize values with props first, then fall back to query params, then defaults
  return {
    height: defaultHeight ?? getNumericQueryParam('quote_height', 68),
    weight: defaultWeight ?? getNumericQueryParam('quote_weight', 170),
    age: defaultAge ?? getNumericQueryParam('quote_age', 35),
    sex: defaultSex ?? getStringQueryParam('quote_sex', 'male'),
    coverage: defaultCoverage ?? getNumericQueryParam('quote_coverage', 250000)
  };
};
