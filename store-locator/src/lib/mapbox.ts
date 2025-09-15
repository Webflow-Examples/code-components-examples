/**
 * Mapbox helpers
 */

export interface ParsedStyle {
  user: string;
  styleId: string;
}

/**
 * Extracts the user and styleId from a variety of Mapbox style URL formats.
 * Accepts:
 * - "mapbox://styles/{user}/{styleId}"
 * - "https://api.mapbox.com/styles/v1/{user}/{styleId}"
 * - "{user}/{styleId}"
 * - "streets-v11" (defaults user to "mapbox")
 */
export function parseMapboxStyle(input: string): ParsedStyle | null {
  const style = (input || "").trim();
  const patterns = [
    /^mapbox:\/\/styles\/([^/]+)\/([^/]+)$/,
    /styles\/v1\/([^/]+)\/([^/]+)/,
    /^([^/]+)\/([^/]+)$/,
  ];

  for (const pattern of patterns) {
    const match = style.match(pattern);
    if (match && match[1] && match[2]) {
      return { user: match[1], styleId: match[2] };
    }
  }

  if (!style.includes("/")) {
    return { user: "mapbox", styleId: style };
  }

  return null;
}
