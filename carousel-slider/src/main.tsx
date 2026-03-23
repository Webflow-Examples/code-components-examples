import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import CarouselSlider from "./components/CarouselSlider/CarouselSlider";
import "./components/CarouselSlider/CarouselSlider.css";

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

const lightTheme: ThemeVars = {
  "--background-primary": "#ffffff",
  "--background-secondary": "#f5f5f5",
  "--text-primary": "#1a1a1a",
  "--text-secondary": "#737373",
  "--border-color": "#e5e5e5",
  "--accent-color": "#2563eb",
  "--accent-text-color": "#ffffff",
  "--border-radius": "8px",
};

const darkTheme: ThemeVars = {
  "--background-primary": "#0a0a0a",
  "--background-secondary": "#1a1a1a",
  "--text-primary": "#fafafa",
  "--text-secondary": "#a3a3a3",
  "--border-color": "#2a2a2a",
  "--accent-color": "#3b82f6",
  "--accent-text-color": "#ffffff",
  "--border-radius": "8px",
};

const brandTheme: ThemeVars = {
  "--background-primary": "#fef7f0",
  "--background-secondary": "#fde8d0",
  "--text-primary": "#1c1917",
  "--text-secondary": "#78716c",
  "--border-color": "#e7e5e4",
  "--accent-color": "#ea580c",
  "--accent-text-color": "#ffffff",
  "--border-radius": "12px",
};

