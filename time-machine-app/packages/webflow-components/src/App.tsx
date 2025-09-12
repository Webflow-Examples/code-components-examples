import { useState } from "react";
import StoreLocator from "./StoreLocator.tsx";

// --- CONFIGURATION FOR LOCAL DEVELOPMENT ---
// Replace these with your actual Site and Collection IDs to test the live component locally.
const DEV_SITE_ID = "68b702b2077a637e57837e36";
const DEV_COLLECTION_ID = "68c4668e31193b2dfc8173e1";
// -----------------------------------------

export default function App() {
  const [forceLive, setForceLive] = useState(false);

  const handleSetupComplete = () => {
    setForceLive(true);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          background: "white",
          padding: "10px",
          border: "1px solid black",
        }}
      >
        <strong>Dev Controls</strong>
        <button
          onClick={() => setForceLive(!forceLive)}
          style={{ display: "block", width: "100%", marginTop: "5px" }}
        >
          Toggle to {forceLive ? "Setup UI" : "Live Map"}
        </button>
      </div>
      <StoreLocator
        siteId={forceLive ? DEV_SITE_ID : undefined}
        collectionId={forceLive ? DEV_COLLECTION_ID : undefined}
        forceLiveMode={forceLive}
        onSetupComplete={handleSetupComplete}
      />
    </>
  );
}
