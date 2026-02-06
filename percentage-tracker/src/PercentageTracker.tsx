import { useEffect, useState } from 'react'

type PercentageTrackerProps = {
  // Main header text for the progress tracker
  progressHeader?: string
  // Secondary description text under the header text
  progressDescription?: string
  // The value of the progress tracker, from 0 to 100.
  value: number
  // An optional label text to display below the progress tracker.
  label?: string
  // The color of the header text
  headerColorProp?: string
  // The color of the progress highlighted on the bar
  color?: string
  // The delay in milliseconds before the progress tracker starts animating. Defaults to 0.
  delay?: number
  // The content slot to display below the progress tracker.
  contentSlot?: React.ReactNode
}

const clampValue = (input: number) => {
  if (Number.isNaN(input)) {
    return 0
  }

  return Math.min(100, Math.max(0, Math.round(input)))
}

const PercentageTracker = ({ value, progressHeader, progressDescription, label, headerColorProp = 'black', color = '#16a34a', delay = 0, contentSlot }: PercentageTrackerProps) => {
  const normalizedValue = clampValue(value)
  const animationDelay = Math.max(0, delay)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayValue(normalizedValue)
    }, animationDelay)

    return () => {
      clearTimeout(timeout)
    }
  }, [normalizedValue, animationDelay])

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-base-100 shadow-xl rounded-box">
      <div className="flex items-end justify-between mb-6">
        <div>
          {progressHeader && <h2 className="text-2xl font-semibold text-base-content" style={{ color: headerColorProp, fontFamily: "inherit" }}>{progressHeader}</h2>}
          {progressDescription && <p className="text-sm text-base-content/70">{progressDescription}</p>}
          {contentSlot}
        </div>
        <span className="text-4xl font-bold text-base-content">{displayValue}%</span>
      </div>
      <div
        className="relative h-4 rounded-full bg-base-300 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={displayValue}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${displayValue}%`, backgroundColor: color }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-[left] duration-700 ease-out"
          style={{ left: `${displayValue}%` }}
        >
          <div className="w-6 h-6 rounded-full border-4 border-base-100" style={{ backgroundColor: color }} />
        </div>
      </div>
      {label && <p className="mt-6 text-center text-base-content/80">{label}</p>}
    </div>
  )
}

export default PercentageTracker
