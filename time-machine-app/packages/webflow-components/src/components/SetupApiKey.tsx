import { useState, useEffect } from "react";

type SetupApiKeyProps = {
  onSaveKey: (key: string) => Promise<void>;
  isKeySet: boolean;
  setIsKeySet: (isSet: boolean) => void;
};

export default function SetupApiKey({
  onSaveKey,
  isKeySet,
  setIsKeySet,
}: SetupApiKeyProps) {
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // If parent says no key is set, force editing mode.
    if (!isKeySet) {
      setIsEditing(true);
    }
  }, [isKeySet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Only save if a new key has been entered
    if (!apiKey) return;

    await onSaveKey(apiKey);
    setIsKeySet(true);
    setIsEditing(false);
    setSaved(true);
    setApiKey(""); // Clear the input after saving
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isEditing && isKeySet) {
    return (
      <div
        style={{ border: "1px solid #eee", padding: "20px", marginTop: "20px" }}
      >
        <h4>Mapbox API Key</h4>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ margin: 0, flex: 1, color: "green" }}>
            ✓ Your Mapbox API key is configured.
          </p>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            style={{ padding: "10px 20px" }}
          >
            Update
          </button>
          {saved && <span style={{ color: "green" }}>Saved!</span>}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ border: "1px solid #eee", padding: "20px", marginTop: "20px" }}
    >
      <h4>Mapbox API Key</h4>
      <p>
        {isKeySet
          ? "Enter a new key below to update your configuration."
          : "Your Mapbox API key is required to display maps. You can find your key on your Mapbox account page."}
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter new Mapbox API Key"
          style={{ padding: "10px", flex: 1 }}
          autoFocus
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Key
        </button>
        {isKeySet && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ padding: "10px 20px" }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
