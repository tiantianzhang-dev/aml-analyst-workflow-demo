import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const MetricTicker = () => {
  const [metrics, setMetrics] = useState({
    alertsPerMin: 14,
    modelAccuracy: 87.3,
    systemHealth: 99.9,
    queueSize: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        alertsPerMin: Math.max(10, Math.min(20, prev.alertsPerMin + (Math.random() - 0.5) * 2)),
        modelAccuracy: Math.max(85, Math.min(90, prev.modelAccuracy + (Math.random() - 0.5) * 0.5)),
        systemHealth: Math.max(99, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 0.2)),
        queueSize: Math.max(15, Math.min(30, prev.queueSize + Math.floor((Math.random() - 0.5) * 4)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 px-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400">Alerts/min:</span>
            <span className="font-semibold text-blue-400">{metrics.alertsPerMin.toFixed(1)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-gray-400">Model Accuracy:</span>
            <span className="font-semibold text-green-400">{metrics.modelAccuracy.toFixed(1)}%</span>
          </div>

          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-400">System Health:</span>
            <span className="font-semibold text-green-400">{metrics.systemHealth.toFixed(1)}%</span>
          </div>

          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400">Queue:</span>
            <span className="font-semibold text-yellow-400">{Math.round(metrics.queueSize)} alerts</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-xs">Live</span>
          </div>
          <span className="text-gray-500 text-xs">Model v2.4.0</span>
        </div>
      </div>
    </div>
  );
};

export default MetricTicker;