function App() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "brand" | "custom">("light");
  const [customVars, setCustomVars] = useState<ThemeVars>(lightTheme);

  const getCurrentTheme = (): ThemeVars => {
    switch (activeTheme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
      case "brand":
        return brandTheme;
      case "custom":
        return customVars;
      default:
        return lightTheme;
    }
  };

  const handleThemeChange = (theme: "light" | "dark" | "brand" | "custom") => {
    setActiveTheme(theme);
    if (theme !== "custom") {
      const themeMap = { light: lightTheme, dark: darkTheme, brand: brandTheme };
      setCustomVars(themeMap[theme]);
    }
  };

  const handleCustomVarChange = (key: keyof ThemeVars, value: string) => {
    setCustomVars((prev) => ({ ...prev, [key]: value }));
  };

  const currentTheme = getCurrentTheme();
  const pageBackground = activeTheme === "dark" ? "#000000" : activeTheme === "brand" ? "#fef7f0" : "#f9fafb";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: pageBackground, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ position: "sticky", top: 0, backgroundColor: currentTheme["--background-primary"], borderBottom: `1px solid ${currentTheme["--border-color"]}`, padding: "20px", zIndex: 1000 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ margin: "0 0 20px 0", fontSize: "24px", fontWeight: "600", color: currentTheme["--text-primary"] }}>
            CarouselSlider Component Preview
          </h1>
          
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button
                onClick={() => handleThemeChange("light")}
                style={{
                  padding: "10px 20px",
                  border: `2px solid ${activeTheme === "light" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "light" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "light" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                style={{
                  padding: "10px 20px",
                  border: `2px solid ${activeTheme === "dark" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "dark" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "dark" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange("brand")}
                style={{
                  padding: "10px 20px",
                  border: `2px solid ${activeTheme === "brand" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "brand" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "brand" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Brand
              </button>
              <button
                onClick={() => handleThemeChange("custom")}
                style={{
                  padding: "10px 20px",
                  border: `2px solid ${activeTheme === "custom" ? currentTheme["--accent-color"] : currentTheme["--border-color"]}`,
                  borderRadius: currentTheme["--border-radius"],
                  backgroundColor: activeTheme === "custom" ? currentTheme["--accent-color"] : currentTheme["--background-secondary"],
                  color: activeTheme === "custom" ? currentTheme["--accent-text-color"] : currentTheme["--text-primary"],
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Custom
              </button>
            </div>

            {activeTheme === "custom" && (
              <div style={{ backgroundColor: currentTheme["--background-secondary"], padding: "20px", borderRadius: currentTheme["--border-radius"], border: `1px solid ${currentTheme["--border-color"]}` }}>
                <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", fontWeight: "600", color: currentTheme["--text-primary"] }}>
                  Custom Theme Editor
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                  {(Object.keys(customVars) as Array<keyof ThemeVars>).map((key) => (
                    <div key={key}>
                      <label style={{ display: "block", marginBottom: "5px", fontSize: "13px", fontWeight: "500", color: currentTheme["--text-secondary"] }}>
                        {key}
                      </label>
                      <input
                        type="text"
                        value={customVars[key]}
                        onChange={(e) => handleCustomVarChange(key, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: `1px solid ${currentTheme["--border-color"]}`,
                          borderRadius: currentTheme["--border-radius"],
                          backgroundColor: currentTheme["--background-primary"],
                          color: currentTheme["--text-primary"],
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ ...currentTheme, padding: "40px 20px" } as React.CSSProperties}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: currentTheme["--text-primary"] }}>
              Default Configuration
            </h2>
            <CarouselSlider
              id="carousel-default"
              transitionEffect="slide"
              aspectRatio="16:9"
              showPeek={false}
              autoPlay={true}
              autoPlayInterval={5000}
              pauseOnHover={true}
              enableLoop={true}
              showArrows={true}
              showDots={true}
              slide1Visible="visible"
              slide1Image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=675&fit=crop"
              slide1Title="Discover Amazing Features"
              slide1Description="Experience the next generation of innovation with our cutting-edge solutions designed for modern businesses."
              slide1CtaText="Learn More"
              slide1CtaLink="#"
              slide1ShowCta={true}
              slide2Visible="visible"
              slide2Image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop"
              slide2Title="Built for Performance"
              slide2Description="Lightning-fast performance meets intuitive design. Get more done with tools that work as hard as you do."
              slide2CtaText="Get Started"
              slide2CtaLink="#"
              slide2ShowCta={true}
              slide3Visible="visible"
              slide3Image="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=675&fit=crop"
              slide3Title="Trusted by Thousands"
              slide3Description="Join thousands of satisfied customers who have transformed their workflow with our proven solutions."
              slide3CtaText="View Testimonials"
              slide3CtaLink="#"
              slide3ShowCta={true}
            />
          </section>

          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: currentTheme["--text-primary"] }}>
              Fade Transition with Peek View
            </h2>
            <CarouselSlider
              id="carousel-fade-peek"
              transitionEffect="fade"
              aspectRatio="21:9"
              showPeek={true}
              autoPlay={true}
              autoPlayInterval={4000}
              pauseOnHover={true}
              enableLoop={true}
              showArrows={true}
              showDots={true}
              slide1Visible="visible"
              slide1Image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop"
              slide1Title="Advanced Analytics"
              slide1Description="Make data-driven decisions with powerful analytics and insights that help you understand what matters most."
              slide1CtaText="View Analytics"
              slide1CtaLink="#"
              slide1ShowCta={true}
              slide2Visible="visible"
              slide2Image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=675&fit=crop"
              slide2Title="Seamless Integration"
              slide2Description="Connect with your favorite tools and platforms. Our integrations make it easy to work the way you want."
              slide2CtaText="Explore Integrations"
              slide2CtaLink="#"
              slide2ShowCta={true}
              slide3Visible="visible"
              slide3Image="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=675&fit=crop"
              slide3Title="Mobile First"
              slide3Description="Work from anywhere with our mobile-optimized platform. Full functionality on any device, anytime."
              slide3CtaText="Download App"
              slide3CtaLink="#"
              slide3ShowCta={true}
              slide4Visible="visible"
              slide4Image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=675&fit=crop"
              slide4Title="Enterprise Ready"
              slide4Description="Scale with confidence. Enterprise-grade security and support for organizations of any size."
              slide4CtaText="Contact Sales"
              slide4CtaLink="#"
              slide4ShowCta={true}
            />
          </section>

          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: currentTheme["--text-primary"] }}>
              Square Aspect Ratio, No Auto-Play
            </h2>
            <CarouselSlider
              id="carousel-square"
              transitionEffect="slide"
              aspectRatio="1:1"
              showPeek={false}
              autoPlay={false}
              autoPlayInterval={5000}
              pauseOnHover={false}
              enableLoop={false}
              showArrows={true}
              showDots={true}
              slide1Visible="visible"
              slide1Image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=800&fit=crop"
              slide1Title="Collaborative Tools"
              slide1Description="Bring your team together with real-time collaboration features. Work smarter, not harder, together."
              slide1CtaText="Start Collaborating"
              slide1CtaLink="#"
              slide1ShowCta={true}
              slide2Visible="visible"
              slide2Image="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=800&fit=crop"
              slide2Title="Secure by Design"
              slide2Description="Your data is protected with industry-leading security measures. Compliance-ready and audit-friendly."
              slide2CtaText="Security Details"
              slide2CtaLink="#"
              slide2ShowCta={true}
              slide3Visible="visible"
              slide3Image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop"
              slide3Title="24/7 Support"
              slide3Description="Our dedicated support team is always here to help. Get assistance whenever you need it, day or night."
              slide3CtaText="Get Support"
              slide3CtaLink="#"
              slide3ShowCta={true}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);