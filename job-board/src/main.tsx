import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import JobBoard from "./components/JobBoard/JobBoard"
import "./components/JobBoard/JobBoard.css"

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
  const [boardToken, setBoardToken] = useState('acme')

  const handleThemeChange = (theme: 'light' | 'dark' | 'brand' | 'custom') => {
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

  const currentVars = activeTheme === 'custom' ? customVars : themes[activeTheme]
  const pageBackground = activeTheme === 'dark' ? '#000000' : activeTheme === 'brand' ? '#fef2e8' : '#fafafa'

  return (
    <div style={{
      minHeight: '100vh',
      background: pageBackground,
      transition: 'background 0.3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <header style={{
          marginBottom: '48px',
          padding: '24px',
          background: currentVars['--background-primary'],
          borderRadius: '12px',
          border: `1px solid ${currentVars['--border-color']}`
        }}>
          <h1 style={{
            margin: '0 0 12px 0',
            fontSize: '24px',
            fontWeight: '600',
            color: currentVars['--text-primary']
          }}>
            JobBoard Component Preview
          </h1>
          <p style={{
            margin: '0 0 24px 0',
            fontSize: '14px',
            color: currentVars['--text-secondary']
          }}>
            Local development environment with theme preview system
          </p>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: activeTheme === 'custom' ? '24px' : '0'
          }}>
            <button
              onClick={() => handleThemeChange('light')}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                border: activeTheme === 'light' ? '2px solid #2563eb' : '1px solid #e5e5e5',
                borderRadius: '6px',
                background: activeTheme === 'light' ? '#eff6ff' : '#ffffff',
                color: activeTheme === 'light' ? '#2563eb' : '#1a1a1a',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                border: activeTheme === 'dark' ? '2px solid #3b82f6' : '1px solid #2a2a2a',
                borderRadius: '6px',
                background: activeTheme === 'dark' ? '#1e3a8a' : '#1a1a1a',
                color: activeTheme === 'dark' ? '#ffffff' : '#fafafa',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeChange('brand')}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                border: activeTheme === 'brand' ? '2px solid #ea580c' : '1px solid #e7e5e4',
                borderRadius: '6px',
                background: activeTheme === 'brand' ? '#ffedd5' : '#fef7f0',
                color: activeTheme === 'brand' ? '#ea580c' : '#1c1917',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Brand
            </button>
            <button
              onClick={() => handleThemeChange('custom')}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                border: activeTheme === 'custom' ? '2px solid #7c3aed' : '1px solid #e5e5e5',
                borderRadius: '6px',
                background: activeTheme === 'custom' ? '#f5f3ff' : '#ffffff',
                color: activeTheme === 'custom' ? '#7c3aed' : '#1a1a1a',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Custom
            </button>
          </div>

          {activeTheme === 'custom' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              padding: '20px',
              background: currentVars['--background-secondary'],
              borderRadius: '8px',
              border: `1px solid ${currentVars['--border-color']}`
            }}>
              {Object.entries(customVars).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: currentVars['--text-secondary']
                  }}>
                    {key}
                  </label>
                  <input
                    type={key === '--border-radius' ? 'text' : 'color'}
                    value={value}
                    onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                    style={{
                      padding: key === '--border-radius' ? '6px 10px' : '4px',
                      border: `1px solid ${currentVars['--border-color']}`,
                      borderRadius: '4px',
                      fontSize: '14px',
                      width: '100%',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: currentVars['--background-secondary'],
            borderRadius: '8px',
            border: `1px solid ${currentVars['--border-color']}`
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '14px',
              fontWeight: '600',
              color: currentVars['--text-primary']
            }}>
              API Configuration
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{
                fontSize: '12px',
                fontWeight: '500',
                color: currentVars['--text-secondary']
              }}>
                Greenhouse Board Token
              </label>
              <input
                type="text"
                value={boardToken}
                onChange={(e) => setBoardToken(e.target.value)}
                placeholder="Enter your Greenhouse board token (e.g. acme)"
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${currentVars['--border-color']}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  width: '100%',
                  maxWidth: '400px',
                  background: currentVars['--background-primary'],
                  color: currentVars['--text-primary']
                }}
              />
              <span style={{
                fontSize: '11px',
                color: currentVars['--text-secondary']
              }}>
                This is the public board token from your Greenhouse account URL
              </span>
            </div>
          </div>
        </header>

        <div style={currentVars as React.CSSProperties}>
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: currentVars['--text-primary']
            }}>
              Default Configuration
            </h2>
            <JobBoard
              id="job-board-default"
              boardToken={boardToken}
              heading="Open Positions"
              subheading="Join our team and help us build the future"
              layout="3-column"
              cardStyle="elevated"
              showFilters={true}
              filterDepartmentLabel="Department"
              filterLocationLabel="Location"
              filterAllDepartmentsText="All Departments"
              filterAllLocationsText="All Locations"
              jobsPerPage={12}
              paginationType="load-more"
              loadMoreButtonText="Load More Jobs"
              previousButtonText="Previous"
              nextButtonText="Next"
              applyButtonText="Apply Now"
              departmentLabelText="Department:"
              locationLabelText="Location:"
              showDepartmentOnCard={true}
              showLocationOnCard={true}
              openInNewTab={true}
              loadingText="Loading open positions..."
              showLoadingSpinner={true}
              errorHeading="Unable to Load Jobs"
              errorMessage="We're having trouble loading our open positions. Please try again later or contact us directly."
              retryButtonText="Try Again"
              showRetryButton={true}
              emptyStateHeading="No Positions Available"
              emptyStateMessage="There are no open positions matching your criteria at this time. Check back soon or adjust your filters."
              resultsCountText="{count} positions found"
              showResultsCount={true}
              cacheTimeout={5}
            />
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: currentVars['--text-primary']
            }}>
              Variation: 2-Column Outlined Cards with Pagination
            </h2>
            <JobBoard
              id="job-board-variation-1"
              boardToken={boardToken}
              heading="Career Opportunities"
              subheading="Explore roles across all departments"
              layout="2-column"
              cardStyle="outlined"
              showFilters={true}
              jobsPerPage={8}
              paginationType="pagination"
              applyButtonText="View & Apply"
              showDepartmentOnCard={true}
              showLocationOnCard={true}
              openInNewTab={false}
              showResultsCount={true}
              resultsCountText="Showing {count} open roles"
            />
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: currentVars['--text-primary']
            }}>
              Variation: 4-Column Minimal Cards, No Filters
            </h2>
            <JobBoard
              id="job-board-variation-2"
              boardToken={boardToken}
              heading="Join Our Team"
              subheading="We're hiring across multiple locations"
              layout="4-column"
              cardStyle="minimal"
              showFilters={false}
              jobsPerPage={16}
              paginationType="show-all"
              applyButtonText="Learn More"
              departmentLabelText="Team:"
              locationLabelText="Office:"
              showDepartmentOnCard={true}
              showLocationOnCard={false}
              showResultsCount={false}
            />
          </section>

          <section>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: currentVars['--text-primary']
            }}>
              Variation: Compact View with Custom Labels
            </h2>
            <JobBoard
              id="job-board-variation-3"
              boardToken={boardToken}
              heading="Current Openings"
              subheading="Find your next opportunity"
              layout="3-column"
              cardStyle="elevated"
              showFilters={true}
              filterDepartmentLabel="Team"
              filterLocationLabel="Office Location"
              filterAllDepartmentsText="All Teams"
              filterAllLocationsText="All Offices"
              jobsPerPage={6}
              paginationType="load-more"
              loadMoreButtonText="Show More Positions"
              applyButtonText="Submit Application"
              departmentLabelText="Team:"
              locationLabelText="Based in:"
              showDepartmentOnCard={true}
              showLocationOnCard={true}
              resultsCountText="{count} opportunities available"
              showResultsCount={true}
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