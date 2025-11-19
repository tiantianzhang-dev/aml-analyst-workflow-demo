# AML Analyst Workflow Demonstrator

Interactive web-based demonstration of a Financial Crime and Anti-Money Laundering analyst's daily workflow, showcasing real-time metrics, model monitoring, and compliance procedures used in fintech and banking operations. This demo uses hypothetical data.

## Overview

This demonstrator provides a comprehensive view of AML operations across six key workflow phases:

1. **Morning Setup** (08:30-09:00) - System checks and overnight alert review
2. **Model Monitoring** (09:00-10:00) - KPI tracking and drift detection
3. **Feature Engineering** (10:00-11:00) - Model development and code implementation
4. **Model Validation** (11:15-12:30) - Performance metrics and back-testing
5. **Onboarding Risk** (13:15-14:15) - Interactive risk scoring calculator
6. **Production Monitoring** (15:00-16:30) - Real-time pipeline and alert triage

## Features

### Technical Capabilities
- Real-time metric calculations and updates
- Interactive risk score calculator with live formula breakdown
- Model performance visualization with ROC curves and confusion matrices
- Feature importance analysis and drift detection (PSI)
- SQL and Python code examples for feature engineering
- CI/CD pipeline simulation with GitHub integration

### Analytical Methods Demonstrated
- **Population Stability Index (PSI)** for model drift detection
- **Isolation Forest** for anomaly detection
- **XGBoost** for supervised classification
- **Confusion Matrix** analysis with precision, recall, and F1-score
- **ROC-AUC** performance evaluation
- **Business cost analysis** with ROI calculations

### Compliance Coverage
- AMLD 5/6 (Anti-Money Laundering Directives)
- EU AMLA (Anti-Money Laundering Authority)
- GDPR Article 22 (Automated decision-making)
- AML/CTF (Counter-Terrorist Financing)

## Technology Stack

- **Frontend**: React 18.2 with functional components and hooks
- **Styling**: TailwindCSS for responsive design
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Warehouse**: Snowflake (simulated)
- **Version Control**: GitHub (simulated)
- **Monitoring**: Grafana-style dashboards

## Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Setup Instructions

1. Clone or extract the repository:
```bash
cd aml-analyst-workflow-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
aml-analyst-workflow-demo/
├── src/
│   ├── components/          # React components for each workflow phase
│   │   ├── MorningSetup.jsx
│   │   ├── ModelMonitoring.jsx
│   │   ├── FeatureEngineering.jsx
│   │   ├── ModelValidation.jsx
│   │   ├── OnboardingRisk.jsx
│   │   ├── ProductionMonitoring.jsx
│   │   └── MetricTicker.jsx
│   ├── data/
│   │   └── mockData.js      # Synthetic data for demonstrations
│   ├── utils/
│   │   └── calculations.js   # Utility functions for metrics
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and Tailwind
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # TailwindCSS configuration
└── postcss.config.js         # PostCSS configuration
```

## Usage Guide

### Navigation
- Use the top navigation tabs to switch between different workflow phases
- Each tab displays the corresponding time block (e.g., 09:00-10:00)
- The clock in the header updates based on the selected workflow phase
- Bottom metric ticker shows live system metrics

### Interactive Elements

#### Model Monitoring
- Toggle between Transaction Monitoring and Onboarding Risk models
- View real-time KPI metrics with trend indicators
- Explore 24-hour alert trends and feature importance
- Examine PSI scores for drift detection

#### Feature Engineering
- Switch between SQL and Python code views
- Simulate CI/CD pipeline execution
- Review feature categories and ML techniques

#### Model Validation
- Compare current model against baseline
- Toggle confusion matrix visualization
- View ROC curves and business cost analysis
- Approve model for deployment

#### Onboarding Risk
- Adjust risk factors using interactive sliders:
  - Device Trust Score (0-100)
  - Geographic Risk Score (0-100)
  - KYC Completeness (0-100%)
  - Behavioral Anomaly (0-100)
- See real-time risk score calculation
- View decision recommendations based on thresholds
- Examine API integration examples

#### Production Monitoring
- Monitor real-time pipeline metrics
- Review recent high-risk alerts
- Click on alerts to view detailed risk factors
- Check regulatory compliance status

## Key Metrics Explained

### Detection Rate
```
Detection Rate = True Positives / (True Positives + False Negatives)
```
Measures the percentage of actual fraudulent transactions correctly identified.

### False Positive Rate
```
False Positive Rate = False Positives / (False Positives + True Negatives)
```
Percentage of legitimate transactions incorrectly flagged as suspicious.

### Population Stability Index (PSI)
```
PSI = Σ (% Actual - % Expected) × ln(% Actual / % Expected)
```
Measures distribution shift in model features over time.
- PSI < 0.10: No significant change
- PSI 0.10-0.25: Monitor for drift
- PSI > 0.25: Significant shift detected

### Onboarding Risk Score
```
Risk Score = 0.35 × (100 - Device Trust) +
             0.25 × Geo Risk +
             0.20 × (100 - KYC Completeness) +
             0.20 × Behavioral Anomaly
```

### Business Cost
```
Business Cost = (False Positives × $50) + (False Negatives × $5,000)
```

## Customization

### Modifying Data
Edit `src/data/mockData.js` to customize:
- Alert volumes and risk scores
- Model performance metrics
- Feature importance weights
- System health indicators

### Adjusting Thresholds
Modify risk thresholds in `src/components/OnboardingRisk.jsx`:
```javascript
if (score < 30) setRiskLevel('Low');
else if (score < 60) setRiskLevel('Medium');
else if (score < 80) setRiskLevel('High');
else setRiskLevel('Critical');
```

### Styling
- Global styles: `src/index.css`
- Theme colors: `tailwind.config.js`
- Component-specific styles: Use TailwindCSS utility classes

## Performance Optimization

The application uses:
- React functional components with hooks for efficient re-rendering
- Memoization for expensive calculations
- Lazy loading for code splitting (can be implemented)
- Optimized chart rendering with Recharts

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Minimum recommended resolution: 1366x768

## Troubleshooting

### Port Already in Use
If port 3000 is occupied, modify `vite.config.js`:
```javascript
server: {
  port: 3001,
  open: true
}
```

### Slow Chart Rendering
Reduce data points in `mockData.js` for time series:
```javascript
export const timeSeriesData = Array.from({ length: 12 }, ...);  // Reduced from 24
```

### Build Errors
Clear node modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

Potential additions for extended demonstrations:
- Real API integration with backend services
- User authentication and role-based access
- Historical data export functionality
- Advanced filtering and search capabilities
- Multi-language support
- Mobile responsive optimizations
- WebSocket integration for true real-time updates

## Demonstration Tips

When presenting this demonstrator:

1. **Start with Model Monitoring** - Most visually impressive with live metrics
2. **Use Onboarding Risk Calculator** - Interactive slider engagement
3. **Show Model Validation** - Technical rigor with confusion matrix
4. **Highlight Regulatory Compliance** - GDPR, AMLD awareness
5. **Emphasize Business Impact** - ROI and cost savings

Key talking points:
- PSI calculation methodology for drift detection
- Feature engineering approach with weighted scoring
- Model validation process with hold-out data
- Regulatory compliance alignment
- Real-time processing capabilities (847 TPS)

## License

This project is provided as a demonstration tool for educational and professional presentation purposes.

## Contact

For questions or customization requests, please reach out through appropriate channels.

---

**Version**: 1.0.0
**Last Updated**: November 2024
**Built with**: React + Vite + TailwindCSS
