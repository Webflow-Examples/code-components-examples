import { useCallback, useEffect, useState } from "react";

export interface SiteConfig {
  id: string;
  displayName: string;
  selectedCollectionId?: string;
  mapboxKey?: string;
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}/api/sites`);
      if (response.ok) {
        const sites = (await response.json()) as SiteConfig[];
        const configuredSite = sites.find(
          (s) => s.selectedCollectionId && s.mapboxKey
        );
        setConfig(configuredSite || null);
      }
    } catch (e) {
      console.error("Failed to fetch site configuration:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { config, loading, refetch } as const;
}
