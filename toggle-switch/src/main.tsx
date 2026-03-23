import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import ToggleSwitch from "./components/ToggleSwitch/ToggleSwitch"
import "./components/ToggleSwitch/ToggleSwitch.css"

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
  const [activeTheme, setActiveTheme] = useState<string>("light")
  const [customVars, setCustomVars] = useState<ThemeVars>(themes.light)

  const currentVars = activeTheme === "custom" ? customVars : themes[activeTheme]

  const handleThemeChange = (themeName: string) => {
    setActiveTheme(themeName)
    if (themeName !== "custom") {
      setCustomVars(themes[themeName])
    }
  }

  const handleCustomVarChange = (varName: keyof ThemeVars, value: string) => {
    setCustomVars(prev => ({ ...prev, [varName]: value }))
  }

  const pageBackgroundColor = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef7f0" : "#fafafa"

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: pageBackgroundColor,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      padding: "40px 20px",
      transition: "background-color 0.3s ease"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          backgroundColor: currentVars["--background-primary"],
          border: `1px solid ${currentVars["--border-color"]}`,
          borderRadius: currentVars["--border-radius"],
          padding: "24px",
          marginBottom: "32px"
        }}>
          <h1 style={{
            margin: "0 0 24px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: currentVars["--text-primary"]
          }}>
            ToggleSwitch Component Preview
          </h1>

          <div style={{ marginBottom: "24px" }}>
            <div style={{
              display: "flex",
              gap: "12px",
              marginBottom: "16px"
            }}>
              {["light", "dark", "brand", "custom"].map(theme => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: activeTheme === theme ? "600" : "400",
                    color: activeTheme === theme ? currentVars["--accent-text-color"] : currentVars["--text-primary"],
                    backgroundColor: activeTheme === theme ? currentVars["--accent-color"] : currentVars["--background-secondary"],
                    border: `1px solid ${currentVars["--border-color"]}`,
                    borderRadius: currentVars["--border-radius"],
                    cursor: "pointer",
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
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                padding: "16px",
                backgroundColor: currentVars["--background-secondary"],
                border: `1px solid ${currentVars["--border-color"]}`,
                borderRadius: currentVars["--border-radius"]
              }}>
                {Object.entries(customVars).map(([varName, value]) => (
                  <div key={varName}>
                    <label style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: currentVars["--text-secondary"],
                      marginBottom: "4px"
                    }}>
                      {varName}
                    </label>
                    <input
                      type={varName === "--border-radius" ? "text" : "color"}
                      value={value}
                      onChange={(e) => handleCustomVarChange(varName as keyof ThemeVars, e.target.value)}
                      style={{
                        width: "100%",
                        padding: varName === "--border-radius" ? "6px 8px" : "4px",
                        fontSize: "14px",
                        border: `1px solid ${currentVars["--border-color"]}`,
                        borderRadius: "4px",
                        backgroundColor: currentVars["--background-primary"],
                        color: currentVars["--text-primary"],
                        cursor: "pointer"
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={currentVars as React.CSSProperties}>
          <div style={{
            backgroundColor: currentVars["--background-primary"],
            border: `1px solid ${currentVars["--border-color"]}`,
            borderRadius: currentVars["--border-radius"],
            padding: "32px",
            marginBottom: "24px"
          }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Default Configuration
            </h2>
            <ToggleSwitch
              id="default-toggle"
              size="medium"
              labelPosition="left"
              label="Enable notifications"
              description="Receive email updates about your account"
              defaultChecked={false}
              isDisabled={false}
              showIcons={false}
              showDescription={true}
            />
          </div>

          <div style={{
            backgroundColor: currentVars["--background-primary"],
            border: `1px solid ${currentVars["--border-color"]}`,
            borderRadius: currentVars["--border-radius"],
            padding: "32px",
            marginBottom: "24px"
          }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Prop Variations
            </h2>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px"
            }}>
              <div>
                <h3 style={{
                  margin: "0 0 16px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: currentVars["--text-secondary"]
                }}>
                  Small Size with Icons (Checked)
                </h3>
                <ToggleSwitch
                  id="small-toggle"
                  size="small"
                  labelPosition="left"
                  label="Dark mode"
                  description="Switch to dark theme"
                  defaultChecked={true}
                  isDisabled={false}
                  showIcons={true}
                  showDescription={true}
                />
              </div>

              <div>
                <h3 style={{
                  margin: "0 0 16px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: currentVars["--text-secondary"]
                }}>
                  Large Size with Right Label
                </h3>
                <ToggleSwitch
                  id="large-toggle"
                  size="large"
                  labelPosition="right"
                  label="Marketing emails"
                  description="Get updates about new features and promotions"
                  defaultChecked={false}
                  isDisabled={false}
                  showIcons={false}
                  showDescription={true}
                />
              </div>

              <div>
                <h3 style={{
                  margin: "0 0 16px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: currentVars["--text-secondary"]
                }}>
                  Disabled State (No Description)
                </h3>
                <ToggleSwitch
                  id="disabled-toggle"
                  size="medium"
                  labelPosition="left"
                  label="Premium feature"
                  description="Upgrade to unlock this feature"
                  defaultChecked={false}
                  isDisabled={true}
                  showIcons={false}
                  showDescription={false}
                />
              </div>
            </div>
          </div>
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