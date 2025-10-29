import React from 'react'
import ReactDOM from 'react-dom/client'
import PercentageTracker from './PercentageTracker'
import './style.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <PercentageTracker value={72} label="Quarterly sales target" color="#16a34a" delay={300} />
    </div>
  </React.StrictMode>,
)
