import React, { useState } from 'react';
import { Code, GitBranch, PlayCircle, CheckCircle2 } from 'lucide-react';

const FeatureEngineering = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [pipelineStatus, setPipelineStatus] = useState('idle');

  const sqlCode = `-- Feature extraction query for transaction monitoring
SELECT 
    t.user_id,
    t.transaction_id,
    t.amount,
    t.currency,
    t.timestamp,
    
    -- Device fingerprint features
    d.device_trust_score,
    d.new_device_flag,
    d.device_age_days,
    
    -- Geographic features
    g.geo_risk_score,
    g.country_risk_tier,
    CASE WHEN g.country != u.registered_country THEN 1 ELSE 0 END as geo_mismatch,
    
    -- Velocity features
    COUNT(*) OVER (
        PARTITION BY t.user_id 
        ORDER BY t.timestamp 
        RANGE BETWEEN INTERVAL '7 days' PRECEDING AND CURRENT ROW
    ) as transaction_count_7d,
    
    SUM(t.amount) OVER (
        PARTITION BY t.user_id 
        ORDER BY t.timestamp 
        RANGE BETWEEN INTERVAL '24 hours' PRECEDING AND CURRENT ROW
    ) as total_amount_24h,
    
    -- KYC metadata
    u.kyc_completion_score,
    u.account_age_days,
    u.verification_level

FROM transactions t
LEFT JOIN device_fingerprints d ON t.device_id = d.device_id
LEFT JOIN geolocation g ON t.ip_address = g.ip_address
LEFT JOIN users u ON t.user_id = u.user_id

WHERE t.timestamp >= CURRENT_DATE - INTERVAL '30 days'
    AND t.status = 'completed';`;

  const pythonCode = `import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

def engineer_risk_features(df):
    """
    Engineer risk features for AML transaction monitoring
    """
    features = df.copy()
    
    # Device risk score calculation
    features['device_risk_score'] = (
        features['new_device_flag'] * 0.3 + 
        (1 - features['device_trust_score']) * 0.4 + 
        (features['device_age_days'] < 7).astype(int) * 0.3
    )
    
    # Velocity anomaly score
    features['velocity_anomaly'] = (
        features['transaction_count_7d'] > 
        features.groupby('user_id')['transaction_count_7d'].transform('mean') * 2
    ).astype(int)
    
    # Amount normalization by user history
    user_avg = features.groupby('user_id')['amount'].transform('mean')
    user_std = features.groupby('user_id')['amount'].transform('std')
    features['amount_zscore'] = (features['amount'] - user_avg) / (user_std + 1e-6)
    
    # Geographic risk composite
    features['geo_composite_risk'] = (
        features['geo_risk_score'] * 0.6 +
        features['geo_mismatch'] * 0.4
    )
    
    return features

def train_isolation_forest(features, contamination=0.01):
    """
    Train Isolation Forest for anomaly detection
    """
    feature_cols = [
        'device_risk_score', 'velocity_anomaly', 
        'amount_zscore', 'geo_composite_risk'
    ]
    
    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(features[feature_cols])
    
    # Train model
    model = IsolationForest(
        contamination=contamination,
        random_state=42,
        n_estimators=100
    )
    
    # Predict anomaly scores
    features['isolation_score'] = model.fit_predict(X_scaled)
    features['anomaly_score'] = model.score_samples(X_scaled)
    
    return features, model, scaler

# Usage example
df = pd.read_sql(query, connection)
df_features = engineer_risk_features(df)
df_scored, model, scaler = train_isolation_forest(df_features)

# Save for deployment
import joblib
joblib.dump(model, 'models/isolation_forest_v2_4_0.pkl')
joblib.dump(scaler, 'models/scaler_v2_4_0.pkl')`;

  const simulatePipeline = () => {
    setPipelineStatus('running');
    setTimeout(() => setPipelineStatus('success'), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Feature Engineering Workbench</h2>
        <p className="text-gray-600">10:00-11:00 - Model & Feature Engineering Focus</p>
      </div>

      {/* Code Editor Section */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Code className="w-5 h-5 mr-2 text-primary" />
            Feature Engineering Code
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedLanguage('sql')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLanguage === 'sql'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              SQL (Snowflake)
            </button>
            <button
              onClick={() => setSelectedLanguage('python')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLanguage === 'python'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Python
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono">
            <code>{selectedLanguage === 'sql' ? sqlCode : pythonCode}</code>
          </pre>
        </div>
      </div>

      {/* Feature Descriptions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Feature Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Device Fingerprint Features</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Device trust score (0-100)</li>
              <li>• New device flag (binary)</li>
              <li>• Device age in days</li>
              <li>• Device fingerprint anomaly</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Geographic Risk Features</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Country risk tier (1-5)</li>
              <li>• Geographic mismatch flag</li>
              <li>• IP reputation score</li>
              <li>• Geo-velocity anomaly</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Velocity Features</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Transaction count (7d, 30d)</li>
              <li>• Total amount (24h, 7d)</li>
              <li>• Velocity spike indicator</li>
              <li>• Unusual timing patterns</li>
            </ul>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">KYC Metadata Features</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• KYC completion score</li>
              <li>• Account age in days</li>
              <li>• Verification level (1-3)</li>
              <li>• Document authenticity score</li>
            </ul>
          </div>
        </div>
      </div>

      {/* GitHub Integration */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <GitBranch className="w-5 h-5 mr-2 text-primary" />
          Version Control & CI/CD Pipeline
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-sm text-gray-700">
                feature/transaction-monitoring-v2.4.0
              </div>
              <span className="status-badge bg-blue-100 text-blue-800">Active Branch</span>
            </div>
            <div className="text-sm text-gray-600">
              Last commit: Add Isolation Forest anomaly detection
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={simulatePipeline}
              disabled={pipelineStatus === 'running'}
              className="btn-primary flex items-center"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Run CI/CD Pipeline
            </button>
            {pipelineStatus === 'success' && (
              <div className="flex items-center text-success">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Pipeline passed successfully
              </div>
            )}
          </div>

          {pipelineStatus !== 'idle' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Unit Tests</span>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Code Linting (flake8, black)</span>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Data Validation Tests</span>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Model Performance Tests</span>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ML Techniques */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Machine Learning Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Isolation Forest</h4>
            <p className="text-sm text-gray-600 mb-2">
              Unsupervised anomaly detection for identifying unusual transaction patterns
            </p>
            <div className="text-xs text-gray-500">
              Contamination: 0.01 (1% expected anomalies)
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">XGBoost</h4>
            <p className="text-sm text-gray-600 mb-2">
              Supervised classification for labeled fraud cases
            </p>
            <div className="text-xs text-gray-500">
              Gradient boosting with feature importance tracking
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">Rule-Based Scoring</h4>
            <p className="text-sm text-gray-600 mb-2">
              Compliance-driven thresholds for regulatory requirements
            </p>
            <div className="text-xs text-gray-500">
              AMLD 5/6 threshold alignment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureEngineering;
