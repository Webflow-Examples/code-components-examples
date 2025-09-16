import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import LifeInsuranceCalculator from './LifeInsuranceCalculator';
import './style.css';

// Declare the component for Webflow Code Components
export default declareComponent(LifeInsuranceCalculator, {
  // Component metadata
  name: "Premium Quote Widget",
  description: "A comprehensive life insurance premium calculator with customizable defaults. Use query params on the page the quote calculator is displayed on to set defaults.",
  group: "Interactive",
  // Prop definitions mapped to LifeInsuranceCalculator props
  props: {
    // Default form values
    defaultHeight: props.Number({ 
      name: "Default Height",
      min: 48,
      max: 84
    }),
    defaultWeight: props.Number({ 
      name: "Default Weight",
      min: 50,
      max: 500
    }),
    defaultAge: props.Number({ 
      name: "Default Age",
      min: 18,
      max: 120
    }),
    defaultSex: props.Variant({
      name: "Default Sex Assigned at Birth",
      options: ["male", "female"]
    }),
    defaultCoverage: props.Number({ 
      name: "Default Coverage",
      min: 100000,
      max: 1000000
    }),
    // UI customization
    title: props.Text({ 
      name: "Calculator Title",
      defaultValue: "Life Insurance Quote Calculator"
    }),
    showTitle: props.Boolean({ 
      name: "Show Title",
      defaultValue: true
    }),
    buttonText: props.Text({ 
      name: "Button Text",
      defaultValue: "Calculate Premium"
    }),
    ctaButtonText: props.Text({
      name: "CTA Button Text",
      defaultValue: "Get Started"
    }),
    ctaLink: props.Text({
      name: "CTA Link",
      defaultValue: "#"
    })
  },
});
