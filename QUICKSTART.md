# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to `http://localhost:3000`

## First-Time Usage

### Recommended Navigation Flow
1. Start with **Model Monitoring** tab (most impressive visually)
2. Move to **Onboarding Risk** for interactive demonstration
3. Show **Model Validation** for technical depth
4. End with **Production Monitoring** for operational overview

## Key Interactive Features

### Model Monitoring
- **Click**: Toggle between Transaction Monitoring and Onboarding Risk models
- **Observe**: Live KPI metrics updating with trend indicators
- **Explore**: PSI scores showing model drift detection

### Onboarding Risk Calculator
- **Adjust**: Four sliders to modify risk inputs
- **Watch**: Risk score updates in real-time
- **Note**: Formula breakdown shows calculation steps

### Model Validation
- **Toggle**: Confusion matrix visualization
- **Review**: Performance comparison table
- **Analyze**: ROC curve and business cost metrics

### Production Monitoring
- **Click**: Individual alerts to see risk factors
- **Monitor**: Real-time pipeline metrics
- **Check**: Regulatory compliance status

## Demonstration Script (5 Minutes)

### Minute 1-2: Model Monitoring
"This dashboard shows our real-time model performance. We track detection rate at 87.3%, which is above our 85% target. False positive rate is 4.2%, well below our 5% threshold. The PSI analysis here shows all features are stable, with no significant drift detected."

### Minute 2-3: Onboarding Risk
"Here's our interactive risk scoring model. Let me adjust these sliders - watch how the risk score updates in real-time. The formula uses weighted features: 35% device trust, 25% geographic risk, 20% KYC completeness, and 20% behavioral patterns. Based on the score, we get automatic decision recommendations."

### Minute 3-4: Model Validation
"Our validation process compares the new model against the baseline. We see improvements across all metrics - precision up 4.7%, recall up 2.5%. This confusion matrix shows our true/false positive distribution. The business impact analysis shows $180K in annual savings from reduced false positives."

### Minute 4-5: Production Monitoring
"This is our real-time production environment. We're processing 847 transactions per minute with 1.1-second latency. The alert triage system shows 12 high-risk cases requiring human review, while 311 were auto-resolved. All systems are healthy and compliant with AMLD 5/6, GDPR, and AML/CTF regulations."

## Talking Points

### Technical Rigor
- PSI calculation methodology for drift detection
- Isolation Forest for unsupervised anomaly detection
- XGBoost for supervised classification
- Confusion matrix analysis with precision/recall trade-offs

### Business Impact
- 15.8% reduction in alert volume
- $180K annual cost savings
- Improved efficiency in human review queue
- Better customer experience with faster onboarding

### Compliance Awareness
- AMLD 5/6 threshold alignment
- GDPR Article 22 transparency requirements
- AML/CTF regulatory obligations
- EU AMLA centralized monitoring approach

### Operational Excellence
- Real-time processing at scale (50K+ TPS capability)
- Sub-2-second latency SLA
- 99.9% system uptime
- Automated deployment via CI/CD

## Common Questions & Answers

**Q: What data sources do you use?**
A: We integrate Snowflake for data warehousing, device fingerprint APIs, geolocation services, and internal KYC databases. All features are extracted via SQL and processed in Python.

**Q: How do you handle model deployment?**
A: We use GitHub for version control with automated CI/CD pipelines. Models go through shadow mode testing before full production deployment. All changes are tracked with audit logs for compliance.

**Q: What's your false positive rate target?**
A: We target below 5% to balance detection effectiveness with operational efficiency. Each false positive costs approximately $50 in review time, so optimization is crucial.

**Q: How do you ensure regulatory compliance?**
A: We align with AMLD 5/6 thresholds, maintain explainable AI for GDPR Article 22, document all model decisions, and conduct regular audits. Compliance status is monitored real-time.

**Q: What happens when drift is detected?**
A: When PSI exceeds 0.25, we trigger a model retraining workflow. Features with PSI 0.10-0.25 are monitored closely. We maintain separate models for different risk profiles to reduce drift impact.

## Troubleshooting

### Charts Not Rendering
Ensure all dependencies installed:
```bash
npm install recharts lucide-react
```

### Slow Performance
Reduce animation frequency in MetricTicker component (line 12):
```javascript
}, 5000);  // Change from 3000 to 5000ms
```

### Port Conflict
Change port in vite.config.js:
```javascript
server: {
  port: 3001,  // Change from 3000
  open: true
}
```

## Next Steps

After initial setup:
1. Review mockData.js to understand data structure
2. Customize thresholds in OnboardingRisk.jsx
3. Modify color schemes in tailwind.config.js
4. Add custom features based on specific use cases

## Support

For technical issues:
- Check README.md for detailed documentation
- Review component files for implementation details
- Verify all dependencies are correctly installed

---

Ready to present? Start with Model Monitoring and let the interactive features drive engagement!
