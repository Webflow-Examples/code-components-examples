import { declareComponent } from '@webflow/react'
import { props } from '@webflow/data-types'
import PercentageTracker from './PercentageTracker'
import './style.css'

/**
 * Webflow code component definition of the PercentageTracker component. This component is used
 * to display a progress tracker with a customizable label, percentage tracking color, and animation delay
 * from 0 to the percentage value.
 */
export default declareComponent(PercentageTracker, {
  name: 'Percentage Trackera',
  description: 'An animated progress tracker with customizable label, color, and delay.',
  group: 'Feedback',
  props: {
    progressHeader: props.Text({
      name: 'Progress Header',
    }),
    progressDescription: props.Text({
      name: 'Progress Description',
    }),
    // The value of the progress tracker, from 0 to 100.
    value: props.Number({
      name: 'Value',
      min: 0,
      max: 100,
      defaultValue: 50,
    }),
    label: props.Text({
      name: 'Label',
    }),
    headerColorProp: props.Text({
      name: 'Header Color',
      defaultValue: 'var()',
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
    contentSlot: props.Slot({
      name: 'Content Slot',
    }),
  },
})
