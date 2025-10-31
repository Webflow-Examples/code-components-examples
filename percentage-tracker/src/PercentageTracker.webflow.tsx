import { declareComponent } from '@webflow/react'
import { props } from '@webflow/data-types'
import PercentageTracker from './PercentageTracker'
import './style.css'

export default declareComponent(PercentageTracker, {
  name: 'Percentage Tracker',
  description: 'An animated progress tracker with customizable label, color, and delay.',
  group: 'Feedback',
  props: {
    progressHeader: props.Text({
      name: 'Progress Header',
    }),
    progressDescription: props.Text({
      name: 'Progress Description',
    }),
    value: props.Number({
      name: 'Value',
      min: 0,
      max: 100,
      defaultValue: 50,
    }),
    label: props.Text({
      name: 'Label',
    }),
    color: props.Text({
      name: 'Color',
      defaultValue: '#16a34a',
    }),
    delay: props.Number({
      name: 'Delay (ms)',
      min: 0,
      defaultValue: 0,
    }),
  },
})
