import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import TooltipHoverCard from "./components/TooltipHoverCard/TooltipHoverCard"
import "./components/TooltipHoverCard/TooltipHoverCard.css"

type ThemeVars = {
  "--background-primary": string
  "--background-secondary": string
  "--text-primary": string
  "--text-secondary": string
  "--border-color": string
  "--accent-color": string
  "--accent-text-color": string
  "--border-radius": string
}

const themes: Record<string, ThemeVars> = {
  light: {
    "--background-primary": "#ffffff",
    "--background-secondary": "#f5f5f5",
    "--text-primary": "#1a1a1a",
    "--text-secondary": "#737373",
    "--border-color": "#e5e5e5",
    "--accent-color": "#2563eb",
    "--accent-text-color": "#ffffff",
    "--border-radius": "8px"
  },
  dark: {
    "--background-primary": "#0a0a0a",
    "--background-secondary": "#1a1a1a",
    "--text-primary": "#fafafa",
    "--text-secondary": "#a3a3a3",
    "--border-color": "#2a2a2a",
    "--accent-color": "#3b82f6",
    "--accent-text-color": "#ffffff",
    "--border-radius": "8px"
  },
  brand: {
    "--background-primary": "#fef7f0",
    "--background-secondary": "#fde8d0",
    "--text-primary": "#1c1917",
    "--text-secondary": "#78716c",
    "--border-color": "#e7e5e4",
    "--accent-color": "#ea580c",
    "--accent-text-color": "#ffffff",
    "--border-radius": "12px"
  }
}

