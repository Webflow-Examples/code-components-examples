import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import MultiStepForm from "./components/MultiStepForm/MultiStepForm"
import "./components/MultiStepForm/MultiStepForm.css"

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

const lightTheme: ThemeVars = {
  "--background-primary": "#ffffff",
  "--background-secondary": "#f5f5f5",
  "--text-primary": "#1a1a1a",
  "--text-secondary": "#737373",
  "--border-color": "#e5e5e5",
  "--accent-color": "#2563eb",
  "--accent-text-color": "#ffffff",
  "--border-radius": "8px"
}

const darkTheme: ThemeVars = {
  "--background-primary": "#0a0a0a",
  "--background-secondary": "#1a1a1a",
  "--text-primary": "#fafafa",
  "--text-secondary": "#a3a3a3",
  "--border-color": "#2a2a2a",
  "--accent-color": "#3b82f6",
  "--accent-text-color": "#ffffff",
  "--border-radius": "8px"
}

const brandTheme: ThemeVars = {
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
  const [customVars, setCustomVars] = useState<ThemeVars>(lightTheme)

  const getCurrentTheme = (): ThemeVars => {
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
      const newTheme = theme === "light" ? lightTheme : theme === "dark" ? darkTheme : brandTheme
      setCustomVars(newTheme)
    }
  }

  const handleCustomVarChange = (key: keyof ThemeVars, value: string) => {
    setCustomVars(prev => ({ ...prev, [key]: value }))
  }

  const currentTheme = getCurrentTheme()
  const pageBackground = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef3e8" : "#fafafa"

  return (
    <div style={{
      minHeight: "100vh",
      background: pageBackground,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      padding: "40px 20px",
      transition: "background 0.3s ease"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          background: currentTheme["--background-primary"],
          border: `1px solid ${currentTheme["--border-color"]}`,
          borderRadius: currentTheme["--border-radius"],
          padding: "24px",
          marginBottom: "32px"
        }}>
          <h1 style={{
            margin: "0 0 16px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: currentTheme["--text-primary"]
          }}>
            MultiStepForm Component Preview
          </h1>
          
          <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => handleThemeChange("light")}
              style={{
                padding: "8px 16px",
                border: `2px solid ${activeTheme === "light" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                borderRadius: "6px",
                background: activeTheme === "light" ? currentTheme["--accent-color"] : "transparent",
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
                borderRadius: "6px",
                background: activeTheme === "dark" ? currentTheme["--accent-color"] : "transparent",
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
                borderRadius: "6px",
                background: activeTheme === "brand" ? currentTheme["--accent-color"] : "transparent",
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
                borderRadius: "6px",
                background: activeTheme === "custom" ? currentTheme["--accent-color"] : "transparent",
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

          {activeTheme === "custom" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              padding: "16px",
              background: currentTheme["--background-secondary"],
              borderRadius: "6px",
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
                    onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      border: `1px solid ${currentTheme["--border-color"]}`,
                      borderRadius: "4px",
                      background: currentTheme["--background-primary"],
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
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: currentTheme["--text-primary"],
              marginBottom: "16px"
            }}>
              Default Configuration
            </h2>
            <MultiStepForm
              id="default-form"
              progressStyle="stepper"
              transitionDirection="slide"
              numberOfSteps={3}
              showReviewStep={true}
              formTitle="Complete Your Application"
              formDescription="Please fill out all required fields to continue"
              step1Title="Personal Information"
              step1Description="Tell us about yourself"
              step2Title="Contact Details"
              step2Description="How can we reach you?"
              step3Title="Preferences"
              step3Description="Customize your experience"
              reviewStepTitle="Review Your Information"
              reviewStepDescription="Please review your information before submitting"
              backButtonText="Back"
              nextButtonText="Next"
              submitButtonText="Submit"
              validationErrorMessage="Please fill out all required fields before continuing"
              successMessage="Thank you! Your form has been submitted successfully."
              showStepNumbers={true}
              showStepDescriptions={true}
              allowStepSkipping={false}
              editButtonText="Edit"
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: currentTheme["--text-primary"],
              marginBottom: "16px"
            }}>
              Bar Progress Style with Fade Transition
            </h2>
            <MultiStepForm
              id="bar-progress-form"
              progressStyle="bar"
              transitionDirection="fade"
              numberOfSteps={4}
              showReviewStep={true}
              formTitle="Registration Form"
              formDescription="Join our community in a few simple steps"
              step1Title="Account Setup"
              step1Description="Create your account credentials"
              step2Title="Profile Details"
              step2Description="Tell us more about yourself"
              step3Title="Preferences"
              step3Description="Customize your experience"
              step4Title="Verification"
              step4Description="Verify your information"
              reviewStepTitle="Final Review"
              reviewStepDescription="Check everything before submitting"
              backButtonText="Previous"
              nextButtonText="Continue"
              submitButtonText="Complete Registration"
              validationErrorMessage="Please complete all required fields"
              successMessage="Registration successful! Welcome aboard."
              showStepNumbers={false}
              showStepDescriptions={true}
              allowStepSkipping={false}
              editButtonText="Modify"
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: currentTheme["--text-primary"],
              marginBottom: "16px"
            }}>
              Dots Progress with Step Skipping Enabled
            </h2>
            <MultiStepForm
              id="dots-progress-form"
              progressStyle="dots"
              transitionDirection="slide"
              numberOfSteps={5}
              showReviewStep={false}
              formTitle="Quick Survey"
              formDescription="Help us improve by answering a few questions"
              step1Title="Demographics"
              step1Description="Basic information"
              step2Title="Usage Patterns"
              step2Description="How you use our service"
              step3Title="Satisfaction"
              step3Description="Rate your experience"
              step4Title="Features"
              step4Description="What features matter most"
              step5Title="Feedback"
              step5Description="Additional comments"
              backButtonText="← Back"
              nextButtonText="Next →"
              submitButtonText="Submit Survey"
              validationErrorMessage="Please answer all required questions"
              successMessage="Thank you for your feedback!"
              showStepNumbers={true}
              showStepDescriptions={false}
              allowStepSkipping={true}
              editButtonText="Change"
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