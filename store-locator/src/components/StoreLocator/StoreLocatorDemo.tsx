import React, { useState } from "react";
import StoreLocator from "./StoreLocator";

interface StoreLocatorDemoProps {
  apiBaseUrl: string;
}

const StoreLocatorDemo: React.FC<StoreLocatorDemoProps> = ({ apiBaseUrl }) => {
  const [token, setToken] = useState("");
  const [submittedToken, setSubmittedToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedToken(token);
  };

  if (submittedToken) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <StoreLocator authToken={submittedToken} apiBaseUrl={apiBaseUrl} />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button onClick={() => setSubmittedToken("")}>
            Use a different token
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div className="token-form-container">
        <form onSubmit={handleSubmit} className="token-form">
          <h3>Enter Auth Token</h3>
          <p>
            Paste the JWT generated from the <code>/setup</code> page to preview
            the component.
          </p>
          <textarea
            id="jwt-token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your generated token here"
            rows={5}
          />
          <button type="submit" disabled={!token.trim()}>
            Load Store Locator
          </button>
        </form>
        <style>{`
          .token-form-container {
              display: flex;
              justify-content: center;
              align-items: flex-start;
              padding: 2rem;
          }
          .token-form {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              width: 100%;
              max-width: 500px;
              border: 1px solid #ccc;
              padding: 2rem;
              border-radius: 8px;
          }
          .token-form h3 {
              margin: 0;
              text-align: center;
          }
          .token-form p {
              margin: 0;
              text-align: center;
          }
          .token-form textarea {
              width: 100%;
              padding: 8px;
              box-sizing: border-box;
              border-radius: 4px;
              border: 1px solid #ccc;
              font-family: monospace;
          }
          .token-form button {
              padding: 0.75rem;
              border-radius: 4px;
              border: none;
              background-color: #3245ff;
              color: white;
              cursor: pointer;
          }
          .token-form button:disabled {
              background-color: #ccc;
              cursor: not-allowed;
          }
        `}</style>
      </div>
    </div>
  );
};

export default StoreLocatorDemo;
