import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import ProgressStepper from "./components/ProgressStepper/ProgressStepper";
import "./components/ProgressStepper/ProgressStepper.css";

type ThemeVars = {
  "--background-primary": string;
  "--background-secondary": string;
  "--text-primary": string;
  "--text-secondary": string;
  "--border-color": string;
  "--accent-color": string;
  "--accent-text-color": string;
  "--border-radius": string;
};

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
};

function App() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "brand" | "custom">("light");
  const [customVars, setCustomVars] = useState<ThemeVars>(themes.light);

  const currentVars = activeTheme === "custom" ? customVars : themes[activeTheme];

  const handleThemeChange = (theme: "light" | "dark" | "brand" | "custom") => {
    setActiveTheme(theme);
    if (theme !== "custom") {
      setCustomVars(themes[theme]);
    }
  };

  const handleCustomVarChange = (key: keyof ThemeVars, value: string) => {
    setCustomVars((prev) => ({ ...prev, [key]: value }));
  };

  const pageBackgroundColor = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef2e8" : "#f9fafb";

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: pageBackgroundColor,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      transition: "background-color 0.3s ease"
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "40px 20px" 
      }}>
        <header style={{ 
          marginBottom: "40px",
          padding: "24px",
          backgroundColor: currentVars["--background-primary"],
          borderRadius: currentVars["--border-radius"],
          border: `1px solid ${currentVars["--border-color"]}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
        }}>
          <h1 style={{ 
            margin: "0 0 20px 0", 
            fontSize: "28px", 
            fontWeight: "600",
            color: currentVars["--text-primary"]
          }}>
            ProgressStepper Component Preview
          </h1>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontSize: "14px", 
              fontWeight: "500",
              color: currentVars["--text-primary"]
            }}>
              Theme:
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(["light", "dark", "brand", "custom"] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    border: `2px solid ${activeTheme === theme ? currentVars["--accent-color"] : currentVars["--border-color"]}`,
                    borderRadius: currentVars["--border-radius"],
                    backgroundColor: activeTheme === theme ? currentVars["--accent-color"] : currentVars["--background-secondary"],
                    color: activeTheme === theme ? currentVars["--accent-text-color"] : currentVars["--text-primary"],
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textTransform: "capitalize"
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {activeTheme === "custom" && (
            <div style={{ 
              marginTop: "20px",
              padding: "20px",
              backgroundColor: currentVars["--background-secondary"],
              borderRadius: currentVars["--border-radius"],
              border: `1px solid ${currentVars["--border-color"]}`
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
                      marginBottom: "4px", 
                      fontSize: "12px", 
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
                        padding: "6px 10px",
                        fontSize: "13px",
                        border: `1px solid ${currentVars["--border-color"]}`,
                        borderRadius: "6px",
                        backgroundColor: currentVars["--background-primary"],
                        color: currentVars["--text-primary"],
                        fontFamily: "monospace"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        <div style={currentVars as React.CSSProperties}>
          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              fontSize: "20px", 
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Default Configuration
            </h2>
            <div style={{ 
              padding: "32px",
              backgroundColor: currentVars["--background-primary"],
              borderRadius: currentVars["--border-radius"],
              border: `1px solid ${currentVars["--border-color"]}`,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
            }}>
              <ProgressStepper
                id="default-stepper"
                orientation="horizontal"
                clickable={false}
                currentStep={2}
                totalSteps={4}
                step1Label="Account Setup"
                step1Description="Create your account"
                step1Visible={true}
                step2Label="Personal Info"
                step2Description="Enter your details"
                step2Visible={true}
                step3Label="Payment"
                step3Description="Add payment method"
                step3Visible={true}
                step4Label="Confirmation"
                step4Description="Review and confirm"
                step4Visible={true}
                step5Label="Preferences"
                step5Description="Set your preferences"
                step5Visible={true}
                step6Label="Verification"
                step6Description="Verify your identity"
                step6Visible={true}
                step7Label="Integration"
                step7Description="Connect your tools"
                step7Visible={true}
                step8Label="Complete"
                step8Description="Finish setup"
                step8Visible={true}
                showDescriptions={true}
              />
            </div>
          </section>

          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ 
              margin: "0 0 24px 0", 
              fontSize: "20px", 
              fontWeight: "600",
              color: currentVars["--text-primary"]
            }}>
              Variations
            </h2>

            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ 
                margin: "0 0 16px 0", 
                fontSize: "16px", 
                fontWeight: "500",
                color: currentVars["--text-secondary"]
              }}>
                Vertical Orientation with Clickable Steps
              </h3>
              <div style={{ 
                padding: "32px",
                backgroundColor: currentVars["--background-primary"],
                borderRadius: currentVars["--border-radius"],
                border: `1px solid ${currentVars["--border-color"]}`,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <ProgressStepper
                  id="vertical-stepper"
                  orientation="vertical"
                  clickable={true}
                  currentStep={3}
                  totalSteps={5}
                  step1Label="Getting Started"
                  step1Description="Welcome to the platform"
                  step1Visible={true}
                  step2Label="Profile Setup"
                  step2Description="Complete your profile"
                  step2Visible={true}
                  step3Label="Team Invitation"
                  step3Description="Invite your team members"
                  step3Visible={true}
                  step4Label="Project Creation"
                  step4Description="Create your first project"
                  step4Visible={true}
                  step5Label="Launch"
                  step5Description="You're all set!"
                  step5Visible={true}
                  step6Label="Verification"
                  step6Description="Verify your identity"
                  step6Visible={true}
                  step7Label="Integration"
                  step7Description="Connect your tools"
                  step7Visible={true}
                  step8Label="Complete"
                  step8Description="Finish setup"
                  step8Visible={true}
                  showDescriptions={true}
                />
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ 
                margin: "0 0 16px 0", 
                fontSize: "16px", 
                fontWeight: "500",
                color: currentVars["--text-secondary"]
              }}>
                Minimal Style (No Descriptions)
              </h3>
              <div style={{ 
                padding: "32px",
                backgroundColor: currentVars["--background-primary"],
                borderRadius: currentVars["--border-radius"],
                border: `1px solid ${currentVars["--border-color"]}`,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <ProgressStepper
                  id="minimal-stepper"
                  orientation="horizontal"
                  clickable={false}
                  currentStep={4}
                  totalSteps={6}
                  step1Label="Start"
                  step1Description=""
                  step1Visible={true}
                  step2Label="Configure"
                  step2Description=""
                  step2Visible={true}
                  step3Label="Review"
                  step3Description=""
                  step3Visible={true}
                  step4Label="Deploy"
                  step4Description=""
                  step4Visible={true}
                  step5Label="Test"
                  step5Description=""
                  step5Visible={true}
                  step6Label="Complete"
                  step6Description=""
                  step6Visible={true}
                  step7Label="Integration"
                  step7Description="Connect your tools"
                  step7Visible={true}
                  step8Label="Complete"
                  step8Description="Finish setup"
                  step8Visible={true}
                  showDescriptions={false}
                />
              </div>
            </div>

            <div>
              <h3 style={{ 
                margin: "0 0 16px 0", 
                fontSize: "16px", 
                fontWeight: "500",
                color: currentVars["--text-secondary"]
              }}>
                Extended Process (8 Steps)
              </h3>
              <div style={{ 
                padding: "32px",
                backgroundColor: currentVars["--background-primary"],
                borderRadius: currentVars["--border-radius"],
                border: `1px solid ${currentVars["--border-color"]}`,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <ProgressStepper
                  id="extended-stepper"
                  orientation="horizontal"
                  clickable={true}
                  currentStep={5}
                  totalSteps={8}
                  step1Label="Registration"
                  step1Description="Sign up for an account"
                  step1Visible={true}
                  step2Label="Email Verify"
                  step2Description="Confirm your email"
                  step2Visible={true}
                  step3Label="Profile"
                  step3Description="Set up your profile"
                  step3Visible={true}
                  step4Label="Preferences"
                  step4Description="Choose your settings"
                  step4Visible={true}
                  step5Label="Payment"
                  step5Description="Add billing info"
                  step5Visible={true}
                  step6Label="Integration"
                  step6Description="Connect services"
                  step6Visible={true}
                  step7Label="Review"
                  step7Description="Check everything"
                  step7Visible={true}
                  step8Label="Launch"
                  step8Description="Start using the app"
                  step8Visible={true}
                  showDescriptions={true}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);