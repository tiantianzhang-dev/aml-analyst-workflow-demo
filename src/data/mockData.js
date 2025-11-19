export const alertData = {
  total: 347,
  critical: 12,
  high: 45,
  medium: 123,
  low: 167,
  autoResolved: 311,
  humanReview: 12,
  escalated: 24
};

export const systemHealth = [
  { system: 'Snowflake', status: 'operational', uptime: 99.97 },
  { system: 'Model API', status: 'operational', uptime: 99.94 },
  { system: 'Alert Pipeline', status: 'operational', uptime: 99.89 },
  { system: 'Scoring Service', status: 'operational', uptime: 99.91 }
];

export const kpiMetrics = {
  detectionRate: {
    current: 87.3,
    previous: 85.2,
    target: 85.0,
    trend: 'up'
  },
  falsePositiveRate: {
    current: 4.2,
    previous: 5.8,
    target: 5.0,
    trend: 'down'
  },
  alertLatency: {
    current: 1.3,
    previous: 1.7,
    target: 2.0,
    unit: 'seconds',
    trend: 'down'
  },
  alertVolume: {
    current: 347,
    previous: 412,
    target: 400,
    trend: 'down'
  }
};

export const driftMetrics = {
  psi: 0.08,
  status: 'acceptable',
  threshold: 0.25,
  features: [
    { name: 'transaction_amount', psi: 0.12, status: 'stable' },
    { name: 'device_trust_score', psi: 0.18, status: 'monitor' },
    { name: 'geo_risk_score', psi: 0.06, status: 'stable' },
    { name: 'velocity_7d', psi: 0.09, status: 'stable' },
    { name: 'kyc_completeness', psi: 0.04, status: 'stable' }
  ]
};

export const modelPerformance = {
  current: {
    precision: 0.89,
    recall: 0.83,
    rocAuc: 0.91,
    f1Score: 0.86,
    alertVolume: 347
  },
  baseline: {
    precision: 0.85,
    recall: 0.81,
    rocAuc: 0.88,
    f1Score: 0.83,
    alertVolume: 412
  }
};

export const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  alerts: Math.floor(Math.random() * 30) + 10,
  falsePositives: Math.floor(Math.random() * 5),
  truePositives: Math.floor(Math.random() * 15) + 5
}));

export const featureImportance = [
  { feature: 'transaction_amount', importance: 0.28 },
  { feature: 'geo_risk_score', importance: 0.22 },
  { feature: 'device_trust_score', importance: 0.18 },
  { feature: 'velocity_7d', importance: 0.15 },
  { feature: 'kyc_completeness', importance: 0.10 },
  { feature: 'behavioral_anomaly', importance: 0.07 }
];

export const recentAlerts = [
  {
    id: 'ALT-2024-1147',
    timestamp: '2024-11-18 08:23:14',
    riskScore: 87,
    type: 'Transaction Monitoring',
    amount: 15420.50,
    currency: 'EUR',
    status: 'pending_review',
    factors: ['High velocity', 'New device', 'Geo mismatch']
  },
  {
    id: 'ALT-2024-1148',
    timestamp: '2024-11-18 08:31:42',
    riskScore: 92,
    type: 'Onboarding Risk',
    amount: null,
    currency: null,
    status: 'escalated',
    factors: ['Synthetic identity indicators', 'KYC mismatch', 'Device fingerprint anomaly']
  },
  {
    id: 'ALT-2024-1149',
    timestamp: '2024-11-18 08:45:08',
    riskScore: 74,
    type: 'Transaction Monitoring',
    amount: 8750.00,
    currency: 'USD',
    status: 'pending_review',
    factors: ['Structuring pattern', 'High velocity']
  },
  {
    id: 'ALT-2024-1150',
    timestamp: '2024-11-18 08:52:33',
    riskScore: 68,
    type: 'Transaction Monitoring',
    amount: 4230.75,
    currency: 'GBP',
    status: 'auto_resolved',
    factors: ['Velocity spike']
  }
];

export const regulatoryFramework = [
  { regulation: 'AMLD 5/6', coverage: 'Alert thresholds, Customer due diligence', status: 'compliant' },
  { regulation: 'EU AMLA', coverage: 'Centralized monitoring approach', status: 'compliant' },
  { regulation: 'GDPR', coverage: 'Model explainability, Automated decision-making', status: 'compliant' },
  { regulation: 'AML/CTF', coverage: 'Transaction monitoring, KYC integration', status: 'compliant' }
];

export const pipelineMetrics = {
  queueSize: 23,
  processingLatency: 1.1,
  errorRate: 0.03,
  throughput: 847,
  lastHourProcessed: 3420
};

export const businessMetrics = {
  reviewCostPerAlert: 50,
  fraudCostPerMiss: 5000,
  currentDailyCost: 0,
  baselineDailyCost: 0,
  annualSavings: 0
};

// Calculate business costs
businessMetrics.currentDailyCost = (modelPerformance.current.alertVolume * modelPerformance.current.precision * businessMetrics.reviewCostPerAlert) + 
  ((1 - modelPerformance.current.recall) * 100 * businessMetrics.fraudCostPerMiss);

businessMetrics.baselineDailyCost = (modelPerformance.baseline.alertVolume * modelPerformance.baseline.precision * businessMetrics.reviewCostPerAlert) + 
  ((1 - modelPerformance.baseline.recall) * 100 * businessMetrics.fraudCostPerMiss);

businessMetrics.annualSavings = Math.round((businessMetrics.baselineDailyCost - businessMetrics.currentDailyCost) * 365);