function App() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "brand" | "custom">("light")
  const [customVars, setCustomVars] = useState<ThemeVars>(themes.light)

  const currentVars = activeTheme === "custom" ? customVars : themes[activeTheme]

  const handleThemeChange = (theme: "light" | "dark" | "brand" | "custom") => {
    setActiveTheme(theme)
    if (theme !== "custom") {
      setCustomVars(themes[theme])
    }
  }

  const handleCustomVarChange = (key: keyof ThemeVars, value: string) => {
    setCustomVars(prev => ({ ...prev, [key]: value }))
  }

  const pageBackground = activeTheme === "dark" ? "#0a0a0a" : activeTheme === "brand" ? "#fef7f0" : "#ffffff"

  return (
    <div style={{
      minHeight: "100vh",
      background: pageBackground,
      transition: "background 0.3s ease",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      <div style={{
        position: "sticky",
        top: 0,
        background: currentVars["--background-primary"],
        borderBottom: `1px solid ${currentVars["--border-color"]}`,
        padding: "20px",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{
            margin: "0 0 20px 0",
            fontSize: "24px",
            fontWeight: 600,
            color: currentVars["--text-primary"]
          }}>
            TooltipHoverCard Preview
          </h1>

          <div style={{ marginBottom: "20px" }}>
            <div style={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
              flexWrap: "wrap"
            }}>
              {(["light", "dark", "brand", "custom"] as const).map(theme => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  style={{
                    padding: "8px 16px",
                    border: `2px solid ${activeTheme === theme ? currentVars["--accent-color"] : currentVars["--border-color"]}`,
                    background: activeTheme === theme ? currentVars["--accent-color"] : currentVars["--background-secondary"],
                    color: activeTheme === theme ? currentVars["--accent-text-color"] : currentVars["--text-primary"],
                    borderRadius: currentVars["--border-radius"],
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    textTransform: "capitalize",
                    transition: "all 0.2s ease"
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>

            {activeTheme === "custom" && (
              <div style={{
                background: currentVars["--background-secondary"],
                border: `1px solid ${currentVars["--border-color"]}`,
                borderRadius: currentVars["--border-radius"],
                padding: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px"
              }}>
                {Object.entries(customVars).map(([key, value]) => (
                  <div key={key}>
                    <label style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: currentVars["--text-secondary"],
                      marginBottom: "6px",
                      textTransform: "capitalize"
                    }}>
                      {key.replace(/--/g, "").replace(/-/g, " ")}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: `1px solid ${currentVars["--border-color"]}`,
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: currentVars["--text-primary"],
                        background: currentVars["--background-primary"],
                        fontFamily: "monospace"
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={currentVars as React.CSSProperties}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px"
        }}>
          <section style={{ marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: currentVars["--text-primary"],
              marginBottom: "20px"
            }}>
              Default Configuration
            </h2>
            <div style={{
              padding: "40px",
              background: currentVars["--background-secondary"],
              borderRadius: currentVars["--border-radius"],
              border: `1px solid ${currentVars["--border-color"]}`
            }}>
              <TooltipHoverCard
                id="default-tooltip"
                mode="tooltip"
                theme="dark"
                placement="top"
                triggerText="Hover me"
                tooltipText="This is helpful information"
                cardTitle="More Information"
                cardDescription="This hover card provides detailed contextual information with formatting support for better readability."
                showCardImage={false}
                hoverDelay={200}
                showArrow={true}
                autoFlip={true}
                maxWidth={300}
                ariaLabel="Additional information"
              />
            </div>
          </section>

          <section style={{ marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: currentVars["--text-primary"],
              marginBottom: "20px"
            }}>
              Hover Card Mode with Image
            </h2>
            <div style={{
              padding: "40px",
              background: currentVars["--background-secondary"],
              borderRadius: currentVars["--border-radius"],
              border: `1px solid ${currentVars["--border-color"]}`
            }}>
              <TooltipHoverCard
                id="hovercard-with-image"
                mode="hoverCard"
                theme="light"
                placement="bottom"
                triggerText="View Details"
                tooltipText="Click to see more"
                cardTitle="Product Information"
                cardDescription="<p><strong>Premium Quality</strong></p><p>This product features advanced technology and exceptional craftsmanship. Perfect for professionals and enthusiasts alike.</p>"
                cardImage={{ src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" }}
                showCardImage={true}
                hoverDelay={300}
                showArrow={true}
                autoFlip={true}
                maxWidth={400}
                ariaLabel="Product details"
              />
            </div>
          </section>

          <section style={{ marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: currentVars["--text-primary"],
              marginBottom: "20px"
            }}>
              Multiple Placements
            </h2>
            <div style={{
              padding: "80px 40px",
              background: currentVars["--background-secondary"],
              borderRadius: currentVars["--border-radius"],
              border: `1px solid ${currentVars["--border-color"]}`,
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <TooltipHoverCard
                id="tooltip-top"
                mode="tooltip"
                theme="dark"
                placement="top"
                triggerText="Top"
                tooltipText="Tooltip appears above"
                hoverDelay={150}
                showArrow={true}
                autoFlip={true}
                maxWidth={250}
                ariaLabel="Top placement example"
              />
              <TooltipHoverCard
                id="tooltip-right"
                mode="tooltip"
                theme="dark"
                placement="right"
                triggerText="Right"
                tooltipText="Tooltip appears to the right"
                hoverDelay={150}
                showArrow={true}
                autoFlip={true}
                maxWidth={250}
                ariaLabel="Right placement example"
              />
              <TooltipHoverCard
                id="tooltip-bottom"
                mode="tooltip"
                theme="dark"
                placement="bottom"
                triggerText="Bottom"
                tooltipText="Tooltip appears below"
                hoverDelay={150}
                showArrow={true}
                autoFlip={true}
                maxWidth={250}
                ariaLabel="Bottom placement example"
              />
              <TooltipHoverCard
                id="tooltip-left"
                mode="tooltip"
                theme="dark"
                placement="left"
                triggerText="Left"
                tooltipText="Tooltip appears to the left"
                hoverDelay={150}
                showArrow={true}
                autoFlip={true}
                maxWidth={250}
                ariaLabel="Left placement example"
              />
            </div>
          </section>

          <section>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: currentVars["--text-primary"],
              marginBottom: "20px"
            }}>
              Rich Content Hover Card
            </h2>
            <div style={{
              padding: "40px",
              background: currentVars["--background-secondary"],
              borderRadius: currentVars["--border-radius"],
              border: `1px solid ${currentVars["--border-color"]}`
            }}>
              <TooltipHoverCard
                id="rich-hovercard"
                mode="hoverCard"
                theme="light"
                placement="right"
                triggerText="Learn More"
                tooltipText="Additional information available"
                cardTitle="Advanced Features"
                cardDescription="<h3>Key Benefits</h3><ul><li>Automatic viewport edge detection</li><li>Smooth fade transitions</li><li>Full keyboard accessibility</li><li>Screen reader support</li></ul><p><em>Hover delay and placement are fully customizable.</em></p>"
                showCardImage={false}
                hoverDelay={250}
                showArrow={true}
                autoFlip={true}
                maxWidth={350}
                ariaLabel="Feature details"
              />
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