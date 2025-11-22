# Project Structure Overview

## Complete File Listing and Descriptions

### Root Configuration Files

| File | Purpose | Key Contents |
|------|---------|--------------|
| `package.json` | NPM dependencies and scripts | React 18, Recharts, TailwindCSS, Vite |
| `vite.config.js` | Vite build configuration | Development server on port 3000 |
| `tailwind.config.js` | TailwindCSS styling configuration | Custom color palette, theme extensions |
| `postcss.config.js` | PostCSS processing | TailwindCSS and Autoprefixer plugins |
| `.gitignore` | Git exclusion rules | node_modules, build files, environment variables |
| `index.html` | HTML entry point | Root div and script module imports |

### Documentation Files

| File | Purpose | Target Audience |
|------|---------|-----------------|
| `README.md` | Comprehensive documentation | Technical users, developers |
| `QUICKSTART.md` | 5-minute setup guide | First-time users, presenters |
| `DEPLOYMENT.md` | Production deployment instructions | DevOps, system administrators |

### Source Code Structure

#### Main Application (`src/`)

| File | Lines | Purpose |
|------|-------|---------|
| `main.jsx` | ~10 | React application entry point |
| `App.jsx` | ~80 | Root component with tab navigation and routing |
| `index.css` | ~50 | Global styles, TailwindCSS directives, utility classes |

#### Components (`src/components/`)

| Component | Lines | Key Features |
|-----------|-------|--------------|
| `MorningSetup.jsx` | ~150 | System health dashboard, overnight alerts, connection status |
| `ModelMonitoring.jsx` | ~250 | KPI metrics, drift detection (PSI), 24-hour trends, feature importance |
| `FeatureEngineering.jsx` | ~280 | SQL/Python code display, CI/CD pipeline, feature categories |
| `ModelValidation.jsx` | ~320 | Performance comparison, confusion matrix, ROC curves, business cost |
| `OnboardingRisk.jsx` | ~350 | Interactive risk calculator, real-time scoring, decision thresholds |
| `ProductionMonitoring.jsx` | ~280 | Real-time pipeline metrics, alert triage, compliance status, EOD summary |
| `MetricTicker.jsx` | ~60 | Bottom status bar with live metrics updating every 3 seconds |

#### Data Layer (`src/data/`)

| File | Purpose | Key Exports |
|------|---------|-------------|
| `mockData.js` | Synthetic demonstration data | alertData, systemHealth, kpiMetrics, driftMetrics, modelPerformance, recentAlerts, regulatoryFramework, pipelineMetrics |

#### Utilities (`src/utils/`)

| File | Purpose | Functions |
|------|---------|-----------|
| `calculations.js` | Mathematical and formatting functions | calculatePSI, calculateOnboardingRisk, calculateAlertSeverity, businessCost, formatCurrency, formatPercentage, getTrendIndicator |

---

## Component Breakdown

### 1. MorningSetup Component
**File**: `src/components/MorningSetup.jsx`

**Features**:
- System health status for 4 platforms (Snowflake, Model API, Alert Pipeline, Scoring Service)
- Overnight alert summary with critical/high/medium/low categorization
- Total alerts: 347, Auto-resolved: 311, Require review: 12
- Active system connections display (Snowflake, GitHub, Grafana, Jira)

**Visual Elements**:
- Health indicators with green checkmarks
- Metric cards with color-coded border highlights
- Connection status grid with URLs

---

### 2. ModelMonitoring Component
**File**: `src/components/ModelMonitoring.jsx`

**Features**:
- Toggle between Transaction Monitoring and Onboarding Risk models
- 4 KPI cards: Detection Rate (87.3%), False Positive Rate (4.2%), Alert Latency (1.3s), Alert Volume (347)
- 24-hour line chart showing alerts, true positives, false positives
- PSI drift detection table with 5 features
- Feature importance bar chart

**Calculations**:
```javascript
PSI = Σ (% Actual - % Expected) × ln(% Actual / % Expected)
Change % = ((current - previous) / previous) × 100
```

**Charts**:
- LineChart: 24-hour trend (3 metrics)
- BarChart: Feature importance (horizontal)

---

### 3. FeatureEngineering Component
**File**: `src/components/FeatureEngineering.jsx`

