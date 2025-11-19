import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import MorningSetup from './components/MorningSetup';
import ModelMonitoring from './components/ModelMonitoring';
import FeatureEngineering from './components/FeatureEngineering';
import ModelValidation from './components/ModelValidation';
import OnboardingRisk from './components/OnboardingRisk';
import ProductionMonitoring from './components/ProductionMonitoring';
import MetricTicker from './components/MetricTicker';

function App() {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [currentTime, setCurrentTime] = useState('09:00');

  const tabs = [
    { id: 'setup', label: 'Morning Setup', time: '08:30-09:00' },
    { id: 'monitoring', label: 'Model Monitoring', time: '09:00-10:00' },
    { id: 'engineering', label: 'Feature Engineering', time: '10:00-11:00' },
    { id: 'validation', label: 'Model Validation', time: '11:15-12:30' },
    { id: 'onboarding', label: 'Onboarding Risk', time: '13:15-14:15' },
    { id: 'production', label: 'Production Monitoring', time: '15:00-16:30' }
  ];

  useEffect(() => {
    const timeMap = {
      setup: '08:45',
      monitoring: '09:30',
      engineering: '10:45',
      validation: '11:50',
      onboarding: '13:45',
      production: '15:30'
    };
    setCurrentTime(timeMap[activeTab] || '09:00');
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'setup':
        return <MorningSetup />;
      case 'monitoring':
        return <ModelMonitoring />;
      case 'engineering':
        return <FeatureEngineering />;
      case 'validation':
        return <ModelValidation />;
      case 'onboarding':
        return <OnboardingRisk />;
      case 'production':
        return <ProductionMonitoring />;
      default:
        return <ModelMonitoring />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AML Analyst Workflow Demonstrator
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Financial Crime & Anti-Money Laundering Operations
              </p>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg font-semibold">{currentTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button whitespace-nowrap ${
                  activeTab === tab.id ? 'tab-active' : 'tab-inactive'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{tab.label}</span>
                  <span className="text-xs text-gray-400 mt-1">{tab.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Bottom Metric Ticker */}
      <MetricTicker />
    </div>
  );
}

export default App;
