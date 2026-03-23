import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import CmsFilterSearch from "./components/CmsFilterSearch/CmsFilterSearch"
import "./components/CmsFilterSearch/CmsFilterSearch.css"

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
  "--border-radius": "8px",
}

const darkTheme: ThemeVars = {
  "--background-primary": "#0a0a0a",
  "--background-secondary": "#1a1a1a",
  "--text-primary": "#fafafa",
  "--text-secondary": "#a3a3a3",
  "--border-color": "#2a2a2a",
  "--accent-color": "#3b82f6",
  "--accent-text-color": "#ffffff",
  "--border-radius": "8px",
}

const brandTheme: ThemeVars = {
  "--background-primary": "#fef7f0",
  "--background-secondary": "#fde8d0",
  "--text-primary": "#1c1917",
  "--text-secondary": "#78716c",
  "--border-color": "#e7e5e4",
  "--accent-color": "#ea580c",
  "--accent-text-color": "#ffffff",
  "--border-radius": "12px",
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
    setCustomVars((prev) => ({ ...prev, [key]: value }))
  }

  const currentTheme = getCurrentTheme()
  const pageBackground = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef3e8" : "#f9fafb"

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: pageBackground,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      transition: "background-color 0.3s ease"
    }}>
      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto", 
        padding: "40px 20px" 
      }}>
        <header style={{ 
          marginBottom: "40px",
          backgroundColor: currentTheme["--background-primary"],
          padding: "24px",
          borderRadius: currentTheme["--border-radius"],
          border: `1px solid ${currentTheme["--border-color"]}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ 
            margin: "0 0 20px 0", 
            fontSize: "28px", 
            fontWeight: "700",
            color: currentTheme["--text-primary"]
          }}>
            CmsFilterSearch Component Preview
          </h1>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "12px", 
              fontSize: "14px", 
              fontWeight: "600",
              color: currentTheme["--text-primary"]
            }}>
              Theme:
            </label>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {(["light", "dark", "brand", "custom"] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  style={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: `2px solid ${activeTheme === theme ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                    borderRadius: currentTheme["--border-radius"],
                    backgroundColor: activeTheme === theme ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                    color: activeTheme === theme ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
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
              marginTop: "24px",
              padding: "20px",
              backgroundColor: currentTheme["--background-secondary"],
              borderRadius: currentTheme["--border-radius"],
              border: `1px solid ${currentTheme["--border-color"]}`
            }}>
              <h3 style={{ 
                margin: "0 0 16px 0", 
                fontSize: "16px", 
                fontWeight: "600",
                color: currentTheme["--text-primary"]
              }}>
                Custom Theme Editor
              </h3>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                gap: "16px" 
              }}>
                {(Object.keys(customVars) as Array<keyof ThemeVars>).map((key) => (
                  <div key={key}>
                    <label style={{ 
                      display: "block", 
                      marginBottom: "6px", 
                      fontSize: "13px", 
                      fontWeight: "500",
                      color: currentTheme["--text-secondary"]
                    }}>
                      {key}
                    </label>
                    <input
                      type={key === "--border-radius" ? "text" : "color"}
                      value={customVars[key]}
                      onChange={(e) => handleCustomVarChange(key, e.target.value)}
                      style={{
                        width: "100%",
                        padding: key === "--border-radius" ? "8px 12px" : "4px",
                        border: `1px solid ${currentTheme["--border-color"]}`,
                        borderRadius: "6px",
                        fontSize: "14px",
                        backgroundColor: currentTheme["--background-primary"],
                        color: currentTheme["--text-primary"],
                        cursor: "pointer"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        <div style={currentTheme as React.CSSProperties}>
          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ 
              fontSize: "22px", 
              fontWeight: "700", 
              marginBottom: "24px",
              color: currentTheme["--text-primary"]
            }}>
              Default Configuration
            </h2>
            <CmsFilterSearch
              id="cms-filter-default"
              viewMode="grid"
              gridColumns="3"
              heading="Browse Our Collection"
              searchPlaceholder="Search by title or description..."
              categoryFilterLabel="Filter by category:"
              allCategoriesText="All"
              itemCountText="Showing {count} items"
              emptyStateHeading="No items found"
              emptyStateMessage="Try adjusting your search or filters to find what you're looking for."
              clearFiltersText="Clear all filters"
              showViewToggle={true}
              showItemCount={true}
              showCategoryFilters={true}
              enableAnimations={true}
              item1Visible={true}
              item1Image="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop"
              item1Title="Product Design Workshop"
              item1Description="Learn the fundamentals of product design with hands-on exercises and real-world examples."
              item1Category="Design"
              item1Link={{ href: "#", target: "_self" }}
              item2Visible={true}
              item2Image="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
              item2Title="Advanced JavaScript Patterns"
              item2Description="Master advanced JavaScript concepts including closures, prototypes, and async programming."
              item2Category="Development"
              item2Link={{ href: "#", target: "_self" }}
              item3Visible={true}
              item3Image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
              item3Title="Content Marketing Strategy"
              item3Description="Build a comprehensive content marketing strategy that drives engagement and conversions."
              item3Category="Marketing"
              item3Link={{ href: "#", target: "_self" }}
              item4Visible={true}
              item4Image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              item4Title="Data Analytics Fundamentals"
              item4Description="Understand how to collect, analyze, and visualize data to make informed business decisions."
              item4Category="Analytics"
              item4Link={{ href: "#", target: "_self" }}
              item5Visible={true}
              item5Image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
              item5Title="Brand Identity Design"
              item5Description="Create cohesive brand identities that resonate with your target audience and stand out."
              item5Category="Design"
              item5Link={{ href: "#", target: "_self" }}
              item6Visible={true}
              item6Image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
              item6Title="React Performance Optimization"
              item6Description="Learn techniques to optimize React applications for maximum performance and user experience."
              item6Category="Development"
              item6Link={{ href: "#", target: "_self" }}
            />
          </section>

          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ 
              fontSize: "22px", 
              fontWeight: "700", 
              marginBottom: "24px",
              color: currentTheme["--text-primary"]
            }}>
              List View with 4 Items
            </h2>
            <CmsFilterSearch
              id="cms-filter-list-view"
              viewMode="list"
              gridColumns="3"
              heading="Course Catalog"
              searchPlaceholder="Search courses..."
              categoryFilterLabel="Category:"
              allCategoriesText="All Courses"
              itemCountText="{count} courses available"
              emptyStateHeading="No courses match your search"
              emptyStateMessage="Please try different keywords or browse all categories."
              clearFiltersText="Reset filters"
              showViewToggle={true}
              showItemCount={true}
              showCategoryFilters={true}
              enableAnimations={true}
              item1Visible={true}
              item1Image="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop"
              item1Title="Product Design Workshop"
              item1Description="Learn the fundamentals of product design with hands-on exercises and real-world examples."
              item1Category="Design"
              item1Link={{ href: "#", target: "_self" }}
              item2Visible={true}
              item2Image="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
              item2Title="Advanced JavaScript Patterns"
              item2Description="Master advanced JavaScript concepts including closures, prototypes, and async programming."
              item2Category="Development"
              item2Link={{ href: "#", target: "_self" }}
              item3Visible={true}
              item3Image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
              item3Title="Content Marketing Strategy"
              item3Description="Build a comprehensive content marketing strategy that drives engagement and conversions."
              item3Category="Marketing"
              item3Link={{ href: "#", target: "_self" }}
              item4Visible={true}
              item4Image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              item4Title="Data Analytics Fundamentals"
              item4Description="Understand how to collect, analyze, and visualize data to make informed business decisions."
              item4Category="Analytics"
              item4Link={{ href: "#", target: "_self" }}
              item5Visible={false}
              item6Visible={false}
            />
          </section>

          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ 
              fontSize: "22px", 
              fontWeight: "700", 
              marginBottom: "24px",
              color: currentTheme["--text-primary"]
            }}>
              Minimal Configuration (No Toggles, 2 Columns)
            </h2>
            <CmsFilterSearch
              id="cms-filter-minimal"
              viewMode="grid"
              gridColumns="2"
              heading="Featured Resources"
              searchPlaceholder="Search resources..."
              categoryFilterLabel="Browse by topic:"
              allCategoriesText="All Topics"
              itemCountText="{count} resources"
              emptyStateHeading="Nothing here yet"
              emptyStateMessage="Check back soon for new resources."
              clearFiltersText="Clear"
              showViewToggle={false}
              showItemCount={false}
              showCategoryFilters={true}
              enableAnimations={false}
              item1Visible={true}
              item1Image="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop"
              item1Title="Product Design Workshop"
              item1Description="Learn the fundamentals of product design with hands-on exercises and real-world examples."
              item1Category="Design"
              item1Link={{ href: "#", target: "_self" }}
              item2Visible={true}
              item2Image="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop"
              item2Title="Advanced JavaScript Patterns"
              item2Description="Master advanced JavaScript concepts including closures, prototypes, and async programming."
              item2Category="Development"
              item2Link={{ href: "#", target: "_self" }}
              item3Visible={true}
              item3Image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
              item3Title="Content Marketing Strategy"
              item3Description="Build a comprehensive content marketing strategy that drives engagement and conversions."
              item3Category="Marketing"
              item3Link={{ href: "#", target: "_self" }}
              item4Visible={true}
              item4Image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              item4Title="Data Analytics Fundamentals"
              item4Description="Understand how to collect, analyze, and visualize data to make informed business decisions."
              item4Category="Analytics"
              item4Link={{ href: "#", target: "_self" }}
              item5Visible={false}
              item6Visible={false}
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