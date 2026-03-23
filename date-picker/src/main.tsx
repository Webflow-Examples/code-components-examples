import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import DatePicker from "./components/DatePicker/DatePicker"
import "./components/DatePicker/DatePicker.css"

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

  const pageBackground = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef2e8" : "#f9fafb"

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
          marginBottom: "32px",
          transition: "all 0.3s ease"
        }}>
          <h2 style={{ 
            margin: "0 0 16px 0", 
            fontSize: "18px", 
            fontWeight: "600",
            color: currentVars["--text-primary"]
          }}>
            Theme Preview
          </h2>
          
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {(["light", "dark", "brand", "custom"] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                style={{
                  padding: "8px 16px",
                  border: `2px solid ${activeTheme === theme ? currentVars["--accent-color"] : currentVars["--border-color"]}`,
                  borderRadius: currentVars["--border-radius"],
                  background: activeTheme === theme ? currentVars["--accent-color"] : "transparent",
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

          {activeTheme === "custom" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              padding: "16px",
              background: currentVars["--background-secondary"],
              borderRadius: currentVars["--border-radius"],
              border: `1px solid ${currentVars["--border-color"]}`
            }}>
              {(Object.keys(customVars) as Array<keyof ThemeVars>).map((key) => (
                <div key={key}>
                  <label style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "500",
                    marginBottom: "4px",
                    color: currentVars["--text-secondary"]
                  }}>
                    {key}
                  </label>
                  <input
                    type={key === "--border-radius" ? "text" : "color"}
                    value={customVars[key]}
                    onChange={(e) => handleCustomVarChange(key, e.target.value)}
                    style={{
                      width: "100%",
                      height: key === "--border-radius" ? "32px" : "40px",
                      border: `1px solid ${currentVars["--border-color"]}`,
                      borderRadius: "4px",
                      padding: key === "--border-radius" ? "0 8px" : "0",
                      cursor: "pointer"
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ 
          background: currentVars["--background-primary"],
          border: `1px solid ${currentVars["--border-color"]}`,
          borderRadius: currentVars["--border-radius"],
          padding: "32px",
          transition: "all 0.3s ease"
        }}>
          <h1 style={{ 
            margin: "0 0 32px 0", 
            fontSize: "32px", 
            fontWeight: "700",
            color: currentVars["--text-primary"]
          }}>
            DatePicker Component Preview
          </h1>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              fontSize: "20px", 
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Default Configuration
            </h2>
            <DatePicker
              id="default-datepicker"
              mode="single"
              dateFormat="MM/DD/YYYY"
              size="md"
              label="Select Date"
              placeholder="Choose a date"
              startPlaceholder="Start date"
              endPlaceholder="End date"
              clearButtonText="Clear date"
              todayButtonText="Today"
              previousMonthLabel="Previous month"
              nextMonthLabel="Next month"
              showLabel={true}
              showClearButton={true}
              showTodayButton={true}
              showWeekNumbers={false}
              highlightToday={true}
              isDisabled={false}
              isRequired={false}
              closeOnSelect={true}
              minDate=""
              maxDate=""
              defaultDate=""
              defaultStartDate=""
              defaultEndDate=""
              disabledDaysOfWeek=""
              firstDayOfWeek="sunday"
              monthYearFormat="MMMM YYYY"
              helperText=""
              errorText=""
              showHelperText={false}
              showErrorText={false}
              name="date"
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              fontSize: "20px", 
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Date Range Mode
            </h2>
            <DatePicker
              id="range-datepicker"
              mode="range"
              dateFormat="MM/DD/YYYY"
              size="md"
              label="Select Date Range"
              placeholder="Choose dates"
              startPlaceholder="Start date"
              endPlaceholder="End date"
              clearButtonText="Clear dates"
              todayButtonText="Today"
              previousMonthLabel="Previous month"
              nextMonthLabel="Next month"
              showLabel={true}
              showClearButton={true}
              showTodayButton={true}
              showWeekNumbers={false}
              highlightToday={true}
              isDisabled={false}
              isRequired={false}
              closeOnSelect={false}
              minDate=""
              maxDate=""
              defaultDate=""
              defaultStartDate=""
              defaultEndDate=""
              disabledDaysOfWeek=""
              firstDayOfWeek="sunday"
              monthYearFormat="MMMM YYYY"
              helperText="Select a start and end date for your booking"
              errorText=""
              showHelperText={true}
              showErrorText={false}
              name="dateRange"
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              fontSize: "20px", 
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              With Date Constraints
            </h2>
            <DatePicker
              id="constrained-datepicker"
              mode="single"
              dateFormat="YYYY-MM-DD"
              size="lg"
              label="Appointment Date"
              placeholder="Select appointment date"
              startPlaceholder="Start date"
              endPlaceholder="End date"
              clearButtonText="Clear date"
              todayButtonText="Today"
              previousMonthLabel="Previous month"
              nextMonthLabel="Next month"
              showLabel={true}
              showClearButton={true}
              showTodayButton={true}
              showWeekNumbers={true}
              highlightToday={true}
              isDisabled={false}
              isRequired={true}
              closeOnSelect={true}
              minDate={new Date().toISOString().split('T')[0]}
              maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              defaultDate=""
              defaultStartDate=""
              defaultEndDate=""
              disabledDaysOfWeek="0,6"
              firstDayOfWeek="monday"
              monthYearFormat="MMM YYYY"
              helperText="Available weekdays only, up to 90 days in advance"
              errorText=""
              showHelperText={true}
              showErrorText={false}
              name="appointmentDate"
            />
          </section>

          <section>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              fontSize: "20px", 
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Compact Size with Error State
            </h2>
            <DatePicker
              id="error-datepicker"
              mode="single"
              dateFormat="DD/MM/YYYY"
              size="sm"
              label="Birth Date"
              placeholder="DD/MM/YYYY"
              startPlaceholder="Start date"
              endPlaceholder="End date"
              clearButtonText="Clear date"
              todayButtonText="Today"
              previousMonthLabel="Previous month"
              nextMonthLabel="Next month"
              showLabel={true}
              showClearButton={true}
              showTodayButton={false}
              showWeekNumbers={false}
              highlightToday={true}
              isDisabled={false}
              isRequired={true}
              closeOnSelect={true}
              minDate=""
              maxDate={new Date().toISOString().split('T')[0]}
              defaultDate=""
              defaultStartDate=""
              defaultEndDate=""
              disabledDaysOfWeek=""
              firstDayOfWeek="sunday"
              monthYearFormat="MMMM YYYY"
              helperText=""
              errorText="Please enter a valid birth date"
              showHelperText={false}
              showErrorText={true}
              name="birthDate"
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