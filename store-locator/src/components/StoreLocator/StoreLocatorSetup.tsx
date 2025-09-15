import React, { useState, useEffect, useMemo } from "react";
import { getAuthClient } from "../../lib/auth-client";
import type * as Webflow from "webflow-api/api";
import { Toaster, toast } from "react-hot-toast";

interface SiteWithPrefs extends Webflow.Site {
  selectedCollectionId?: string | null;
  mapboxKey?: string | null;
  mapboxStyle?: string | null;
}

interface StoreLocatorSetupProps {
  onSaved?: () => void;
  apiBaseUrl?: string;
}

const StoreLocatorSetup: React.FC<StoreLocatorSetupProps> = ({
  onSaved,
  apiBaseUrl,
}) => {
  const authClient = useMemo(() => getAuthClient(apiBaseUrl), [apiBaseUrl]);
  const { data: session, isPending, refetch } = authClient.useSession();
  const [mapboxKey, setMapboxKey] = useState("");
  const [mapboxStyle, setMapboxStyle] = useState("");
  const [sites, setSites] = useState<SiteWithPrefs[]>([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [collections, setCollections] = useState<Webflow.Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const handleLogin = () => {
    // Use the client's built-in signIn method. It will handle the redirect
    // and automatically return the user to this page.
    //@ts-expect-error - signIn is not typed
    authClient.signIn.social({
      provider: "webflow",
      callbackURL: `${import.meta.env.BASE_URL}/setup`,
    });
  };

  const handleGenerateToken = async () => {
    if (!selectedSite || !selectedCollection) {
      toast.error("Please select a site and a collection first.");
      return;
    }
    // Save settings before generating token
    await handleSaveSettings();

    // API call to generate JWT
    const response = await fetch(
      `${apiBaseUrl || ""}/api/auth/generate-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: selectedSite,
          collectionId: selectedCollection,
        }),
      }
    );

    if (response.ok) {
      const { token } = (await response.json()) as { token: string };
      setGeneratedToken(token);
      toast.success("Token generated successfully!");
    } else {
      toast.error("Failed to generate token.");
    }
  };

  const handleSaveSettings = async () => {
    // API call to save Mapbox key
    await fetch(`${apiBaseUrl || ""}/api/sites/mapbox`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId: selectedSite,
        mapboxKey,
        mapboxStyle,
      }),
    });

    // API call to save selected collection
    await fetch(`${apiBaseUrl || ""}/api/sites/preferences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId: selectedSite,
        collectionId: selectedCollection,
      }),
    });

    // This alert is redundant since a token generation message will follow.
    // alert("Settings saved!");
    onSaved?.();
  };

  useEffect(() => {
    if (session) {
      // Fetch sites
      const fetchSites = async () => {
        const response = await fetch(`${apiBaseUrl || ""}/api/sites`);
        if (response.ok) {
          const data = (await response.json()) as SiteWithPrefs[];
          setSites(data);

          // Check for a site with pre-loaded preferences
          const preferredSite = data.find(
            (s) => s.selectedCollectionId && s.mapboxKey
          );

          if (preferredSite) {
            setSelectedSite(preferredSite.id);
            setMapboxKey(preferredSite.mapboxKey || "");
            setMapboxStyle(preferredSite.mapboxStyle || "");
            // The collections useEffect will handle setting the selected collection
          } else if (data.length > 0) {
            setSelectedSite(data[0].id);
          }
        }
      };
      fetchSites();
    }
  }, [session, apiBaseUrl]);

  useEffect(() => {
    if (selectedSite) {
      // Fetch collections for the selected site
      const fetchCollections = async () => {
        const response = await fetch(
          `${apiBaseUrl || ""}/api/collections?site_id=${selectedSite}`
        );
        if (response.ok) {
          const data = (await response.json()) as Webflow.CollectionList;
          if (data.collections && data.collections.length > 0) {
            setCollections(data.collections as Webflow.Collection[]);
            // Check if there's a preferred collection for this site
            const currentSite = sites.find((s) => s.id === selectedSite);
            if (currentSite?.selectedCollectionId) {
              setSelectedCollection(currentSite.selectedCollectionId);
            } else {
              setSelectedCollection(data.collections[0].id);
            }
          }
        }
      };
      fetchCollections();
    }
  }, [selectedSite, sites, apiBaseUrl]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="setup-container">
        <h2>Store Locator Setup</h2>
        <p>Please log in with Webflow to configure your store locator.</p>
        <button onClick={handleLogin}>Login with Webflow</button>
      </div>
    );
  }

  return (
    <div className="setup-container">
      <Toaster position="top-center" />
      <h2>Store Locator Setup</h2>
      <div className="form-group">
        <label htmlFor="mapboxKey">Mapbox API Key</label>
        <input
          type="text"
          id="mapboxKey"
          value={mapboxKey}
          onChange={(e) => setMapboxKey(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="site">Select Site</label>
        <select
          id="site"
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          {sites.map((site) => (
            <option key={site.id} value={site.id}>
              {site.displayName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="collection">Select Store Collection</label>
        <select
          id="collection"
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.displayName}
            </option>
          ))}
        </select>
      </div>

      {generatedToken ? (
        <div className="id-display">
          <h3>Auth Token (JWT)</h3>
          <p>
            Copy this token and paste it into the "Auth Token (JWT)" field in
            the Webflow Designer settings for this component.
          </p>
          <div className="id-field">
            <div className="code-display">
              <code>{generatedToken}</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedToken);
                  toast.success("Token copied!");
                }}
                className="copy-button"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      ) : (
        selectedSite &&
        selectedCollection && (
          <div className="id-display">
            <h3>Generate Auth Token</h3>
            <p>
              Once your settings are correct, generate a token for the live
              component.
            </p>
          </div>
        )
      )}

      <button onClick={handleGenerateToken}>
        {generatedToken
          ? "Re-generate Token"
          : "Save Settings & Generate Token"}
      </button>
    </div>
  );
};

export default StoreLocatorSetup;
