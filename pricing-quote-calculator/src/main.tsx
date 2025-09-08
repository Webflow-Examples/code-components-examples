import React from 'react'
import ReactDOM from 'react-dom/client'
import LifeInsuranceCalculator from './LifeInsuranceCalculator'
import './style.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <LifeInsuranceCalculator 
      defaultAge={30}
      defaultWeight={160}
      defaultHeight={66}
      defaultSex="female"
      title="Insurance Premium Calculator"
      primaryColor="#2563eb"
      buttonText="Get My Quote"
      showTitle={true}
      ctaButtonText="Apply Now"
      ctaLink="#"
    />
  </React.StrictMode>,
)