**Features**:
- Dual code view: SQL (Snowflake) and Python
- SQL: Complex query with window functions for velocity features
- Python: Feature engineering functions, Isolation Forest implementation
- GitHub integration simulation with branch display
- CI/CD pipeline with 4 automated checks
- 4 feature category cards (Device, Geo, Velocity, KYC)
- 3 ML technique descriptions (Isolation Forest, XGBoost, Rule-Based)

**Code Examples**:
- 50+ lines of production-ready SQL
- 80+ lines of Python with sklearn and pandas
- Model serialization with joblib

---

### 4. ModelValidation Component
**File**: `src/components/ModelValidation.jsx`

**Features**:
- Performance comparison table (4 metrics vs. baseline)
- Improvements: Precision +4.7%, Recall +2.5%, ROC-AUC +3.4%, Alerts -15.8%
- Toggle-able confusion matrix (2x2 grid with TP, FP, TN, FN)
- ROC curve with AUC visualization
- Business cost analysis with 3 metric cards
- Annual savings: $180K calculated from false positive reduction
- Deployment approval panel with 4 validation checkpoints

**Formulas Displayed**:
```
Precision = TP / (TP + FP)
Recall = TP / (TP + FN)
F1-Score = 2 × (Precision × Recall) / (Precision + Recall)
Business Cost = (FP × $50) + (FN × $5,000)
```

**Charts**:
- BarChart: Current vs. baseline comparison
- LineChart: ROC curve with diagonal reference

---

### 5. OnboardingRisk Component
**File**: `src/components/OnboardingRisk.jsx`

**Features**:
- 4 interactive sliders (range 0-100):
  - Device Trust Score (weight: 35%)
  - Geographic Risk Score (weight: 25%)
  - KYC Completeness (weight: 20%)
  - Behavioral Anomaly (weight: 20%)
- Real-time risk score calculation (0-100 scale)
- 4-tier risk classification: Low (0-30), Medium (30-60), High (60-80), Critical (80-100)
- Decision recommendations with icons
- Formula breakdown showing live calculation
- 4 feature weight distribution cards
- 4 decision threshold panels with descriptions
- API integration example (POST request/response)
- Regulatory compliance context (GDPR, AMLD 5/6, AML/CTF)

**Calculation Logic**:
```javascript
Risk Score = 0.35 × (100 - deviceTrust) + 
             0.25 × geoRisk + 
             0.20 × (100 - kycComplete) + 
             0.20 × behavioral
```

**State Management**:
- useEffect hook for real-time updates
- Controlled inputs with onChange handlers
- Conditional rendering based on risk level

---

### 6. ProductionMonitoring Component
**File**: `src/components/ProductionMonitoring.jsx`

**Features**:
- 5 real-time pipeline metrics: Queue (23), Latency (1.1s), Error Rate (0.03%), Throughput (847/min), Last Hour (3,420)
- 4 system health indicators (all green)
- Recent alerts table with 4+ sample alerts
- Clickable rows revealing risk factors
- Risk score badges with color coding
- Alert distribution: High Risk (12), Auto-Closed (311), Escalated (24)
- Regulatory compliance table (4 regulations)
- End-of-day summary with achievements and priorities

**Alert Table Columns**:
- Alert ID, Timestamp, Risk Score, Type, Amount, Status, Action

**Status Types**:
- pending_review, escalated, auto_resolved, in_progress

---

### 7. MetricTicker Component
**File**: `src/components/MetricTicker.jsx`

**Features**:
- Fixed bottom bar spanning full width
- 4 live metrics updating every 3 seconds
- Animated metrics with smooth transitions
- Live indicator (pulsing green dot)
- Model version display (v2.4.0)

**Metrics**:
1. Alerts/min: 10-20 range
2. Model Accuracy: 85-90% range
3. System Health: 99-100% range
4. Queue Size: 15-30 alerts

---

## Data Structure

### mockData.js Exports

