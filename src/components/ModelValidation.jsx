import React, { useState } from 'react';
import { CheckCircle, TrendingUp, FileText, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { modelPerformance, businessMetrics } from '../data/mockData';
import { formatCurrency } from '../utils/calculations';

const ModelValidation = () => {
  const [showConfusionMatrix, setShowConfusionMatrix] = useState(false);

  const performanceComparison = [
    { metric: 'Precision', current: modelPerformance.current.precision, baseline: modelPerformance.baseline.precision },
    { metric: 'Recall', current: modelPerformance.current.recall, baseline: modelPerformance.baseline.recall },
    { metric: 'ROC-AUC', current: modelPerformance.current.rocAuc, baseline: modelPerformance.baseline.rocAuc },
    { metric: 'F1-Score', current: modelPerformance.current.f1Score, baseline: modelPerformance.baseline.f1Score }
  ];

  const confusionMatrixData = {
    truePositive: 167,
    falsePositive: 21,
    trueNegative: 3245,
    falseNegative: 34
  };

  const rocCurveData = Array.from({ length: 11 }, (_, i) => ({
    fpr: i / 10,
    tpr: Math.pow(i / 10, 0.6)
  }));

  const calculateImprovement = (current, baseline) => {
    return ((current - baseline) / baseline * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Model Validation & Back-testing</h2>
        <p className="text-gray-600">11:15-12:30 - Model validation on hold-out data</p>
      </div>

      {/* Performance Metrics Table */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-primary" />
          Model Performance Comparison
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Baseline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Precision</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  {modelPerformance.current.precision.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {modelPerformance.baseline.precision.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-medium">
                  +{calculateImprovement(modelPerformance.current.precision, modelPerformance.baseline.precision)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CheckCircle className="w-5 h-5 text-success" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recall</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  {modelPerformance.current.recall.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {modelPerformance.baseline.recall.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-medium">
                  +{calculateImprovement(modelPerformance.current.recall, modelPerformance.baseline.recall)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CheckCircle className="w-5 h-5 text-success" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ROC-AUC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  {modelPerformance.current.rocAuc.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {modelPerformance.baseline.rocAuc.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-medium">
                  +{calculateImprovement(modelPerformance.current.rocAuc, modelPerformance.baseline.rocAuc)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CheckCircle className="w-5 h-5 text-success" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alert Volume</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  {modelPerformance.current.alertVolume}/day
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {modelPerformance.baseline.alertVolume}/day
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-medium">
                  {calculateImprovement(modelPerformance.current.alertVolume, modelPerformance.baseline.alertVolume)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CheckCircle className="w-5 h-5 text-success" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Comparison Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Visual Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#3b82f6" name="Current Model (v2.4.0)" />
            <Bar dataKey="baseline" fill="#9ca3af" name="Baseline (v2.3.1)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Confusion Matrix */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Confusion Matrix Analysis</h3>
          <button
            onClick={() => setShowConfusionMatrix(!showConfusionMatrix)}
            className="btn-secondary text-sm"
          >
            {showConfusionMatrix ? 'Hide Matrix' : 'Show Matrix'}
          </button>
        </div>

        {showConfusionMatrix && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                <div className="col-span-2 text-center text-sm font-medium text-gray-500 mb-2">
                  Predicted
                </div>
                <div></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center text-xs font-medium text-gray-500">Positive</div>
                  <div className="text-center text-xs font-medium text-gray-500">Negative</div>
                </div>
                <div className="flex items-center justify-end pr-2">
                  <div className="text-xs font-medium text-gray-500 transform -rotate-90">Actual</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-600 mb-1">True Positive</div>
                    <div className="text-2xl font-bold text-green-700">{confusionMatrixData.truePositive}</div>
                  </div>
                  <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-600 mb-1">False Negative</div>
                    <div className="text-2xl font-bold text-red-700">{confusionMatrixData.falseNegative}</div>
                  </div>
                </div>
                <div></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-600 mb-1">False Positive</div>
                    <div className="text-2xl font-bold text-orange-700">{confusionMatrixData.falsePositive}</div>
                  </div>
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-600 mb-1">True Negative</div>
                    <div className="text-2xl font-bold text-blue-700">{confusionMatrixData.trueNegative}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Calculated Metrics</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precision:</span>
                    <span className="font-semibold">
                      {(confusionMatrixData.truePositive / (confusionMatrixData.truePositive + confusionMatrixData.falsePositive)).toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recall:</span>
                    <span className="font-semibold">
                      {(confusionMatrixData.truePositive / (confusionMatrixData.truePositive + confusionMatrixData.falseNegative)).toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-semibold">
                      {((confusionMatrixData.truePositive + confusionMatrixData.trueNegative) / 
                        (confusionMatrixData.truePositive + confusionMatrixData.falsePositive + 
                         confusionMatrixData.trueNegative + confusionMatrixData.falseNegative)).toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">Formula Reference</div>
                <div className="text-xs text-blue-700 space-y-1 font-mono">
                  <div>Precision = TP / (TP + FP)</div>
                  <div>Recall = TP / (TP + FN)</div>
                  <div>Accuracy = (TP + TN) / Total</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ROC Curve */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">ROC Curve</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rocCurveData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fpr" label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tpr" stroke="#3b82f6" name="Model Performance" strokeWidth={2} dot={false} />
            <Line type="monotone" data={[{fpr: 0, baseline: 0}, {fpr: 1, baseline: 1}]} dataKey="baseline" stroke="#9ca3af" name="Random Baseline" strokeWidth={1} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <span className="text-lg font-semibold text-gray-900">
            ROC-AUC: {modelPerformance.current.rocAuc.toFixed(3)}
          </span>
        </div>
      </div>

      {/* Business Impact */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          Business Cost Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="metric-card">
            <div className="text-sm text-gray-600 mb-1">Daily Review Cost</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(modelPerformance.current.alertVolume * 0.89 * 50, 'USD')}
            </div>
            <div className="text-xs text-gray-500 mt-1">@ $50 per alert review</div>
          </div>

          <div className="metric-card">
            <div className="text-sm text-gray-600 mb-1">Estimated Miss Cost</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency((1 - modelPerformance.current.recall) * 100 * 5000, 'USD')}
            </div>
            <div className="text-xs text-gray-500 mt-1">@ $5,000 per fraud miss</div>
          </div>

          <div className="metric-card bg-green-50 border-green-200">
            <div className="text-sm text-green-700 mb-1">Annual Savings</div>
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(businessMetrics.annualSavings, 'USD')}
            </div>
            <div className="text-xs text-green-600 mt-1">vs. baseline model</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Cost Calculation Formula</div>
          <div className="text-xs text-gray-600 font-mono">
            Business Cost = (FP × Review Cost) + (FN × Fraud Cost)
          </div>
        </div>
      </div>

      {/* Deployment Approval */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Model Validation Summary</h3>
            <div className="space-y-2 text-sm text-blue-800 mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                All performance metrics exceed baseline
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Hold-out data validation passed
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Business cost analysis shows positive ROI
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Model ready for shadow mode deployment
              </div>
            </div>
            <button className="btn-primary">
              <FileText className="w-4 h-4 mr-2 inline" />
              Approve for Deployment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelValidation;
