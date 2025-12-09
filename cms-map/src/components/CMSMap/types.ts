export interface Location {
  id: number;
  lat: number;
  lng: number;
  popup: HTMLDivElement | null;
}

export interface CMSMapProps {
  locations?: Location[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  fitBounds?: boolean; // Auto-fit to show all markers
  fitBoundsPadding?: number; // Padding around markers in pixels
  fitBoundsMaxZoom?: number; // Max zoom level when fitting bounds
  mapKey: string;
  controlsVerticalPadding?: number; // Top padding for zoom controls (in pixels)
  controlsHorizontalPadding?: number; // Right padding for zoom controls (in pixels)
  MarkersCollection: React.ReactNode;
  ShowMarkersCollection?: boolean;
}
