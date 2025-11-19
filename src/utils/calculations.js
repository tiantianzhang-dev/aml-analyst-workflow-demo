// Population Stability Index calculation
export const calculatePSI = (actual, expected) => {
  if (!actual || !expected || actual.length !== expected.length) return 0;
  
  let psi = 0;
  for (let i = 0; i < actual.length; i++) {
    const actPct = actual[i];
    const expPct = expected[i];
    
    if (actPct > 0 && expPct > 0) {
      psi += (actPct - expPct) * Math.log(actPct / expPct);
    }
  }
  
  return Math.abs(psi);
};

// Risk score calculation for onboarding
export const calculateOnboardingRisk = (inputs) => {
  const {
    deviceTrustScore = 50,
    geoRiskScore = 50,
    kycCompleteness = 50,
    behavioralAnomaly = 50
  } = inputs;
  
  const score = (
    0.35 * (100 - deviceTrustScore) +
    0.25 * geoRiskScore +
    0.20 * (100 - kycCompleteness) +
    0.20 * behavioralAnomaly
  );
  
  return Math.round(score * 10) / 10;
};

// Alert severity calculation
export const calculateAlertSeverity = (amount, riskScore, velocityFactor) => {
  const normalizedAmount = Math.min(amount / 10000, 1);
  const normalizedRisk = riskScore / 100;
  const normalizedVelocity = Math.min(velocityFactor / 10, 1);
  
  return Math.round((normalizedAmount * 0.3 + normalizedRisk * 0.5 + normalizedVelocity * 0.2) * 100);
};

// Business cost calculation
export const calculateBusinessCost = (falsePositives, falseNegatives, fpCost = 50, fnCost = 5000) => {
  return (falsePositives * fpCost) + (falseNegatives * fnCost);
};

// Detection rate calculation
export const calculateDetectionRate = (truePositives, falseNegatives) => {
  const total = truePositives + falseNegatives;
  if (total === 0) return 0;
  return (truePositives / total) * 100;
};

// False positive rate calculation
export const calculateFalsePositiveRate = (falsePositives, trueNegatives) => {
  const total = falsePositives + trueNegatives;
  if (total === 0) return 0;
  return (falsePositives / total) * 100;
};

// Format currency
export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    operational: 'text-success',
    degraded: 'text-warning',
    down: 'text-danger',
    stable: 'text-success',
    monitor: 'text-warning',
    alert: 'text-danger',
    compliant: 'text-success',
    pending: 'text-warning',
    non_compliant: 'text-danger'
  };
  
  return colors[status] || 'text-gray-500';
};

// Get trend indicator
export const getTrendIndicator = (current, previous, inverseGood = false) => {
  const diff = current - previous;
  const isPositive = inverseGood ? diff < 0 : diff > 0;
  
  return {
    direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat',
    isGood: isPositive,
    percentage: previous !== 0 ? Math.abs((diff / previous) * 100) : 0
  };
};

// Generate time series data
export const generateTimeSeriesData = (hours = 24, baseValue = 20, variance = 10) => {
  return Array.from({ length: hours }, (_, i) => {
    const hour = new Date();
    hour.setHours(i);
    
    return {
      timestamp: hour.toISOString(),
      value: Math.floor(Math.random() * variance) + baseValue,
      hour: `${String(i).padStart(2, '0')}:00`
    };
  });
};

// Confusion matrix metrics
export const calculateConfusionMetrics = (tp, fp, tn, fn) => {
  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
  const accuracy = (tp + tn) / (tp + fp + tn + fn) || 0;
  
  return {
    precision: Math.round(precision * 100) / 100,
    recall: Math.round(recall * 100) / 100,
    f1Score: Math.round(f1Score * 100) / 100,
    accuracy: Math.round(accuracy * 100) / 100
  };
};
