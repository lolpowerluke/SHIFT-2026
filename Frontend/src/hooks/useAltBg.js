import { useEffect } from "react";

/**
 * Adds a CSS class to <html> while the component is mounted, removes it on unmount.
 *
 * Usage:
 *   useAltBg();           // defaults to "alt-bg"
 *   useAltBg("dark-bg");
 */
export function useAltBg(className = "alt-bg") {
  useEffect(() => {
    document.documentElement.classList.add(className);
    return () => document.documentElement.classList.remove(className);
  }, [className]);
}
