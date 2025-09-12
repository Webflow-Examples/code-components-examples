type Collection = {
  id: string;
  displayName: string;
};

type SetupCollectionProps = {
  siteId?: string;
  collections: Collection[];
};

export default function SetupCollection({
  siteId,
  collections,
}: SetupCollectionProps) {
  return (
    <>
      <hr
        style={{
          margin: "20px 0",
          border: "none",
          borderTop: "1px solid #ccc",
        }}
      />
      {!siteId ? (
        <p>
          3. Please enter your <strong>Site ID</strong> in the props panel to
          continue.
        </p>
      ) : (
        <div>
          <p>
            <strong>Site ID:</strong> {siteId}
          </p>
          <h3>Available Collections:</h3>
          <p>
            4. Copy the ID of your locations collection and paste it into the{" "}
            <strong>Collection ID</strong> prop.
          </p>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {collections.map((collection) => (
              <li
                key={collection.id}
                style={{
                  marginBottom: "8px",
                  background: "#eee",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <strong>{collection.displayName}</strong>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {collection.id}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
