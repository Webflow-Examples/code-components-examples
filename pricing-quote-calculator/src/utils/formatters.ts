/**
 * Format currency with proper locale formatting
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

/**
 * Format coverage amount in K or M notation
 * @param amount - Coverage amount in dollars
 * @returns Formatted coverage amount (e.g., "$250K", "$1.0M")
 */
export const formatCoverage = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${(amount / 1000)}K`;
};
