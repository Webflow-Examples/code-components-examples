import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import PaginationControls from "./components/PaginationControls/PaginationControls"
import "./components/PaginationControls/PaginationControls.css"

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

  const handleThemeChange = (theme: ThemeType) => {
    setActiveTheme(theme)
    if (theme !== 'custom') {
      setCustomVars(themes[theme])
    }
  }

  const handleCustomVarChange = (key: keyof ThemeVars, value: string) => {
    setCustomVars(prev => ({ ...prev, [key]: value }))
  }

  const currentVars = activeTheme === 'custom' ? customVars : themes[activeTheme as Exclude<ThemeType, 'custom'>]

  const pageBackground = activeTheme === 'dark' ? '#000000' : activeTheme === 'brand' ? '#fef3e8' : '#fafafa'

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: pageBackground,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: currentVars['--background-primary'],
        borderBottom: `1px solid ${currentVars['--border-color']}`,
        padding: '20px',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            margin: '0 0 20px 0',
            fontSize: '24px',
            fontWeight: '600',
            color: currentVars['--text-primary']
          }}>
            PaginationControls Preview
          </h1>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {(['light', 'dark', 'brand', 'custom'] as ThemeType[]).map(theme => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  style={{
                    padding: '8px 16px',
                    border: `2px solid ${activeTheme === theme ? currentVars['--accent-color'] : currentVars['--border-color']}`,
                    borderRadius: currentVars['--border-radius'],
                    backgroundColor: activeTheme === theme ? currentVars['--accent-color'] : currentVars['--background-secondary'],
                    color: activeTheme === theme ? currentVars['--accent-text-color'] : currentVars['--text-primary'],
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
              backgroundColor: currentVars['--background-secondary'],
              borderRadius: currentVars['--border-radius'],
              border: `1px solid ${currentVars['--border-color']}`
            }}>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '14px',
                fontWeight: '600',
                color: currentVars['--text-primary']
              }}>
                Custom Theme Editor
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                {(Object.keys(customVars) as Array<keyof ThemeVars>).map(key => (
                  <div key={key}>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: currentVars['--text-secondary'],
                      marginBottom: '4px'
                    }}>
                      {key}
                    </label>
                    <input
                      type="text"
                      value={customVars[key]}
                      onChange={(e) => handleCustomVarChange(key, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        border: `1px solid ${currentVars['--border-color']}`,
                        borderRadius: '4px',
                        fontSize: '13px',
                        backgroundColor: currentVars['--background-primary'],
                        color: currentVars['--text-primary']
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
              fontSize: '20px',
              fontWeight: '600',
              color: currentVars['--text-primary'],
              marginBottom: '24px'
            }}>
              Default Configuration
            </h2>
            <div style={{
              padding: '32px',
              backgroundColor: currentVars['--background-primary'],
              borderRadius: currentVars['--border-radius'],
              border: `1px solid ${currentVars['--border-color']}`
            }}>
              <PaginationControls
                id="pagination-default"
                style="numbered"
                size="default"
                alignment="center"
                currentPage={5}
                totalPages={20}
                itemsPerPage={10}
                totalItems={200}
                previousText="Previous"
                nextText="Next"
                loadMoreText="Load More"
                pageLabel="Page"
                ofLabel="of"
                itemsLabel="items"
                showPageInfo={true}
                showItemsCount={false}
                showFirstLast={false}
                showPreviousNext={true}
                maxVisiblePages={7}
                firstPageText="First"
                lastPageText="Last"
                ariaLabel="Pagination Navigation"
              />
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: currentVars['--text-primary'],
              marginBottom: '24px'
            }}>
              Variations
            </h2>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: currentVars['--text-primary'],
                marginBottom: '12px'
              }}>
                Simple Style with Items Count
              </h3>
              <div style={{
                padding: '32px',
                backgroundColor: currentVars['--background-primary'],
                borderRadius: currentVars['--border-radius'],
                border: `1px solid ${currentVars['--border-color']}`
              }}>
                <PaginationControls
                  id="pagination-simple"
                  style="simple"
                  size="default"
                  alignment="left"
                  currentPage={3}
                  totalPages={10}
                  itemsPerPage={25}
                  totalItems={250}
                  previousText="← Prev"
                  nextText="Next →"
                  pageLabel="Page"
                  ofLabel="of"
                  itemsLabel="results"
                  showPageInfo={true}
                  showItemsCount={true}
                  showPreviousNext={true}
                  ariaLabel="Simple Pagination"
                />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: currentVars['--text-primary'],
                marginBottom: '12px'
              }}>
                Compact with First/Last Buttons
              </h3>
              <div style={{
                padding: '32px',
                backgroundColor: currentVars['--background-primary'],
                borderRadius: currentVars['--border-radius'],
                border: `1px solid ${currentVars['--border-color']}`
              }}>
                <PaginationControls
                  id="pagination-compact"
                  style="numbered"
                  size="compact"
                  alignment="right"
                  currentPage={12}
                  totalPages={50}
                  itemsPerPage={20}
                  totalItems={1000}
                  previousText="Prev"
                  nextText="Next"
                  pageLabel="Page"
                  ofLabel="/"
                  showPageInfo={true}
                  showItemsCount={false}
                  showFirstLast={true}
                  showPreviousNext={true}
                  maxVisiblePages={5}
                  firstPageText="First"
                  lastPageText="Last"
                  ariaLabel="Compact Pagination"
                />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: currentVars['--text-primary'],
                marginBottom: '12px'
              }}>
                Load More Style
              </h3>
              <div style={{
                padding: '32px',
                backgroundColor: currentVars['--background-primary'],
                borderRadius: currentVars['--border-radius'],
                border: `1px solid ${currentVars['--border-color']}`
              }}>
                <PaginationControls
                  id="pagination-loadmore"
                  style="loadMore"
                  size="default"
                  alignment="center"
                  currentPage={3}
                  totalPages={15}
                  itemsPerPage={12}
                  totalItems={180}
                  loadMoreText="Load More Items"
                  pageLabel="Showing"
                  ofLabel="of"
                  itemsLabel="items"
                  showPageInfo={false}
                  showItemsCount={true}
                  ariaLabel="Load More Pagination"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const root = document.getElementById("root")
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}