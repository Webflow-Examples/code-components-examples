import { useState, useEffect, useRef } from "react";

export interface ToastNotificationProps {
  id?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  variant?: "success" | "error" | "warning" | "info";
  message?: React.ReactNode;
  description?: string;
  showDescription?: boolean;
  duration?: number;
  showProgressBar?: boolean;
  showCloseButton?: boolean;
  maxToasts?: number;
  enableAnimations?: boolean;
  toast1Message?: string;
  toast1Description?: string;
  toast1Variant?: "success" | "error" | "warning" | "info";
  toast1Visible?: boolean;
  toast2Message?: string;
  toast2Description?: string;
  toast2Variant?: "success" | "error" | "warning" | "info";
  toast2Visible?: boolean;
  toast3Message?: string;
  toast3Description?: string;
  toast3Variant?: "success" | "error" | "warning" | "info";
  toast3Visible?: boolean;
}

interface Toast {
  id: string;
  message: React.ReactNode;
  description?: string;
  variant: "success" | "error" | "warning" | "info";
  progress: number;
}

const variantIcons = {
  success: (
    <svg className="wf-toastnotification-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
    </svg>
  ),
  error: (
    <svg className="wf-toastnotification-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>
    </svg>
  ),
  warning: (
    <svg className="wf-toastnotification-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 17H19L10 1L1 17ZM11 14H9V12H11V14ZM11 10H9V6H11V10Z" fill="currentColor"/>
    </svg>
  ),
  info: (
    <svg className="wf-toastnotification-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
    </svg>
  ),
};

export default function ToastNotification({
  id,
  position = "top-right",
  variant = "info",
  message = "Notification message",
  description = "Additional details about this notification",
  showDescription = true,
  duration = 5000,
  showProgressBar = true,
  showCloseButton = true,
  maxToasts = 5,
  enableAnimations = true,
  toast1Message = "Changes saved successfully",
  toast1Description = "Your profile has been updated",
  toast1Variant = "success",
  toast1Visible = false,
  toast2Message = "Connection error",
  toast2Description = "Unable to reach the server",
  toast2Variant = "error",
  toast2Visible = false,
  toast3Message = "Storage almost full",
  toast3Description = "You have used 90% of your storage",
  toast3Variant = "warning",
  toast3Visible = false,
}: ToastNotificationProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const progressIntervals = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const dismissTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addToast = (toastMessage: React.ReactNode, toastDescription: string | undefined, toastVariant: "success" | "error" | "warning" | "info") => {
    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message: toastMessage,
      description: toastDescription,
      variant: toastVariant,
      progress: 100,
    };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      if (updated.length > maxToasts) {
        const removed = updated.shift();
        if (removed) {
          clearInterval(progressIntervals.current.get(removed.id));
          clearTimeout(dismissTimeouts.current.get(removed.id));
          progressIntervals.current.delete(removed.id);
          dismissTimeouts.current.delete(removed.id);
        }
      }
      return updated;
    });

    const progressInterval = setInterval(() => {
      setToasts((prev) =>
        prev.map((t) =>
          t.id === newToast.id
            ? { ...t, progress: Math.max(0, t.progress - (100 / (duration / 100))) }
            : t
        )
      );
    }, 100);

    const dismissTimeout = setTimeout(() => {
      removeToast(newToast.id);
    }, duration);

    progressIntervals.current.set(newToast.id, progressInterval);
    dismissTimeouts.current.set(newToast.id, dismissTimeout);
  };

  const removeToast = (toastId: string) => {
    clearInterval(progressIntervals.current.get(toastId));
    clearTimeout(dismissTimeouts.current.get(toastId));
    progressIntervals.current.delete(toastId);
    dismissTimeouts.current.delete(toastId);
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  useEffect(() => {
    return () => {
      progressIntervals.current.forEach((interval) => clearInterval(interval));
      dismissTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    if (toast1Visible) {
      addToast(toast1Message, toast1Description, toast1Variant);
    }
  }, [toast1Visible, toast1Message, toast1Description, toast1Variant]);

  useEffect(() => {
    if (toast2Visible) {
      addToast(toast2Message, toast2Description, toast2Variant);
    }
  }, [toast2Visible, toast2Message, toast2Description, toast2Variant]);

  useEffect(() => {
    if (toast3Visible) {
      addToast(toast3Message, toast3Description, toast3Variant);
    }
  }, [toast3Visible, toast3Message, toast3Description, toast3Variant]);

  const positionClass = `wf-toastnotification-position-${position}`;
  const animationClass = enableAnimations ? "wf-toastnotification-animated" : "";

  return (
    <div id={id} className={`wf-toastnotification ${positionClass} ${animationClass}`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`wf-toastnotification-card wf-toastnotification-variant-${toast.variant}`}
        >
          <div className="wf-toastnotification-content">
            <div className="wf-toastnotification-icon-wrapper">
              {variantIcons[toast.variant]}
            </div>
            <div className="wf-toastnotification-text">
              <div className="wf-toastnotification-message">{toast.message}</div>
              {toast.description && (
                <div className="wf-toastnotification-description">{toast.description}</div>
              )}
            </div>
            {showCloseButton && (
              <button
                className="wf-toastnotification-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="currentColor"/>
                </svg>
              </button>
            )}
          </div>
          {showProgressBar && (
            <div className="wf-toastnotification-progress-container">
              <div
                className="wf-toastnotification-progress-bar"
                style={{ width: `${toast.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}