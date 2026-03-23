import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import QuoteBuilder from "./components/QuoteBuilder/QuoteBuilder"
import "./components/QuoteBuilder/QuoteBuilder.css"

type ThemeVars = {
  '--background-primary': string
  '--background-secondary': string
  '--text-primary': string
  '--text-secondary': string
  '--border-color': string
  '--accent-color': string
  '--accent-text-color': string
  '--border-radius': string
}

const themes: Record<string, ThemeVars> = {
  light: {
    '--background-primary': '#ffffff',
    '--background-secondary': '#f5f5f5',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#737373',
    '--border-color': '#e5e5e5',
    '--accent-color': '#2563eb',
    '--accent-text-color': '#ffffff',
    '--border-radius': '8px'
  },
  dark: {
    '--background-primary': '#0a0a0a',
    '--background-secondary': '#1a1a1a',
    '--text-primary': '#fafafa',
    '--text-secondary': '#a3a3a3',
    '--border-color': '#2a2a2a',
    '--accent-color': '#3b82f6',
    '--accent-text-color': '#ffffff',
    '--border-radius': '8px'
  },
  brand: {
    '--background-primary': '#fef7f0',
    '--background-secondary': '#fde8d0',
    '--text-primary': '#1c1917',
    '--text-secondary': '#78716c',
    '--border-color': '#e7e5e4',
    '--accent-color': '#ea580c',
    '--accent-text-color': '#ffffff',
    '--border-radius': '12px'
  }
}

