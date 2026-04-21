import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import ModalDialog from "./components/ModalDialog/ModalDialog"
import "./components/ModalDialog/ModalDialog.css"

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

  const handleCustomVarChange = (varName: keyof ThemeVars, value: string) => {
    setCustomVars(prev => ({
      ...prev,
      [varName]: value
    }))
  }

  const pageBackground = activeTheme === 'dark' ? '#000000' : activeTheme === 'brand' ? '#fef3e8' : '#f9fafb'

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: pageBackground,
      transition: 'background-color 0.3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#ffffff',
        borderBottom: `1px solid ${'#e5e5e5'}`,
        padding: '20px',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            margin: '0 0 20px 0',
            fontSize: '24px',
            fontWeight: '600',
            color: '#1a1a1a'
          }}>
            ModalDialog Component Preview
          </h1>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1a1a1a'
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
                    border: `2px solid ${activeTheme === theme ? currentVars['--accent-color'] : ('#e5e5e5')}`,
                    borderRadius: '6px',
                    backgroundColor: activeTheme === theme ? currentVars['--accent-color'] : (activeTheme === 'dark' ? '#0a0a0a' : '#ffffff'),
                    color: activeTheme === theme ? currentVars['--accent-text-color'] : ('#1a1a1a'),
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {activeTheme === 'custom' && (
            <div style={{
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: `1px solid ${'#e5e5e5'}`
            }}>
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                Custom Theme Editor
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                {(Object.keys(customVars) as Array<keyof ThemeVars>).map(varName => (
                  <div key={varName}>
                    <label style={{
                      display: 'block',
                      marginBottom: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#737373'
                    }}>
                      {varName}
                    </label>
                    <input
                      type={varName === '--border-radius' ? 'text' : 'color'}
                      value={customVars[varName]}
                      onChange={(e) => handleCustomVarChange(varName, e.target.value)}
                      style={{
                        width: '100%',
                        padding: varName === '--border-radius' ? '6px 8px' : '4px',
                        border: `1px solid ${'#e5e5e5'}`,
                        borderRadius: '4px',
                        backgroundColor: '#ffffff',
                        color: '#1a1a1a',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={currentVars as React.CSSProperties}>
          <section style={{ marginBottom: '60px' }}>
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
              borderRadius: currentVars['--border-radius'],
              border: `1px solid ${currentVars['--border-color']}`
            }}>
              <ModalDialog
                id="default-modal"
                isOpen={false}
                maxWidth="medium"
                closeOnBackdropClick={true}
                triggerButtonText="Open Modal"
                modalTitle="Modal Title"
                bodyContent="This is the modal body content. You can add any text, formatting, or information here."
                showCloseButton={true}
                closeButtonLabel="Close modal"
                animationDuration={300}
                enableEscapeKey={true}
                showTriggerButton={true}
              />
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
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
                borderRadius: currentVars['--border-radius'],
                border: `1px solid ${currentVars['--border-color']}`
              }}>
                <h3 style={{
                  margin: '0 0 12px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: currentVars['--text-primary']
                }}>
                  Small Modal with Rich Content
                </h3>
                <p style={{
                  margin: '0 0 16px 0',
                  fontSize: '14px',
                  color: currentVars['--text-secondary']
                }}>
                  Compact modal with formatted text content
                </p>
                <ModalDialog
                  id="small-modal"
                  isOpen={false}
                  maxWidth="small"
                  closeOnBackdropClick={true}
                  triggerButtonText="Open Small Modal"
                  modalTitle="Quick Notice"
                  bodyContent="<p><strong>Important:</strong> This is a small modal perfect for brief notifications or confirmations.</p><p>It includes <em>rich text formatting</em> support.</p>"
                  showCloseButton={true}
                  closeButtonLabel="Close"
                  animationDuration={200}
                  enableEscapeKey={true}
                  showTriggerButton={true}
                />
              </div>

              <div style={{
                padding: '24px',
                backgroundColor: currentVars['--background-primary'],
                borderRadius: currentVars['--border-radius'],
                border: `1px solid ${currentVars['--border-color']}`
              }}>
                <h3 style={{
                  margin: '0 0 12px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: currentVars['--text-primary']
                }}>
                  Large Modal with Extended Content
                </h3>
                <p style={{
                  margin: '0 0 16px 0',
                  fontSize: '14px',
                  color: currentVars['--text-secondary']
                }}>
                  Spacious modal for detailed information
                </p>
                <ModalDialog
                  id="large-modal"
                  isOpen={false}
                  maxWidth="large"
                  closeOnBackdropClick={false}
                  triggerButtonText="Open Large Modal"
                  modalTitle="Detailed Information Panel"
                  bodyContent="<h3>Welcome to the Large Modal</h3><p>This modal provides ample space for detailed content, including:</p><ul><li>Multiple paragraphs of text</li><li>Lists and structured content</li><li>Rich formatting options</li></ul><p>Notice that clicking the backdrop won't close this modal - you must use the close button or press Escape.</p>"
                  showCloseButton={true}
                  closeButtonLabel="Close panel"
                  animationDuration={400}
                  enableEscapeKey={true}
                  showTriggerButton={true}
                />
              </div>

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