import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import AvatarGroup from "./components/AvatarGroup/AvatarGroup"
import "./components/AvatarGroup/AvatarGroup.css"

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

  const pageBackgroundColor = activeTheme === 'dark' ? '#000000' : activeTheme === 'brand' ? '#fef3e7' : '#f9fafb'

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: pageBackgroundColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <header style={{
          marginBottom: '40px',
          padding: '24px',
          backgroundColor: currentVars['--background-primary'],
          border: `1px solid ${currentVars['--border-color']}`,
          borderRadius: currentVars['--border-radius']
        }}>
          <h1 style={{
            margin: '0 0 20px 0',
            fontSize: '28px',
            fontWeight: '700',
            color: currentVars['--text-primary']
          }}>
            AvatarGroup Component Preview
          </h1>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: currentVars['--text-primary']
            }}>
              Theme:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['light', 'dark', 'brand', 'custom'] as ThemeType[]).map(theme => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: `2px solid ${activeTheme === theme ? currentVars['--accent-color'] : currentVars['--border-color']}`,
                    borderRadius: currentVars['--border-radius'],
                    backgroundColor: activeTheme === theme ? currentVars['--accent-color'] : currentVars['--background-secondary'],
                    color: activeTheme === theme ? currentVars['--accent-text-color'] : currentVars['--text-primary'],
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {activeTheme === 'custom' && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: currentVars['--background-secondary'],
              borderRadius: currentVars['--border-radius'],
              border: `1px solid ${currentVars['--border-color']}`
            }}>
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: currentVars['--text-primary']
              }}>
                Custom Theme Editor
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {(Object.keys(customVars) as Array<keyof ThemeVars>).map(key => (
                  <div key={key}>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: currentVars['--text-secondary']
                    }}>
                      {key}
                    </label>
                    <input
                      type={key === '--border-radius' ? 'text' : 'color'}
                      value={customVars[key]}
                      onChange={(e) => handleCustomVarChange(key, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px',
                        border: `1px solid ${currentVars['--border-color']}`,
                        borderRadius: '4px',
                        fontSize: '14px',
                        backgroundColor: currentVars['--background-primary'],
                        color: currentVars['--text-primary']
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        <div style={currentVars as React.CSSProperties}>
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '20px',
              fontWeight: '600',
              color: currentVars['--text-primary']
            }}>
              Default Configuration
            </h2>
            <div style={{
              padding: '32px',
              backgroundColor: currentVars['--background-primary'],
              border: `1px solid ${currentVars['--border-color']}`,
              borderRadius: currentVars['--border-radius']
            }}>
              <AvatarGroup
                mode="group"
                size="medium"
                showBorder={true}
                overlapAmount="medium"
                maxCount={4}
                avatar1Name="John Doe"
                avatar1Status="online"
                avatar1Visible={true}
                avatar2Name="Jane Smith"
                avatar2Status="none"
                avatar2Visible={true}
                avatar3Name="Mike Johnson"
                avatar3Status="busy"
                avatar3Visible={true}
                avatar4Name="Sarah Williams"
                avatar4Status="offline"
                avatar4Visible={true}
                avatar5Name="David Brown"
                avatar5Status="online"
                avatar5Visible={true}
                totalCount={8}
              />
            </div>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '20px',
              fontWeight: '600',
              color: currentVars['--text-primary']
            }}>
              Variations
            </h2>
            
            <div style={{
              display: 'grid',
              gap: '24px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}>
              <div style={{
                padding: '24px',
                backgroundColor: currentVars['--background-primary'],
                border: `1px solid ${currentVars['--border-color']}`,
                borderRadius: currentVars['--border-radius']
              }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: currentVars['--text-primary']
                }}>
                  Single Avatar - Large Size
                </h3>
                <AvatarGroup
                  mode="single"
                  size="large"
                  showBorder={true}
                  avatar1Name="Alice Cooper"
                  avatar1Status="online"
                  avatar1Visible={true}
                />
              </div>

              <div style={{
                padding: '24px',
                backgroundColor: currentVars['--background-primary'],
                border: `1px solid ${currentVars['--border-color']}`,
                borderRadius: currentVars['--border-radius']
              }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: currentVars['--text-primary']
                }}>
                  Small Group - No Overlap
                </h3>
                <AvatarGroup
                  mode="group"
                  size="small"
                  showBorder={false}
                  overlapAmount="none"
                  maxCount={3}
                  avatar1Name="Tom Hardy"
                  avatar1Status="none"
                  avatar1Visible={true}
                  avatar2Name="Emma Stone"
                  avatar2Status="none"
                  avatar2Visible={true}
                  avatar3Name="Chris Evans"
                  avatar3Status="none"
                  avatar3Visible={true}
                  totalCount={3}
                />
              </div>

              <div style={{
                padding: '24px',
                backgroundColor: currentVars['--background-primary'],
                border: `1px solid ${currentVars['--border-color']}`,
                borderRadius: currentVars['--border-radius']
              }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: currentVars['--text-primary']
                }}>
                  Extra Large - Large Overlap
                </h3>
                <AvatarGroup
                  mode="group"
                  size="extra-large"
                  showBorder={true}
                  overlapAmount="large"
                  maxCount={3}
                  avatar1Name="Robert Downey"
                  avatar1Status="online"
                  avatar1Visible={true}
                  avatar2Name="Scarlett Johansson"
                  avatar2Status="busy"
                  avatar2Visible={true}
                  avatar3Name="Mark Ruffalo"
                  avatar3Status="offline"
                  avatar3Visible={true}
                  avatar4Name="Chris Hemsworth"
                  avatar4Status="online"
                  avatar4Visible={true}
                  avatar5Name="Jeremy Renner"
                  avatar5Status="none"
                  avatar5Visible={true}
                  totalCount={12}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element not found")

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)