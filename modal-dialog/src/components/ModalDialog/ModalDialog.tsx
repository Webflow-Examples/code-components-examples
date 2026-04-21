import { useState, useEffect, useRef } from "react";

export interface ModalDialogProps {
  id?: string;
  isOpen?: boolean;
  maxWidth?: "small" | "medium" | "large";
  closeOnBackdropClick?: boolean;
  triggerButtonText?: string;
  modalTitle?: React.ReactNode;
  bodyContent?: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  animationDuration?: number;
  enableEscapeKey?: boolean;
  showTriggerButton?: boolean;
}

export default function ModalDialog({
  id,
  isOpen = false,
  maxWidth = "medium",
  closeOnBackdropClick = true,
  triggerButtonText = "Open Modal",
  modalTitle = "Modal Title",
  bodyContent = "This is the modal body content. You can add any text, formatting, or information here.",
  showCloseButton = true,
  closeButtonLabel = "Close modal",
  animationDuration = 300,
  enableEscapeKey = true,
  showTriggerButton = true,
}: ModalDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (internalIsOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (enableEscapeKey && e.key === "Escape") {
          handleClose();
        }

        if (e.key === "Tab") {
          if (!focusableElements || focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [internalIsOpen, enableEscapeKey]);

  const handleOpen = () => {
    setInternalIsOpen(true);
  };

  const handleClose = () => {
    setInternalIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      handleClose();
    }
  };

  const maxWidthMap = {
    small: "400px",
    medium: "600px",
    large: "800px",
  };

  return (
    <div
      id={id}
      className="wf-modaldialog"
      style={
        {
          "--wf-modaldialog-max-width": maxWidthMap[maxWidth],
          "--wf-modaldialog-animation-duration": `${animationDuration}ms`,
        } as React.CSSProperties
      }
    >
      {showTriggerButton && (
        <button
          type="button"
          className="wf-modaldialog-trigger"
          onClick={handleOpen}
        >
          {triggerButtonText}
        </button>
      )}

      {internalIsOpen && (
        <div
          className="wf-modaldialog-overlay"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="wf-modaldialog-container" ref={dialogRef}>
            <div className="wf-modaldialog-header">
              <h2 id="modal-title" className="wf-modaldialog-title">
                {modalTitle}
              </h2>
              {showCloseButton && (
                <button
                  type="button"
                  className="wf-modaldialog-close"
                  onClick={handleClose}
                  aria-label={closeButtonLabel}
                >
                  <svg
                    className="wf-modaldialog-close-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <div className="wf-modaldialog-body">
              <div className="wf-modaldialog-content">{bodyContent}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}