function App() {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | 'brand' | 'custom'>('light')
  const [customVars, setCustomVars] = useState<ThemeVars>(themes.light)

  const currentVars = activeTheme === 'custom' ? customVars : themes[activeTheme]

  const handleThemeChange = (theme: 'light' | 'dark' | 'brand' | 'custom') => {
    setActiveTheme(theme)
    if (theme !== 'custom') {
      setCustomVars(themes[theme])
    }
  }

  const handleCustomVarChange = (key: keyof ThemeVars, value: string) => {
    setCustomVars(prev => ({ ...prev, [key]: value }))
  }

  const pageBackground = activeTheme === 'dark' ? '#000000' : activeTheme === 'brand' ? '#fef3e8' : '#fafafa'

  return (
    <div style={{
      minHeight: '100vh',
      background: pageBackground,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
      transition: 'background 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <header style={{
          marginBottom: '40px',
          background: currentVars['--background-primary'],
          border: `1px solid ${currentVars['--border-color']}`,
          borderRadius: currentVars['--border-radius'],
          padding: '24px'
        }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700',
            color: currentVars['--text-primary']
          }}>QuoteBuilder Preview</h1>
          <p style={{
            margin: '0 0 24px 0',
            fontSize: '14px',
            color: currentVars['--text-secondary']
          }}>Local development environment - test different themes and configurations</p>

          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => handleThemeChange('light')}
              style={{
                padding: '10px 20px',
                border: `2px solid ${activeTheme === 'light' ? currentVars['--accent-color'] : currentVars['--border-color']}`,
                borderRadius: currentVars['--border-radius'],
                background: activeTheme === 'light' ? currentVars['--accent-color'] : currentVars['--background-secondary'],
                color: activeTheme === 'light' ? currentVars['--accent-text-color'] : currentVars['--text-primary'],
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >Light</button>
            <button
              onClick={() => handleThemeChange('dark')}
              style={{
                padding: '10px 20px',
                border: `2px solid ${activeTheme === 'dark' ? currentVars['--accent-color'] : currentVars['--border-color']}`,
                borderRadius: currentVars['--border-radius'],
                background: activeTheme === 'dark' ? currentVars['--accent-color'] : currentVars['--background-secondary'],
                color: activeTheme === 'dark' ? currentVars['--accent-text-color'] : currentVars['--text-primary'],
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >Dark</button>
            <button
              onClick={() => handleThemeChange('brand')}
              style={{
                padding: '10px 20px',
                border: `2px solid ${activeTheme === 'brand' ? currentVars['--accent-color'] : currentVars['--border-color']}`,
                borderRadius: currentVars['--border-radius'],
                background: activeTheme === 'brand' ? currentVars['--accent-color'] : currentVars['--background-secondary'],
                color: activeTheme === 'brand' ? currentVars['--accent-text-color'] : currentVars['--text-primary'],
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >Brand</button>
            <button
              onClick={() => handleThemeChange('custom')}
              style={{
                padding: '10px 20px',
                border: `2px solid ${activeTheme === 'custom' ? currentVars['--accent-color'] : currentVars['--border-color']}`,
                borderRadius: currentVars['--border-radius'],
                background: activeTheme === 'custom' ? currentVars['--accent-color'] : currentVars['--background-secondary'],
                color: activeTheme === 'custom' ? currentVars['--accent-text-color'] : currentVars['--text-primary'],
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >Custom</button>
          </div>

          {activeTheme === 'custom' && (
            <div style={{
              background: currentVars['--background-secondary'],
              border: `1px solid ${currentVars['--border-color']}`,
              borderRadius: currentVars['--border-radius'],
              padding: '20px',
              marginTop: '16px'
            }}>
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: currentVars['--text-primary']
              }}>Custom Theme Editor</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                {Object.entries(customVars).map(([key, value]) => (
                  <div key={key}>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: currentVars['--text-secondary']
                    }}>{key}</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={value.startsWith('#') ? value : '#000000'}
                        onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                        style={{
                          width: '50px',
                          height: '38px',
                          border: `1px solid ${currentVars['--border-color']}`,
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: `1px solid ${currentVars['--border-color']}`,
                          borderRadius: '6px',
                          background: currentVars['--background-primary'],
                          color: currentVars['--text-primary'],
                          fontSize: '14px',
                          fontFamily: 'monospace'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        <div style={currentVars as React.CSSProperties}>
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '22px',
              fontWeight: '700',
              color: currentVars['--text-primary']
            }}>Default Configuration</h2>
            <QuoteBuilder
              id="quote-builder-default"
              layout="side-by-side"
              heading="Get Your Custom Quote"
              subheading="Customize your package and see pricing in real-time"
              currencySymbol="$"
              inputSectionTitle="Configure Your Package"
              resultsSectionTitle="Your Quote"
              item1Label="Team Members"
              item1Type="number"
              item1DefaultValue={5}
              item1UnitPrice={25}
              item1DropdownOptions="Basic|1|10\nStandard|2|25\nPremium|3|50"
              item1Visible={true}
              item2Label="Storage Space (GB)"
              item2Type="dropdown"
              item2DefaultValue={2}
              item2UnitPrice={15}
              item2DropdownOptions="50GB|1|15\n100GB|2|25\n500GB|3|75"
              item2Visible={true}
              item3Label="Priority Support"
              item3Type="toggle"
              item3DefaultValue={0}
              item3UnitPrice={99}
              item3DropdownOptions="None|0|0\nEnabled|1|99"
              item3Visible={true}
              item4Label="API Access"
              item4Type="toggle"
              item4DefaultValue={0}
              item4UnitPrice={49}
              item4DropdownOptions="None|0|0\nEnabled|1|49"
              item4Visible={true}
              showSubtotals={true}
              showUnitPrices={true}
              totalLabel="Total Monthly Cost"
              ctaText="Get Your Quote"
              ctaLink="#"
              ctaSubtext="No credit card required. Get a detailed quote in minutes."
              showCtaSubtext={true}
            />
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '22px',
              fontWeight: '700',
              color: currentVars['--text-primary']
            }}>Stacked Layout - Simple Pricing</h2>
            <QuoteBuilder
              id="quote-builder-stacked"
              layout="stacked"
              heading="Choose Your Plan"
              subheading="Simple, transparent pricing for everyone"
              currencySymbol="€"
              inputSectionTitle="Select Options"
              resultsSectionTitle="Your Total"
              item1Label="Number of Users"
              item1Type="number"
              item1DefaultValue={3}
              item1UnitPrice={15}
              item1Visible={true}
              item2Label="Plan Type"
              item2Type="dropdown"
              item2DefaultValue={1}
              item2UnitPrice={0}
              item2DropdownOptions="Starter|1|0\nProfessional|2|50\nEnterprise|3|150"
              item2Visible={true}
              item3Label="Advanced Analytics"
              item3Type="toggle"
              item3DefaultValue={0}
              item3UnitPrice={29}
              item3Visible={true}
              item4Label="Dedicated Support"
              item4Type="toggle"
              item4DefaultValue={0}
              item4UnitPrice={79}
              item4Visible={true}
              showSubtotals={false}
              showUnitPrices={false}
              totalLabel="Monthly Total"
              ctaText="Start Free Trial"
              ctaLink="#"
              ctaSubtext="14-day free trial. No credit card required."
              showCtaSubtext={true}
            />
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '22px',
              fontWeight: '700',
              color: currentVars['--text-primary']
            }}>Minimal Configuration - Two Items Only</h2>
            <QuoteBuilder
              id="quote-builder-minimal"
              layout="side-by-side"
              heading="Quick Quote Calculator"
              subheading="Get instant pricing for your project"
              currencySymbol="$"
              inputSectionTitle="Project Details"
              resultsSectionTitle="Estimated Cost"
              item1Label="Project Size"
              item1Type="dropdown"
              item1DefaultValue={1}
              item1UnitPrice={0}
              item1DropdownOptions="Small|1|500\nMedium|2|1500\nLarge|3|3500"
              item1Visible={true}
              item2Label="Rush Delivery"
              item2Type="toggle"
              item2DefaultValue={0}
              item2UnitPrice={250}
              item2Visible={true}
              item3Visible={false}
              item4Visible={false}
              showSubtotals={true}
              showUnitPrices={true}
              totalLabel="Project Total"
              ctaText="Request Quote"
              ctaLink="#"
              ctaSubtext=""
              showCtaSubtext={false}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)