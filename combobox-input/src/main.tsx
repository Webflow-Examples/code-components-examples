import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import ComboboxInput from "./components/ComboboxInput/ComboboxInput"
import "./components/ComboboxInput/ComboboxInput.css"

type ThemeVariables = {
  "--background-primary": string
  "--background-secondary": string
  "--text-primary": string
  "--text-secondary": string
  "--border-color": string
  "--accent-color": string
  "--accent-text-color": string
  "--border-radius": string
}

const lightTheme: ThemeVariables = {
  "--background-primary": "#ffffff",
  "--background-secondary": "#f5f5f5",
  "--text-primary": "#1a1a1a",
  "--text-secondary": "#737373",
  "--border-color": "#e5e5e5",
  "--accent-color": "#2563eb",
  "--accent-text-color": "#ffffff",
  "--border-radius": "8px"
}

const darkTheme: ThemeVariables = {
  "--background-primary": "#0a0a0a",
  "--background-secondary": "#1a1a1a",
  "--text-primary": "#fafafa",
  "--text-secondary": "#a3a3a3",
  "--border-color": "#2a2a2a",
  "--accent-color": "#3b82f6",
  "--accent-text-color": "#ffffff",
  "--border-radius": "8px"
}

const brandTheme: ThemeVariables = {
  "--background-primary": "#fef7f0",
  "--background-secondary": "#fde8d0",
  "--text-primary": "#1c1917",
  "--text-secondary": "#78716c",
  "--border-color": "#e7e5e4",
  "--accent-color": "#ea580c",
  "--accent-text-color": "#ffffff",
  "--border-radius": "12px"
}

