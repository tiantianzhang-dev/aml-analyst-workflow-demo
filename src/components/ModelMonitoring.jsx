import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { kpiMetrics, driftMetrics, timeSeriesData, featureImportance } from '../data/mockData';
import { formatPercentage } from '../utils/calculations';

const ModelMonitoring = () => {
  const [selectedModel, setSelectedModel] = useState('transaction');

  const renderTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-success" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-success" />;
    return <Activity className="w-4 h-4 text-gray-400" />;
  };

  const calculateChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Model Performance Monitoring</h2>
          <p className="text-gray-600">09:00-10:00 - Alert & Model Monitoring Review</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedModel('transaction')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedModel === 'transaction'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Transaction Monitoring
          </button>
          <button
            onClick={() => setSelectedModel('onboarding')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedModel === 'onboarding'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Onboarding Risk
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-600">Detection Rate</div>
              {renderTrendIcon(kpiMetrics.detectionRate.trend)}
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {formatPercentage(kpiMetrics.detectionRate.current)}
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-success font-medium">
                +{calculateChange(kpiMetrics.detectionRate.current, kpiMetrics.detectionRate.previous)}%
              </span>
              <span className="text-gray-500 ml-2">vs. previous week</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Target: {formatPercentage(kpiMetrics.detectionRate.target)}
            </div>
          </div>

          <div className="metric-card">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-600">False Positive Rate</div>
              {renderTrendIcon(kpiMetrics.falsePositiveRate.trend)}
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {formatPercentage(kpiMetrics.falsePositiveRate.current)}
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-success font-medium">
                {calculateChange(kpiMetrics.falsePositiveRate.current, kpiMetrics.falsePositiveRate.previous)}%
              </span>
              <span className="text-gray-500 ml-2">vs. previous week</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Target: &lt;{formatPercentage(kpiMetrics.falsePositiveRate.target)}
            </div>
          </div>

          <div className="metric-card">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-600">Alert Latency</div>
              {renderTrendIcon(kpiMetrics.alertLatency.trend)}
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {kpiMetrics.alertLatency.current}s
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-success font-medium">
                {calculateChange(kpiMetrics.alertLatency.current, kpiMetrics.alertLatency.previous)}%
              </span>
              <span className="text-gray-500 ml-2">vs. previous week</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              SLA: &lt;{kpiMetrics.alertLatency.target}s
            </div>
          </div>

          <div className="metric-card">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-600">Alert Volume</div>
              {renderTrendIcon(kpiMetrics.alertVolume.trend)}
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {kpiMetrics.alertVolume.current}
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-success font-medium">
                {calculateChange(kpiMetrics.alertVolume.current, kpiMetrics.alertVolume.previous)}%
              </span>
              <span className="text-gray-500 ml-2">vs. previous week</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Target: ~{kpiMetrics.alertVolume.target}/day
            </div>
          </div>
        </div>
      </div>

      {/* 24-Hour Alert Trend */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">24-Hour Alert Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="alerts" stroke="#3b82f6" name="Total Alerts" strokeWidth={2} />
            <Line type="monotone" dataKey="truePositives" stroke="#22c55e" name="True Positives" strokeWidth={2} />
            <Line type="monotone" dataKey="falsePositives" stroke="#f59e0b" name="False Positives" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Drift Detection */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-primary" />
          Model Drift Detection (PSI Analysis)
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900">
                Overall PSI Score: {driftMetrics.psi.toFixed(3)}
              </div>
              <div className="text-sm text-blue-700 mt-1">
                Status: {driftMetrics.status.toUpperCase()} (Threshold: &lt;{driftMetrics.threshold})
              </div>
              <div className="text-xs text-blue-600 mt-2">
                PSI Calculation: Σ (% Actual - % Expected) × ln(% Actual / % Expected)
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSI Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {driftMetrics.features.map((feature) => (
                <tr key={feature.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feature.psi.toFixed(3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${
                      feature.status === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feature.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feature.status === 'monitor' ? 'Review distribution' : 'No action required'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Feature Importance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="feature" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="importance" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModelMonitoring;
