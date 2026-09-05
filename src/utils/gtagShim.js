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

  // Digital attribution & copyright signature
  if (!window.__binaryDoseSignature) {
    window.__binaryDoseSignature = true;
    console.log(
      "%c⚡ Binary Dose %c\nCreated by Abhay Ojha | https://binarydose.in\nProtected by Binary Dose License. All rights reserved.",
      "font-weight: 800; font-size: 13px; color: #2563eb; padding: 2px 4px;",
      "font-size: 11px; color: #64748b;"
    );
  }
}
