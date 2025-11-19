import React, { useState, useEffect } from 'react';
import { UserCheck, Sliders, AlertTriangle, Shield } from 'lucide-react';
import { calculateOnboardingRisk } from '../utils/calculations';

const OnboardingRisk = () => {
  const [inputs, setInputs] = useState({
    deviceTrustScore: 75,
    geoRiskScore: 30,
    kycCompleteness: 85,
    behavioralAnomaly: 20
  });

  const [riskScore, setRiskScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');

  useEffect(() => {
    const score = calculateOnboardingRisk(inputs);
    setRiskScore(score);
    
    if (score < 30) setRiskLevel('Low');
    else if (score < 60) setRiskLevel('Medium');
    else if (score < 80) setRiskLevel('High');
    else setRiskLevel('Critical');
  }, [inputs]);

  const handleSliderChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const getRiskColor = () => {
    if (riskScore < 30) return 'text-green-600 bg-green-50 border-green-200';
    if (riskScore < 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (riskScore < 80) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getDecision = () => {
    if (riskScore < 30) return { action: 'Auto-Approve', color: 'text-green-700', icon: Shield };
    if (riskScore < 60) return { action: 'Standard Review', color: 'text-yellow-700', icon: UserCheck };
    if (riskScore < 80) return { action: 'Enhanced Due Diligence', color: 'text-orange-700', icon: AlertTriangle };
    return { action: 'Reject / Escalate', color: 'text-red-700', icon: AlertTriangle };
  };

  const decision = getDecision();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Onboarding Risk Scoring</h2>
        <p className="text-gray-600">13:15-14:15 - User onboarding risk assessment model</p>
      </div>

      {/* Risk Calculator */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-primary" />
          Interactive Risk Calculator
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Device Trust Score</label>
                <span className="text-sm font-semibold text-gray-900">{inputs.deviceTrustScore}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={inputs.deviceTrustScore}
                onChange={(e) => handleSliderChange('deviceTrustScore', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Untrusted</span>
                <span>Trusted</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Geographic Risk Score</label>
                <span className="text-sm font-semibold text-gray-900">{inputs.geoRiskScore}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={inputs.geoRiskScore}
                onChange={(e) => handleSliderChange('geoRiskScore', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low Risk</span>
                <span>High Risk</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">KYC Completeness</label>
                <span className="text-sm font-semibold text-gray-900">{inputs.kycCompleteness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={inputs.kycCompleteness}
                onChange={(e) => handleSliderChange('kycCompleteness', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Incomplete</span>
                <span>Complete</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Behavioral Anomaly</label>
                <span className="text-sm font-semibold text-gray-900">{inputs.behavioralAnomaly}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={inputs.behavioralAnomaly}
                onChange={(e) => handleSliderChange('behavioralAnomaly', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Normal</span>
                <span>Anomalous</span>
              </div>
            </div>
          </div>

          {/* Output Display */}
          <div className="space-y-4">
            <div className={`rounded-lg p-6 border-2 ${getRiskColor()}`}>
              <div className="text-center">
                <div className="text-sm font-medium mb-2">Overall Risk Score</div>
                <div className="text-6xl font-bold mb-2">{riskScore.toFixed(1)}</div>
                <div className="text-lg font-semibold">{riskLevel} Risk</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-center mb-3">
                <decision.icon className={`w-6 h-6 mr-2 ${decision.color}`} />
                <span className={`text-lg font-semibold ${decision.color}`}>
                  {decision.action}
                </span>
              </div>
              <div className="text-sm text-gray-600 text-center">
                Recommended action based on risk threshold
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-2">Formula Breakdown</div>
              <div className="space-y-1 text-xs text-blue-700 font-mono">
                <div>Risk = 0.35 × (100 - Device Trust)</div>
                <div className="ml-8">+ 0.25 × Geo Risk</div>
                <div className="ml-8">+ 0.20 × (100 - KYC)</div>
                <div className="ml-8">+ 0.20 × Behavioral</div>
              </div>
              <div className="mt-3 text-xs text-blue-600 bg-blue-100 rounded p-2">
                Current: 0.35×{(100 - inputs.deviceTrustScore).toFixed(0)} + 0.25×{inputs.geoRiskScore.toFixed(0)} + 0.20×{(100 - inputs.kycCompleteness).toFixed(0)} + 0.20×{inputs.behavioralAnomaly.toFixed(0)} = {riskScore.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Weights */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Feature Weight Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-700 mb-1">35%</div>
            <div className="text-sm text-purple-900">Device Trust</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-700 mb-1">25%</div>
            <div className="text-sm text-blue-900">Geo Risk</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-700 mb-1">20%</div>
            <div className="text-sm text-green-900">KYC Complete</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-3xl font-bold text-orange-700 mb-1">20%</div>
            <div className="text-sm text-orange-900">Behavioral</div>
          </div>
        </div>
      </div>

      {/* Decision Thresholds */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Risk Decision Thresholds</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="w-16 text-center font-bold text-green-700">0-30</div>
            <div className="flex-1 ml-4">
              <div className="font-semibold text-green-900">Auto-Approve</div>
              <div className="text-sm text-green-700">Low risk - automatic onboarding</div>
            </div>
            <Shield className="w-6 h-6 text-green-600" />
          </div>

          <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-16 text-center font-bold text-yellow-700">30-60</div>
            <div className="flex-1 ml-4">
              <div className="font-semibold text-yellow-900">Standard Review</div>
              <div className="text-sm text-yellow-700">Medium risk - standard due diligence required</div>
            </div>
            <UserCheck className="w-6 h-6 text-yellow-600" />
          </div>

          <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-16 text-center font-bold text-orange-700">60-80</div>
            <div className="flex-1 ml-4">
              <div className="font-semibold text-orange-900">Enhanced Due Diligence</div>
              <div className="text-sm text-orange-700">High risk - additional verification required</div>
            </div>
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>

          <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="w-16 text-center font-bold text-red-700">80-100</div>
            <div className="flex-1 ml-4">
              <div className="font-semibold text-red-900">Reject / Escalate</div>
              <div className="text-sm text-red-700">Critical risk - reject or escalate to senior analyst</div>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* API Integration */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">API Integration</h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono">
            <code>{`POST /api/v1/score-onboarding

Request:
{
  "user_id": "USR-2024-5891",
  "device_fingerprint": "${inputs.deviceTrustScore}",
  "geo_location": {
    "country": "NL",
    "risk_score": ${inputs.geoRiskScore}
  },
  "kyc_data": {
    "completeness": ${inputs.kycCompleteness},
    "verification_level": 2
  },
  "behavioral_score": ${inputs.behavioralAnomaly}
}

Response:
{
  "risk_score": ${riskScore.toFixed(1)},
  "risk_level": "${riskLevel}",
  "decision": "${decision.action}",
  "timestamp": "2024-11-18T13:45:22Z"
}`}</code>
          </pre>
        </div>
      </div>

      {/* Regulatory Context */}
      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">Regulatory Compliance</h3>
        <div className="space-y-2 text-sm text-purple-800">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 mr-3"></div>
            <div>
              <span className="font-semibold">GDPR Article 22:</span> Automated decision-making transparency provided through explainable risk scores
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 mr-3"></div>
            <div>
              <span className="font-semibold">AMLD 5/6:</span> Customer due diligence thresholds aligned with enhanced monitoring requirements
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 mr-3"></div>
            <div>
              <span className="font-semibold">AML/CTF:</span> KYC completeness scoring supports regulatory onboarding obligations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingRisk;