function App() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "brand" | "custom">("light")
  const [customVars, setCustomVars] = useState<ThemeVariables>(lightTheme)

  const getCurrentTheme = (): ThemeVariables => {
    switch (activeTheme) {
      case "light":
        return lightTheme
      case "dark":
        return darkTheme
      case "brand":
        return brandTheme
      case "custom":
        return customVars
    }
  }

  const handleThemeChange = (theme: "light" | "dark" | "brand" | "custom") => {
    setActiveTheme(theme)
    if (theme !== "custom") {
      const themeMap = { light: lightTheme, dark: darkTheme, brand: brandTheme }
      setCustomVars(themeMap[theme])
    }
  }

  const handleCustomVarChange = (key: keyof ThemeVariables, value: string) => {
    setCustomVars(prev => ({ ...prev, [key]: value }))
  }

  const currentTheme = getCurrentTheme()
  const pageBackground = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef2e8" : "#fafafa"

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: pageBackground,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      padding: "40px 20px",
      transition: "background-color 0.3s ease"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          backgroundColor: currentTheme["--background-primary"],
          border: `1px solid ${currentTheme["--border-color"]}`,
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "32px"
        }}>
          <h1 style={{
            margin: "0 0 20px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: currentTheme["--text-primary"]
          }}>
            ComboboxInput Component Preview
          </h1>

          <div style={{ marginBottom: "20px" }}>
            <div style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap"
            }}>
              <button
                onClick={() => handleThemeChange("light")}
                style={{
                  padding: "8px 16px",
                  border: `2px solid ${activeTheme === "light" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "light" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "light" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease"
                }}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                style={{
                  padding: "8px 16px",
                  border: `2px solid ${activeTheme === "dark" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "dark" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "dark" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease"
                }}
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange("brand")}
                style={{
                  padding: "8px 16px",
                  border: `2px solid ${activeTheme === "brand" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "brand" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "brand" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease"
                }}
              >
                Brand
              </button>
              <button
                onClick={() => handleThemeChange("custom")}
                style={{
                  padding: "8px 16px",
                  border: `2px solid ${activeTheme === "custom" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "custom" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "custom" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease"
                }}
              >
                Custom
              </button>
            </div>
          </div>

          {activeTheme === "custom" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              padding: "20px",
              backgroundColor: currentTheme["--background-secondary"],
              borderRadius: currentTheme["--border-radius"],
              border: `1px solid ${currentTheme["--border-color"]}`
            }}>
              {Object.entries(customVars).map(([key, value]) => (
                <div key={key}>
                  <label style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: currentTheme["--text-secondary"],
                    marginBottom: "4px"
                  }}>
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleCustomVarChange(key as keyof ThemeVariables, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      border: `1px solid ${currentTheme["--border-color"]}`,
                      borderRadius: "6px",
                      backgroundColor: currentTheme["--background-primary"],
                      color: currentTheme["--text-primary"],
                      fontSize: "13px",
                      fontFamily: "monospace"
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={currentTheme as React.CSSProperties}>
          <div style={{
            backgroundColor: currentTheme["--background-primary"],
            border: `1px solid ${currentTheme["--border-color"]}`,
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "24px"
          }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: currentTheme["--text-primary"]
            }}>
              Default Configuration
            </h2>
            <ComboboxInput
              id="combobox-default"
              size="md"
              label="Select an option"
              placeholder="Type to search..."
              noResultsMessage="No results found"
              loadingMessage="Loading options..."
              showLabel={true}
              showClearButton={true}
              isLoading={false}
              isDisabled={false}
              option1Label="Option One"
              option1Description="Description for option one"
              option1Value="option-1"
              option1Visible={true}
              option2Label="Option Two"
              option2Description="Description for option two"
              option2Value="option-2"
              option2Visible={true}
              option3Label="Option Three"
              option3Description="Description for option three"
              option3Value="option-3"
              option3Visible={true}
              option4Label="Option Four"
              option4Description="Description for option four"
              option4Value="option-4"
              option4Visible={true}
              option5Label="Option Five"
              option5Description="Description for option five"
              option5Value="option-5"
              option5Visible={true}
            />
          </div>

          <div style={{
            backgroundColor: currentTheme["--background-primary"],
            border: `1px solid ${currentTheme["--border-color"]}`,
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "24px"
          }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: currentTheme["--text-primary"]
            }}>
              Size Variations
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: currentTheme["--text-secondary"]
                }}>
                  Small Size
                </h3>
                <ComboboxInput
                  id="combobox-small"
                  size="sm"
                  label="Small combobox"
                  placeholder="Type to search..."
                  noResultsMessage="No results found"
                  loadingMessage="Loading options..."
                  showLabel={true}
                  showClearButton={true}
                  isLoading={false}
                  isDisabled={false}
                  option1Label="Apple"
                  option1Description="A crisp and sweet fruit"
                  option1Value="apple"
                  option1Visible={true}
                  option2Label="Banana"
                  option2Description="A yellow tropical fruit"
                  option2Value="banana"
                  option2Visible={true}
                  option3Label="Cherry"
                  option3Description="A small red stone fruit"
                  option3Value="cherry"
                  option3Visible={true}
                  option4Label="Date"
                  option4Description="A sweet dried fruit"
                  option4Value="date"
                  option4Visible={true}
                  option5Label="Elderberry"
                  option5Description="A dark purple berry"
                  option5Value="elderberry"
                  option5Visible={true}
                />
              </div>
              <div>
                <h3 style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: currentTheme["--text-secondary"]
                }}>
                  Large Size
                </h3>
                <ComboboxInput
                  id="combobox-large"
                  size="lg"
                  label="Large combobox"
                  placeholder="Type to search..."
                  noResultsMessage="No results found"
                  loadingMessage="Loading options..."
                  showLabel={true}
                  showClearButton={true}
                  isLoading={false}
                  isDisabled={false}
                  option1Label="React"
                  option1Description="A JavaScript library for building user interfaces"
                  option1Value="react"
                  option1Visible={true}
                  option2Label="Vue"
                  option2Description="The progressive JavaScript framework"
                  option2Value="vue"
                  option2Visible={true}
                  option3Label="Angular"
                  option3Description="Platform for building mobile and desktop web applications"
                  option3Value="angular"
                  option3Visible={true}
                  option4Label="Svelte"
                  option4Description="Cybernetically enhanced web apps"
                  option4Value="svelte"
                  option4Visible={true}
                  option5Label="Solid"
                  option5Description="Simple and performant reactivity for building user interfaces"
                  option5Value="solid"
                  option5Visible={true}
                />
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: currentTheme["--background-primary"],
            border: `1px solid ${currentTheme["--border-color"]}`,
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "24px"
          }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: currentTheme["--text-primary"]
            }}>
              State Variations
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: currentTheme["--text-secondary"]
                }}>
                  Loading State
                </h3>
                <ComboboxInput
                  id="combobox-loading"
                  size="md"
                  label="Loading combobox"
                  placeholder="Type to search..."
                  noResultsMessage="No results found"
                  loadingMessage="Loading options..."
                  showLabel={true}
                  showClearButton={true}
                  isLoading={true}
                  isDisabled={false}
                  option1Label="Option One"
                  option1Description="Description for option one"
                  option1Value="option-1"
                  option1Visible={true}
                  option2Label="Option Two"
                  option2Description="Description for option two"
                  option2Value="option-2"
                  option2Visible={true}
                  option3Label="Option Three"
                  option3Description="Description for option three"
                  option3Value="option-3"
                  option3Visible={true}
                  option4Label="Option Four"
                  option4Description="Description for option four"
                  option4Value="option-4"
                  option4Visible={false}
                  option5Label="Option Five"
                  option5Description="Description for option five"
                  option5Value="option-5"
                  option5Visible={false}
                />
              </div>
              <div>
                <h3 style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: currentTheme["--text-secondary"]
                }}>
                  Disabled State
                </h3>
                <ComboboxInput
                  id="combobox-disabled"
                  size="md"
                  label="Disabled combobox"
                  placeholder="Type to search..."
                  noResultsMessage="No results found"
                  loadingMessage="Loading options..."
                  showLabel={true}
                  showClearButton={true}
                  isLoading={false}
                  isDisabled={true}
                  option1Label="Option One"
                  option1Description="Description for option one"
                  option1Value="option-1"
                  option1Visible={true}
                  option2Label="Option Two"
                  option2Description="Description for option two"
                  option2Value="option-2"
                  option2Visible={true}
                  option3Label="Option Three"
                  option3Description="Description for option three"
                  option3Value="option-3"
                  option3Visible={true}
                  option4Label="Option Four"
                  option4Description="Description for option four"
                  option4Value="option-4"
                  option4Visible={true}
                  option5Label="Option Five"
                  option5Description="Description for option five"
                  option5Value="option-5"
                  option5Visible={true}
                />
              </div>
              <div>
                <h3 style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: currentTheme["--text-secondary"]
                }}>
                  Without Label & Clear Button
                </h3>
                <ComboboxInput
                  id="combobox-minimal"
                  size="md"
                  label="Select an option"
                  placeholder="Search countries..."
                  noResultsMessage="No countries found"
                  loadingMessage="Loading options..."
                  showLabel={false}
                  showClearButton={false}
                  isLoading={false}
                  isDisabled={false}
                  option1Label="United States"
                  option1Description="North America"
                  option1Value="us"
                  option1Visible={true}
                  option2Label="United Kingdom"
                  option2Description="Europe"
                  option2Value="uk"
                  option2Visible={true}
                  option3Label="Canada"
                  option3Description="North America"
                  option3Value="ca"
                  option3Visible={true}
                  option4Label="Australia"
                  option4Description="Oceania"
                  option4Value="au"
                  option4Visible={true}
                  option5Label="Germany"
                  option5Description="Europe"
                  option5Value="de"
                  option5Visible={true}
                />
              </div>
            </div>
          </div>
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