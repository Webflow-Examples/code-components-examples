import React from "react";

const Navbar = () => {
  return (
    <nav
      style={{
        background: "var(--astral-secondary)",
        borderBottom: "1px solid var(--astral-glass-border)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "var(--astral-text)",
      }}
    >
      <a
        href="/#"
        style={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          textDecoration: "none",
          color: "var(--astral-text)",
        }}
      >
        Dynamic Form Generator
      </a>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a href="/#/docs" className="btn btn-outline">
          Docs
        </a>
        <a
          href="https://developers.webflow.com/code-components"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Code Component Docs
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