```javascript
alertData = {
  total: 347,
  critical: 12,
  high: 45,
  medium: 123,
  low: 167,
  autoResolved: 311,
  humanReview: 12,
  escalated: 24
}

kpiMetrics = {
  detectionRate: { current, previous, target, trend },
  falsePositiveRate: { current, previous, target, trend },
  alertLatency: { current, previous, target, unit, trend },
  alertVolume: { current, previous, target, trend }
}

driftMetrics = {
  psi: 0.08,
  status: 'acceptable',
  threshold: 0.25,
  features: [5 feature objects]
}

modelPerformance = {
  current: { precision, recall, rocAuc, f1Score, alertVolume },
  baseline: { precision, recall, rocAuc, f1Score, alertVolume }
}

recentAlerts = [4 alert objects]

regulatoryFramework = [4 regulation objects]

pipelineMetrics = { queueSize, processingLatency, errorRate, throughput, lastHourProcessed }
```

---

## Utility Functions

### calculations.js Functions

| Function | Purpose | Formula/Logic |
|----------|---------|---------------|
| `calculatePSI` | Population Stability Index | Σ(actual% - expected%) × ln(actual%/expected%) |
| `calculateOnboardingRisk` | Risk score from 4 inputs | Weighted sum with specific coefficients |
| `calculateAlertSeverity` | Alert priority score | Normalized amount, risk, velocity composite |
| `calculateBusinessCost` | Financial impact | (FP × $50) + (FN × $5000) |
| `formatCurrency` | Money formatting | Intl.NumberFormat with currency |
| `formatPercentage` | Percentage display | Fixed decimal with % symbol |
| `getTrendIndicator` | Direction and color | Compares current vs. previous |

---

## Styling Architecture

### TailwindCSS Custom Classes

Defined in `src/index.css`:

```css
.card - White background, rounded, shadow, padding
.metric-card - Bordered card for metrics display
.btn-primary - Blue button with hover effects
.btn-secondary - Gray button with hover effects
.status-badge - Rounded badge for status indicators
.tab-button - Navigation tab styling
.tab-active - Active tab highlight (blue border)
.tab-inactive - Inactive tab (gray, hover effects)
```

### Color Palette

Custom colors in `tailwind.config.js`:
- primary: #1e3a8a (dark blue)
- secondary: #3b82f6 (blue)
- success: #22c55e (green)
- warning: #f59e0b (amber)
- danger: #ef4444 (red)

---

## Technical Specifications

### Performance
- **Bundle Size**: ~250KB (gzipped)
- **Load Time**: <2 seconds on 3G
- **Chart Rendering**: Optimized with ResponsiveContainer
- **State Updates**: Debounced slider inputs

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Responsive Breakpoints
- Mobile: 640px
- Tablet: 768px
- Desktop: 1024px
- Large: 1280px

---

## Development Workflow

### Scripts
```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build to /dist
npm run preview  # Preview production build
```

### File Watching
Vite provides hot module replacement (HMR) for instant updates during development.

### Code Organization
- Components: Functional with hooks
- State: useState, useEffect
- Props: Destructured parameters
- Styling: TailwindCSS utility classes

---

## Metrics Summary

### Total Codebase
- **Components**: 7 files (~1,780 lines)
- **Utilities**: 1 file (~200 lines)
- **Data**: 1 file (~250 lines)
- **Styles**: 1 file (~50 lines)
- **Config**: 4 files (~100 lines)
- **Documentation**: 3 files (~1,500 lines)

**Total**: ~3,880 lines of code + documentation

### Features Count
- Interactive Elements: 12+
- Charts/Visualizations: 8
- Data Tables: 4
- Real-time Calculations: 15+
- Clickable Components: 20+

---

## Usage Patterns

### Component Props
Most components are stateless and rely on imported data:
```javascript
import { kpiMetrics } from '../data/mockData';
// No props passed from parent
```

### State Management
Local component state with hooks:
```javascript
const [selectedTab, setSelectedTab] = useState('monitoring');
const [inputs, setInputs] = useState({ ... });
```

### Event Handlers
```javascript
onClick={() => setActiveTab('monitoring')}
onChange={(e) => handleSliderChange('field', e.target.value)}
```

---

## Customization Guide

### To Modify Data
Edit `src/data/mockData.js` - change numbers, add/remove entries

### To Change Calculations
Edit `src/utils/calculations.js` - modify formulas and weights

### To Adjust Styling
Edit `tailwind.config.js` for colors, or component files for specific styles

### To Add New Tab
1. Create new component in `src/components/`
2. Import in `App.jsx`
3. Add tab object to tabs array
4. Add case in renderContent switch

