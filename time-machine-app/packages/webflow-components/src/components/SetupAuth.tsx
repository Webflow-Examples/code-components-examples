type SetupAuthProps = {
  onAuthClick: () => void;
};

export default function SetupAuth({ onAuthClick }: SetupAuthProps) {
  return (
    <>
      <p>To get started, please log in with your Webflow account.</p>
      <button
        onClick={onAuthClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
          margin: "10px 0",
          border: "none",
          cursor: "pointer",
        }}
      >
        1. Login with Webflow
      </button>
    </>
  );
}
