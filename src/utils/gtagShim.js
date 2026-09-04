/**
 * Safe fallback for window.gtag in development mode or when blocked by ad-blockers.
 * Prevents "TypeError: window.gtag is not a function" on client-side route transitions.
 */
if (typeof window !== "undefined") {
  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
}
