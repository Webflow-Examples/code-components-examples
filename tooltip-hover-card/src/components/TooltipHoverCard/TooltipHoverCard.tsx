import { useState, useRef, useEffect } from "react";
import type { PropValues, PropType } from "@webflow/data-types";

export interface TooltipHoverCardProps {
  id?: string;
  mode?: "tooltip" | "hoverCard";
  theme?: "dark" | "light";
  placement?: "top" | "bottom" | "left" | "right";
  triggerText?: React.ReactNode;
  tooltipText?: string;
  cardTitle?: string;
  cardDescription?: React.ReactNode;
  cardImage?: PropValues[PropType.Image];
  showCardImage?: boolean;
  hoverDelay?: number;
  showArrow?: boolean;
  autoFlip?: boolean;
  maxWidth?: number;
  ariaLabel?: string;
}

const flipMap: Record<string, "top" | "bottom" | "left" | "right"> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export default function TooltipHoverCard({
  id,
  mode = "tooltip",
  theme = "dark",
  placement = "top",
  triggerText = "Hover me",
  tooltipText = "This is helpful information",
  cardTitle = "More Information",
  cardDescription,
  cardImage,
  showCardImage = true,
  hoverDelay = 200,
  showArrow = true,
  autoFlip = true,
  maxWidth = 300,
  ariaLabel = "Additional information",
}: TooltipHoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [effectivePlacement, setEffectivePlacement] = useState(placement);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setEffectivePlacement(placement);
  }, [placement]);

  useEffect(() => {
    if (!isVisible || !autoFlip) return;
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const gap = 12;

    const overflows = {
      top: triggerRect.top - contentRect.height - gap < 0,
      bottom: triggerRect.bottom + contentRect.height + gap > window.innerHeight,
      left: triggerRect.left - contentRect.width - gap < 0,
      right: triggerRect.right + contentRect.width + gap > window.innerWidth,
    };

    const flipped = flipMap[placement];
    if (overflows[placement] && !overflows[flipped]) {
      setEffectivePlacement(flipped);
    } else {
      setEffectivePlacement(placement);
    }
  }, [isVisible, placement, autoFlip]);

  const cancelHide = () => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const cancelShow = () => {
    if (showTimeoutRef.current) {
      window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  };

  const scheduleShow = () => {
    cancelHide();
    cancelShow();
    showTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
      showTimeoutRef.current = null;
    }, hoverDelay);
  };

  const scheduleHide = () => {
    cancelShow();
    cancelHide();
    // Small grace period in hoverCard mode so the cursor can cross the gap to the card
    const delay = mode === "hoverCard" ? 120 : 0;
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      hideTimeoutRef.current = null;
    }, delay);
  };

  const handleFocus = () => {
    cancelHide();
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      cancelShow();
      cancelHide();
    };
  }, []);

  return (
    <div
      id={id}
      className={`wf-tooltiphovercard${isVisible ? " wf-tooltiphovercard--open" : ""}`}
      style={{ "--wf-tooltiphovercard-max-width": `${maxWidth}px` } as React.CSSProperties}
      onMouseEnter={scheduleShow}
      onMouseLeave={scheduleHide}
    >
      <button
        ref={triggerRef}
        type="button"
        className="wf-tooltiphovercard-trigger"
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        aria-describedby={isVisible && id ? `${id}-content` : undefined}
      >
        {triggerText}
      </button>

      <div
        ref={contentRef}
        id={id ? `${id}-content` : undefined}
        className={`wf-tooltiphovercard-content wf-tooltiphovercard-content--${mode} wf-tooltiphovercard-content--${theme} wf-tooltiphovercard-content--${effectivePlacement}`}
        role={mode === "tooltip" ? "tooltip" : undefined}
        aria-hidden={!isVisible}
      >
        {mode === "tooltip" ? (
          <div className="wf-tooltiphovercard-tooltip">{tooltipText}</div>
        ) : (
          <div className="wf-tooltiphovercard-hovercard">
            {showCardImage && cardImage?.src && (
              <div className="wf-tooltiphovercard-hovercard-image-wrapper">
                <img
                  src={cardImage.src}
                  alt={cardImage.alt || ""}
                  className="wf-tooltiphovercard-hovercard-image"
                />
              </div>
            )}
            <div className="wf-tooltiphovercard-hovercard-body">
              <h3 className="wf-tooltiphovercard-hovercard-title">{cardTitle}</h3>
              <div className="wf-tooltiphovercard-hovercard-description">
                {cardDescription}
              </div>
            </div>
          </div>
        )}

        {showArrow && <div className="wf-tooltiphovercard-arrow" />}
      </div>
    </div>
  );
}
