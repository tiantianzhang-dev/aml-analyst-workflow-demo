import React, { useState } from 'react';
import { Activity, Server, AlertCircle, CheckCircle, FileText, TrendingUp } from 'lucide-react';
import { pipelineMetrics, recentAlerts, regulatoryFramework } from '../data/mockData';

const ProductionMonitoring = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const getStatusBadge = (status) => {
    const styles = {
      pending_review: 'bg-yellow-100 text-yellow-800',
      escalated: 'bg-red-100 text-red-800',
      auto_resolved: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-300';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-300';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-300';
    return 'text-green-600 bg-green-50 border-green-300';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Production Monitoring & Real-Time Pipeline</h2>
        <p className="text-gray-600">15:00-16:30 - Production monitoring & alert triage</p>
      </div>

      {/* Real-Time Pipeline Metrics */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Server className="w-5 h-5 mr-2 text-primary" />
          Real-Time Pipeline Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="metric-card">
            <div className="text-sm text-gray-600 mb-1">Queue Size</div>
            <div className="text-3xl font-bold text-gray-900">{pipelineMetrics.queueSize}</div>
            <div className="text-xs text-success mt-1">Within normal range</div>
          </div>

          <div className="metric-card">
            <div className="text-sm text-gray-600 mb-1">Processing Latency</div>
            <div className="text-3xl font-bold text-gray-900">{pipelineMetrics.processingLatency}s</div>
            <div className="text-xs text-success mt-1">Below 2s SLA</div>
          </div>

          <div className="metric-card">
            <div className="text-sm text-gray-600 mb-1">Error Rate</div>
            <div className="text-3xl font-bold text-gray-900">{(pipelineMetrics.errorRate * 100).toFixed(2)}%</div>
            <div className="text-xs text-success mt-1">Below 0.1% target</div>
          </div>

          <div className="metric-card">
            <div className="text-sm text-gray-600 mb-1">Throughput</div>
            <div className="text-3xl font-bold text-gray-900">{pipelineMetrics.throughput}</div>
            <div className="text-xs text-gray-500 mt-1">transactions/min</div>
          </div>

          <div className="metric-card">
            <div className="text-sm text-gray-600 mb-1">Last Hour Processed</div>
            <div className="text-3xl font-bold text-gray-900">{pipelineMetrics.lastHourProcessed.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">transactions</div>
          </div>
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-primary" />
          System Health Indicators
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-success mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Model API</div>
                <div className="text-sm text-gray-600">Response time: 145ms avg</div>
              </div>
            </div>
            <span className="status-badge bg-green-100 text-green-800">Healthy</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-success mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Alert Queue</div>
                <div className="text-sm text-gray-600">Processing: 23 pending</div>
              </div>
            </div>
            <span className="status-badge bg-green-100 text-green-800">Healthy</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-success mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Data Pipeline</div>
                <div className="text-sm text-gray-600">Lag: 0.8s behind real-time</div>
              </div>
            </div>
            <span className="status-badge bg-green-100 text-green-800">Healthy</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-success mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Feature Store</div>
                <div className="text-sm text-gray-600">Cache hit rate: 96.4%</div>
              </div>
            </div>
            <span className="status-badge bg-green-100 text-green-800">Healthy</span>
          </div>
        </div>
      </div>

      {/* Alert Triage System */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-primary" />
          Recent High-Risk Alerts
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alert ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedAlert(alert)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {alert.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold border ${getRiskColor(alert.riskScore)}`}>
                      {alert.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.amount ? `${alert.amount.toLocaleString()} ${alert.currency}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${getStatusBadge(alert.status)}`}>
                      {alert.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary hover:text-blue-900 font-medium">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedAlert && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Alert Details: {selectedAlert.id}</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div><span className="font-medium">Risk Factors:</span></div>
              <ul className="ml-4 list-disc space-y-1">
                {selectedAlert.factors.map((factor, idx) => (
                  <li key={idx}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Alert Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Alert Processing Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="metric-card border-l-4 border-l-red-500">
            <div className="text-sm text-gray-600 mb-1">High Risk Alerts</div>
            <div className="text-3xl font-bold text-red-600">12</div>
            <div className="text-xs text-gray-500 mt-1">Requiring human review</div>
          </div>

          <div className="metric-card border-l-4 border-l-green-500">
            <div className="text-sm text-gray-600 mb-1">Auto-Closed</div>
            <div className="text-3xl font-bold text-green-600">311</div>
            <div className="text-xs text-gray-500 mt-1">Below risk threshold</div>
          </div>

          <div className="metric-card border-l-4 border-l-orange-500">
            <div className="text-sm text-gray-600 mb-1">Escalated</div>
            <div className="text-3xl font-bold text-orange-600">24</div>
            <div className="text-xs text-gray-500 mt-1">To compliance team</div>
          </div>
        </div>
      </div>

      {/* Regulatory Compliance Status */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-primary" />
          Regulatory Compliance Status
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Regulation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coverage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regulatoryFramework.map((reg) => (
                <tr key={reg.regulation}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reg.regulation}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {reg.coverage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="status-badge bg-green-100 text-green-800">
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* End of Day Summary */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          End of Day Summary Report
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Today's Achievements</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5" />
                <span>Processed 347 alerts with 87.3% detection rate</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5" />
                <span>Reduced false positive rate to 4.2% (below target)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5" />
                <span>Validated model v2.4.0 for deployment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5" />
                <span>All systems operational with no incidents</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Tomorrow's Priorities</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 mt-0.5"></div>
                <span>Deploy model v2.4.0 to shadow mode</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 mt-0.5"></div>
                <span>Review 12 high-risk alerts pending investigation</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 mt-0.5"></div>
                <span>Continue feature engineering for device fingerprint</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 mt-0.5"></div>
                <span>Stakeholder meeting: Q4 model performance review</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionMonitoring;
