import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import "./components/Breadcrumbs/Breadcrumbs.css"

type ThemeType = 'light' | 'dark' | 'brand' | 'custom'

interface ThemeVars {
  '--background-primary': string
  '--background-secondary': string
  '--text-primary': string
  '--text-secondary': string
  '--border-color': string
  '--accent-color': string
  '--accent-text-color': string
  '--border-radius': string
}

const themes: Record<Exclude<ThemeType, 'custom'>, ThemeVars> = {
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
  const [activeTheme, setActiveTheme] = useState<ThemeType>('light')
  const [customVars, setCustomVars] = useState<ThemeVars>(themes.light)

  const currentVars = activeTheme === 'custom' ? customVars : themes[activeTheme]

  const handleThemeChange = (theme: ThemeType) => {
    setActiveTheme(theme)
    if (theme !== 'custom') {
      setCustomVars(themes[theme])
    }
  }

  const handleCustomVarChange = (key: keyof ThemeVars, value: string) => {
    setCustomVars(prev => ({ ...prev, [key]: value }))
  }

  const pageBackground = activeTheme === 'dark' ? '#000000' : activeTheme === 'brand' ? '#fef3e8' : '#f9fafb'

  return (
    <div style={{
      minHeight: '100vh',
      background: pageBackground,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      transition: 'background 0.3s ease'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        background: currentVars['--background-primary'],
        borderBottom: `1px solid ${currentVars['--border-color']}`,
        padding: '1.5rem',
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: currentVars['--text-primary']
          }}>
            Theme Preview
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {(['light', 'dark', 'brand', 'custom'] as ThemeType[]).map(theme => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                style={{
                  padding: '0.5rem 1rem',
                  border: `2px solid ${activeTheme === theme ? currentVars['--accent-color'] : currentVars['--border-color']}`,
                  borderRadius: currentVars['--border-radius'],
                  background: activeTheme === theme ? currentVars['--accent-color'] : currentVars['--background-secondary'],
                  color: activeTheme === theme ? currentVars['--accent-text-color'] : currentVars['--text-primary'],
                  cursor: 'pointer',
                  fontWeight: activeTheme === theme ? 600 : 400,
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease'
                }}
              >
                {theme}
              </button>
            ))}
          </div>

          {activeTheme === 'custom' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              padding: '1rem',
              background: currentVars['--background-secondary'],
              borderRadius: currentVars['--border-radius'],
              border: `1px solid ${currentVars['--border-color']}`
            }}>
              {Object.entries(customVars).map(([key, value]) => (
                <div key={key}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: currentVars['--text-secondary'],
                    marginBottom: '0.25rem',
                    textTransform: 'capitalize'
                  }}>
                    {key.replace('--', '').replace(/-/g, ' ')}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: `1px solid ${currentVars['--border-color']}`,
                      borderRadius: currentVars['--border-radius'],
                      background: currentVars['--background-primary'],
                      color: currentVars['--text-primary'],
                      fontSize: '0.875rem',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        <div style={currentVars as React.CSSProperties}>
          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: currentVars['--text-primary'],
              marginBottom: '1.5rem'
            }}>
              Default Configuration
            </h3>
            <div style={{
              padding: '2rem',
              background: currentVars['--background-primary'],
              border: `1px solid ${currentVars['--border-color']}`,
              borderRadius: currentVars['--border-radius']
            }}>
              <Breadcrumbs
                id="breadcrumbs-default"
                separator="chevron"
                homeLink="/"
                level1Label="Products"
                level1Link="/products"
                level1Visible={true}
                level2Label="Electronics"
                level2Link="/products/electronics"
                level2Visible={true}
                level3Label="Laptops"
                level3Link="/products/electronics/laptops"
                level3Visible={true}
                level4Label="Gaming"
                level4Link="/products/electronics/laptops/gaming"
                level4Visible={true}
                level5Label="High Performance"
                level5Link="/products/electronics/laptops/gaming/high-performance"
                level5Visible={true}
                currentPageLabel="Gaming Laptop X1"
              />
            </div>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: currentVars['--text-primary'],
              marginBottom: '1.5rem'
            }}>
              Prop Variations
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: currentVars['--text-secondary'],
                  marginBottom: '0.75rem'
                }}>
                  Short Path with Slash Separator
                </h4>
                <div style={{
                  padding: '2rem',
                  background: currentVars['--background-primary'],
                  border: `1px solid ${currentVars['--border-color']}`,
                  borderRadius: currentVars['--border-radius']
                }}>
                  <Breadcrumbs
                    id="breadcrumbs-short"
                    separator="slash"
                    homeLink="/"
                    level1Label="Blog"
                    level1Link="/blog"
                    level1Visible={true}
                    level2Label="Technology"
                    level2Link="/blog/technology"
                    level2Visible={true}
                    level3Visible={false}
                    level4Visible={false}
                    level5Visible={false}
                    currentPageLabel="React Best Practices"
                  />
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: currentVars['--text-secondary'],
                  marginBottom: '0.75rem'
                }}>
                  Deep Navigation with Arrow Separator
                </h4>
                <div style={{
                  padding: '2rem',
                  background: currentVars['--background-primary'],
                  border: `1px solid ${currentVars['--border-color']}`,
                  borderRadius: currentVars['--border-radius']
                }}>
                  <Breadcrumbs
                    id="breadcrumbs-deep"
                    separator="arrow"
                    homeLink="/"
                    level1Label="Documentation"
                    level1Link="/docs"
                    level1Visible={true}
                    level2Label="Components"
                    level2Link="/docs/components"
                    level2Visible={true}
                    level3Label="Navigation"
                    level3Link="/docs/components/navigation"
                    level3Visible={true}
                    level4Label="Breadcrumbs"
                    level4Link="/docs/components/navigation/breadcrumbs"
                    level4Visible={true}
                    level5Label="Advanced"
                    level5Link="/docs/components/navigation/breadcrumbs/advanced"
                    level5Visible={true}
                    currentPageLabel="Custom Separators"
                  />
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: currentVars['--text-secondary'],
                  marginBottom: '0.75rem'
                }}>
                  Minimal Path (Home + Current)
                </h4>
                <div style={{
                  padding: '2rem',
                  background: currentVars['--background-primary'],
                  border: `1px solid ${currentVars['--border-color']}`,
                  borderRadius: currentVars['--border-radius']
                }}>
                  <Breadcrumbs
                    id="breadcrumbs-minimal"
                    separator="chevron"
                    homeLink="/"
                    level1Visible={false}
                    level2Visible={false}
                    level3Visible={false}
                    level4Visible={false}
                    level5Visible={false}
                    currentPageLabel="About Us"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: currentVars['--text-primary'],
              marginBottom: '1rem'
            }}>
              Component Info
            </h3>
            <div style={{
              padding: '1.5rem',
              background: currentVars['--background-secondary'],
              border: `1px solid ${currentVars['--border-color']}`,
              borderRadius: currentVars['--border-radius'],
              fontSize: '0.875rem',
              color: currentVars['--text-secondary'],
              lineHeight: 1.6
            }}>
              <p style={{ margin: 0 }}>
                A breadcrumb navigation component that displays a hierarchical path to the current page. 
                Shows a home icon as the first item, followed by up to 5 levels of navigation links 
                separated by a configurable separator (slash, chevron, or arrow). The last item represents 
                the current page and is rendered as non-interactive text. On mobile viewports, middle items 
                collapse into an ellipsis menu, showing only the first and last two items to save space.
              </p>
            </div>
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