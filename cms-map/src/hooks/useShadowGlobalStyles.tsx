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
    const clone = cloneStyleElement(el);
    if (clone) {
      shadowRoot.appendChild(clone);
    }
  });
}

/**
 * Clones a style or link element for injection into shadow DOM.
 *
 * @param el - The style or link element to clone
 * @returns A cloned HTMLElement ready for shadow DOM, or null if element cannot be cloned
 */
function cloneStyleElement(el: Element): HTMLElement | null {
  // Clone inline <style> elements
  if (el.tagName === "STYLE") {
    return cloneInlineStyleElement(el as HTMLStyleElement);
  }

  // Clone external <link> stylesheets
  if (el.tagName === "LINK" && (el as HTMLLinkElement).href) {
    return cloneLinkElement(el as HTMLLinkElement);
  }

  return null;
}

/**
 * Clones an inline style element, preserving its CSS content.
 * Falls back to CSSOM extraction if textContent is empty.
 *
 * @param el - The style element to clone
 * @returns A new style element with the same CSS content
 */
function cloneInlineStyleElement(el: HTMLStyleElement): HTMLStyleElement {
  const clone = document.createElement("style");
  const textContent = el.textContent?.trim();

  // Use textContent if available, otherwise extract from CSSOM
  if (textContent) {
    clone.textContent = textContent;
  } else {
    clone.textContent = getStyleElementCSS(el);
  }

  return clone;
}

/**
 * Clones a link element for external stylesheets.
 *
 * @param el - The link element to clone
 * @returns A new link element pointing to the same stylesheet
 */
function cloneLinkElement(el: HTMLLinkElement): HTMLLinkElement {
  const clone = document.createElement("link");
  clone.rel = "stylesheet";
  clone.href = el.href;
  return clone;
}

/**
 * Extracts CSS rules from a style element by accessing its associated stylesheet.
 *
 * This function is necessary because sometimes `element.textContent` is empty or unreliable
 * for dynamically created style elements, but the actual CSS rules are accessible via the
 * CSSOM (CSS Object Model) through `document.styleSheets`.
 *
 * @param el - The HTML element to extract CSS from (should be a style element)
 * @returns The concatenated CSS text from all rules in the stylesheet, or empty string if the element is not a style element or if the stylesheet is not found.
 */
function getStyleElementCSS(el: HTMLElement) {
  if (!(el instanceof HTMLStyleElement)) {
    return "";
  }

  // Find the CSSStyleSheet object associated with this style element
  const sheet = Array.from(document.styleSheets).find(
    (s) => s.ownerNode === el
  );

  if (!sheet) return "";

  try {
    // Extract and concatenate all CSS rules from the stylesheet
    return Array.from(sheet.cssRules)
      .map((rule) => rule.cssText)
      .join("\n");
  } catch (e) {
    // CORS restrictions prevent reading cross-origin stylesheets
    console.warn("Unable to read CSS rules (maybe cross-origin):", e);
    return "";
  }
}
