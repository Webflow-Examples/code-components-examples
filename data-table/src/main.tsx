import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import DataTable from "./components/DataTable/DataTable"
import "./components/DataTable/DataTable.css"

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
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      padding: "40px 20px",
      transition: "background 0.3s ease"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
            DataTable Component Preview
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
                    border: `2px solid ${activeTheme === theme ? currentVars["--accent-color"] : currentVars["--border-color"]}`,
                    borderRadius: "6px",
                    background: activeTheme === theme ? currentVars["--accent-color"] : currentVars["--background-primary"],
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
              marginTop: "20px",
              padding: "20px",
              background: currentVars["--background-secondary"],
              borderRadius: "6px",
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                {Object.entries(customVars).map(([key, value]) => (
                  <div key={key}>
                    <label style={{ 
                      display: "block", 
                      marginBottom: "6px", 
                      fontSize: "12px", 
                      fontWeight: "500",
                      color: currentVars["--text-secondary"]
                    }}>
                      {key}
                    </label>
                    <input
                      type={key === "--border-radius" ? "text" : "color"}
                      value={value}
                      onChange={(e) => handleCustomVarChange(key as keyof ThemeVars, e.target.value)}
                      style={{
                        width: "100%",
                        padding: key === "--border-radius" ? "6px 8px" : "4px",
                        border: `1px solid ${currentVars["--border-color"]}`,
                        borderRadius: "4px",
                        fontSize: "13px",
                        background: currentVars["--background-primary"],
                        color: currentVars["--text-primary"],
                        height: key === "--border-radius" ? "auto" : "36px"
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
              fontSize: "20px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: currentVars["--text-primary"]
            }}>
              Default Configuration
            </h2>
            <DataTable
              heading="Team Members"
              dataJson='[{"name":"Alice Johnson","email":"alice@example.com","role":"Designer","status":"Active"},{"name":"Bob Smith","email":"bob@example.com","role":"Developer","status":"Active"},{"name":"Carol White","email":"carol@example.com","role":"Manager","status":"Inactive"},{"name":"David Brown","email":"david@example.com","role":"Developer","status":"Active"},{"name":"Emma Davis","email":"emma@example.com","role":"Designer","status":"Active"}]'
              density="comfortable"
              showStripedRows={true}
              showHoverHighlight={true}
              searchPlaceholder="Search across all columns..."
              showSearch={true}
              showRowCount={true}
              rowCountText="Showing {filtered} of {total} rows"
              emptyStateHeading="No results found"
              emptyStateMessage="Try adjusting your search to find what you're looking for."
              enableSorting={true}
              defaultSortColumn=""
              defaultSortDirection="ascending"
              column1Key="name"
              column1Label="Name"
              column1Visible={true}
              column2Key="email"
              column2Label="Email"
              column2Visible={true}
              column3Key="role"
              column3Label="Role"
              column3Visible={true}
              column4Key="status"
              column4Label="Status"
              column4Visible={true}
              column5Key=""
              column5Label="Column 5"
              column5Visible={false}
              column6Key=""
              column6Label="Column 6"
              column6Visible={false}
              column7Key=""
              column7Label="Column 7"
              column7Visible={false}
              column8Key=""
              column8Label="Column 8"
              column8Visible={false}
              column9Key=""
              column9Label="Column 9"
              column9Visible={false}
              column10Key=""
              column10Label="Column 10"
              column10Visible={false}
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: currentVars["--text-primary"]
            }}>
              Compact Density with Pre-sorted Data
            </h2>
            <DataTable
              heading="Product Inventory"
              dataJson='[{"product":"Laptop","sku":"LAP-001","quantity":"45","price":"$1299"},{"product":"Mouse","sku":"MOU-002","quantity":"120","price":"$29"},{"product":"Keyboard","sku":"KEY-003","quantity":"67","price":"$89"},{"product":"Monitor","sku":"MON-004","quantity":"23","price":"$449"},{"product":"Webcam","sku":"WEB-005","quantity":"89","price":"$79"}]'
              density="compact"
              showStripedRows={false}
              showHoverHighlight={true}
              searchPlaceholder="Search products..."
              showSearch={true}
              showRowCount={true}
              rowCountText="{filtered} items"
              emptyStateHeading="No products found"
              emptyStateMessage="No products match your search criteria."
              enableSorting={true}
              defaultSortColumn="product"
              defaultSortDirection="ascending"
              column1Key="product"
              column1Label="Product"
              column1Visible={true}
              column2Key="sku"
              column2Label="SKU"
              column2Visible={true}
              column3Key="quantity"
              column3Label="Quantity"
              column3Visible={true}
              column4Key="price"
              column4Label="Price"
              column4Visible={true}
              column5Key=""
              column5Label="Column 5"
              column5Visible={false}
              column6Key=""
              column6Label="Column 6"
              column6Visible={false}
              column7Key=""
              column7Label="Column 7"
              column7Visible={false}
              column8Key=""
              column8Label="Column 8"
              column8Visible={false}
              column9Key=""
              column9Label="Column 9"
              column9Visible={false}
              column10Key=""
              column10Label="Column 10"
              column10Visible={false}
            />
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ 
              fontSize: "20px", 
              fontWeight: "600", 
              marginBottom: "16px",
              color: currentVars["--text-primary"]
            }}>
              Extended Columns with Hidden Search
            </h2>
            <DataTable
              heading="Sales Report"
              dataJson='[{"region":"North","q1":"$45K","q2":"$52K","q3":"$48K","q4":"$61K","total":"$206K"},{"region":"South","q1":"$38K","q2":"$41K","q3":"$44K","q4":"$47K","total":"$170K"},{"region":"East","q1":"$51K","q2":"$49K","q3":"$53K","q4":"$58K","total":"$211K"},{"region":"West","q1":"$42K","q2":"$46K","q3":"$50K","q4":"$54K","total":"$192K"}]'
              density="comfortable"
              showStripedRows={true}
              showHoverHighlight={true}
              searchPlaceholder="Search..."
              showSearch={false}
              showRowCount={true}
              rowCountText="Total: {total} regions"
              emptyStateHeading="No data"
              emptyStateMessage="No sales data available."
              enableSorting={true}
              defaultSortColumn="total"
              defaultSortDirection="descending"
              column1Key="region"
              column1Label="Region"
              column1Visible={true}
              column2Key="q1"
              column2Label="Q1"
              column2Visible={true}
              column3Key="q2"
              column3Label="Q2"
              column3Visible={true}
              column4Key="q3"
              column4Label="Q3"
              column4Visible={true}
              column5Key="q4"
              column5Label="Q4"
              column5Visible={true}
              column6Key="total"
              column6Label="Total"
              column6Visible={true}
              column7Key=""
              column7Label="Column 7"
              column7Visible={false}
              column8Key=""
              column8Label="Column 8"
              column8Visible={false}
              column9Key=""
              column9Label="Column 9"
              column9Visible={false}
              column10Key=""
              column10Label="Column 10"
              column10Visible={false}
            />
          </section>
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