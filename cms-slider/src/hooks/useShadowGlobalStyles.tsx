import { useEffect, useRef } from "react";

/**
 * Injects global styles into shadow DOM for proper rendering
 * @param ref - Reference to element inside shadow DOM
 */
export function useShadowGlobalStyles(
  ref: React.RefObject<HTMLElement | null>
) {
  const appliedRef = useRef(false);

  useEffect(() => {
    const el = ref.current ?? null;
    if (!el || appliedRef.current) return;

    // Check if element is inside shadow DOM
    const rootNode = el.getRootNode?.();
    if (!(rootNode instanceof ShadowRoot)) return;

    const shadowRoot = rootNode;

    try {
      copyGlobalStylesToShadow(shadowRoot);
    } catch (err) {
      console.warn("Failed to copy styles to shadow DOM:", err);
    }

    appliedRef.current = true;
  }, [ref]);
}

/**
 * Clones all global stylesheets into the shadow DOM
 */
function copyGlobalStylesToShadow(shadowRoot: ShadowRoot) {
  const styleElements = Array.from(
    document.querySelectorAll("style, link[rel='stylesheet']")
  );

  styleElements.forEach((el) => {
    let clone: HTMLElement | null = null;

    // Clone inline styles
    if (el.tagName === "STYLE") {
      clone = document.createElement("style");
      (clone as HTMLStyleElement).textContent = el.textContent;
    }
    // Clone linked stylesheets
    else if (el.tagName === "LINK" && (el as HTMLLinkElement).href) {
      clone = document.createElement("link");
      (clone as HTMLLinkElement).rel = "stylesheet";
      (clone as HTMLLinkElement).href = (el as HTMLLinkElement).href;
    }

    if (clone) shadowRoot.appendChild(clone);
  });
}
