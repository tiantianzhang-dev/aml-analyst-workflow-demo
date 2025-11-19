import React from 'react';
import { Database, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { alertData, systemHealth } from '../data/mockData';

const MorningSetup = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Morning Setup & System Status</h2>
        <p className="text-gray-600">08:30-09:00 - Initial system checks and overnight alert review</p>
      </div>

      {/* System Health Dashboard */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-primary" />
          System Health Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemHealth.map((system) => (
            <div key={system.system} className="metric-card">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-700">{system.system}</h4>
                {system.status === 'operational' ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-warning" />
                )}
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-gray-900">{system.uptime}%</div>
                <div className="text-xs text-gray-500 mt-1 capitalize">{system.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overnight Alert Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
          Overnight Alert Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card border-l-4 border-l-red-500">
            <div className="text-sm text-gray-600 mb-1">Critical</div>
            <div className="text-3xl font-bold text-red-600">{alertData.critical}</div>
          </div>
          <div className="metric-card border-l-4 border-l-orange-500">
            <div className="text-sm text-gray-600 mb-1">High</div>
            <div className="text-3xl font-bold text-orange-600">{alertData.high}</div>
          </div>
          <div className="metric-card border-l-4 border-l-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Medium</div>
            <div className="text-3xl font-bold text-yellow-600">{alertData.medium}</div>
          </div>
          <div className="metric-card border-l-4 border-l-blue-500">
            <div className="text-sm text-gray-600 mb-1">Low</div>
            <div className="text-3xl font-bold text-blue-600">{alertData.low}</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Alerts</div>
              <div className="text-2xl font-bold text-gray-900">{alertData.total}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Auto Resolved</div>
              <div className="text-2xl font-bold text-success">{alertData.autoResolved}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Require Review</div>
              <div className="text-2xl font-bold text-warning">{alertData.humanReview}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Connections */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2 text-primary" />
          Active System Connections
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
              <div>
                <div className="font-medium">Snowflake Data Warehouse</div>
                <div className="text-sm text-gray-500">eu-central-1.snowflakecomputing.com</div>
              </div>
            </div>
            <span className="text-sm text-success font-medium">Connected</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
              <div>
                <div className="font-medium">GitHub Repository</div>
                <div className="text-sm text-gray-500">github.com/org/aml-analytics</div>
              </div>
            </div>
            <span className="text-sm text-success font-medium">Connected</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
              <div>
                <div className="font-medium">Grafana Dashboards</div>
                <div className="text-sm text-gray-500">grafana.internal.company.com</div>
              </div>
            </div>
            <span className="text-sm text-success font-medium">Connected</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
              <div>
                <div className="font-medium">Jira Project Tracker</div>
                <div className="text-sm text-gray-500">company.atlassian.net</div>
              </div>
            </div>
            <span className="text-sm text-success font-medium">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorningSetup;
