import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import ToastNotification from "./components/ToastNotification/ToastNotification"
import "./components/ToastNotification/ToastNotification.css"

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
    "--border-radius": "8px",
  },
  dark: {
    "--background-primary": "#0a0a0a",
    "--background-secondary": "#1a1a1a",
    "--text-primary": "#fafafa",
    "--text-secondary": "#a3a3a3",
    "--border-color": "#2a2a2a",
    "--accent-color": "#3b82f6",
    "--accent-text-color": "#ffffff",
    "--border-radius": "8px",
  },
  brand: {
    "--background-primary": "#fef7f0",
    "--background-secondary": "#fde8d0",
    "--text-primary": "#1c1917",
    "--text-secondary": "#78716c",
    "--border-color": "#e7e5e4",
    "--accent-color": "#ea580c",
    "--accent-text-color": "#ffffff",
    "--border-radius": "12px",
  },
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
    setCustomVars((prev) => ({ ...prev, [key]: value }))
  }

  const pageBackground = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef3e8" : "#f9fafb"

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: pageBackground,
      transition: "background 0.3s ease"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
      }}>
        <div style={{
          background: currentVars["--background-primary"],
          border: `1px solid ${currentVars["--border-color"]}`,
          borderRadius: currentVars["--border-radius"],
          padding: "24px",
          marginBottom: "32px"
        }}>
          <h1 style={{
            margin: "0 0 20px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: currentVars["--text-primary"]
          }}>
            Toast Notification Preview
          </h1>

          <div style={{ marginBottom: "20px" }}>
            <div style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap"
            }}>
              {(["light", "dark", "brand", "custom"] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  style={{
                    padding: "8px 16px",
                    border: `2px solid ${activeTheme === theme ? currentVars["--accent-color"] : currentVars["--border-color"]}`,
                    borderRadius: "6px",
                    background: activeTheme === theme ? currentVars["--accent-color"] : currentVars["--background-secondary"],
                    color: activeTheme === theme ? currentVars["--accent-text-color"] : currentVars["--text-primary"],
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    transition: "all 0.2s ease"
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {activeTheme === "custom" && (
            <div style={{
              background: currentVars["--background-secondary"],
              border: `1px solid ${currentVars["--border-color"]}`,
              borderRadius: "6px",
              padding: "20px",
              marginTop: "16px"
            }}>
              <h3 style={{
                margin: "0 0 16px 0",
                fontSize: "16px",
                fontWeight: "600",
                color: currentVars["--text-primary"]
              }}>
                Custom Theme Editor
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px"
              }}>
                {Object.entries(customVars).map(([key, value]) => (
                  <div key={key}>
                    <label style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: currentVars["--text-secondary"]
                    }}>
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: `1px solid ${currentVars["--border-color"]}`,
                        borderRadius: "4px",
                        background: currentVars["--background-primary"],
                        color: currentVars["--text-primary"],
                        fontSize: "13px",
                        fontFamily: "monospace"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={currentVars as React.CSSProperties}>
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "20px",
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Default Configuration
            </h2>
            <ToastNotification
              id="toast-default"
              position="top-right"
              variant="info"
              message="Notification message"
              description="Additional details about this notification"
              showDescription={true}
              duration={5000}
              showProgressBar={true}
              showCloseButton={true}
              maxToasts={5}
              enableAnimations={true}
              toast1Message="Changes saved successfully"
              toast1Description="Your profile has been updated"
              toast1Variant="success"
              toast1Visible={true}
              toast2Message="Connection error"
              toast2Description="Unable to reach the server"
              toast2Variant="error"
              toast2Visible={true}
              toast3Message="Storage almost full"
              toast3Description="You have used 90% of your storage"
              toast3Variant="warning"
              toast3Visible={true}
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "20px",
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Bottom Left Position - Minimal Style
            </h2>
            <ToastNotification
              id="toast-bottom-left"
              position="bottom-left"
              variant="success"
              message="Task completed"
              description="Your export is ready to download"
              showDescription={true}
              duration={3000}
              showProgressBar={false}
              showCloseButton={false}
              maxToasts={3}
              enableAnimations={true}
              toast1Message="Task completed"
              toast1Description="Your export is ready to download"
              toast1Variant="success"
              toast1Visible={true}
              toast2Message=""
              toast2Description=""
              toast2Variant="info"
              toast2Visible={false}
              toast3Message=""
              toast3Description=""
              toast3Variant="info"
              toast3Visible={false}
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "20px",
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Multiple Error Toasts - Top Left
            </h2>
            <ToastNotification
              id="toast-errors"
              position="top-left"
              variant="error"
              message="Error notification"
              description="Something went wrong"
              showDescription={true}
              duration={7000}
              showProgressBar={true}
              showCloseButton={true}
              maxToasts={5}
              enableAnimations={true}
              toast1Message="Authentication failed"
              toast1Description="Invalid username or password"
              toast1Variant="error"
              toast1Visible={true}
              toast2Message="Network timeout"
              toast2Description="Request took too long to complete"
              toast2Variant="error"
              toast2Visible={true}
              toast3Message="File upload failed"
              toast3Description="File size exceeds 10MB limit"
              toast3Variant="error"
              toast3Visible={true}
            />
          </section>

          <section>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "20px",
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Long Duration - No Animations
            </h2>
            <ToastNotification
              id="toast-static"
              position="bottom-right"
              variant="warning"
              message="System maintenance scheduled"
              description="Services will be unavailable from 2:00 AM to 4:00 AM EST"
              showDescription={true}
              duration={10000}
              showProgressBar={true}
              showCloseButton={true}
              maxToasts={2}
              enableAnimations={false}
              toast1Message="System maintenance scheduled"
              toast1Description="Services will be unavailable from 2:00 AM to 4:00 AM EST"
              toast1Variant="warning"
              toast1Visible={true}
              toast2Message="New features available"
              toast2Description="Check out our latest updates in the changelog"
              toast2Variant="info"
              toast2Visible={true}
              toast3Message=""
              toast3Description=""
              toast3Variant="info"
              toast3Visible={false}
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