import React from "react";
import Link from "@docusaurus/Link";
import styles from "./BackNav.module.css";

/**
 * Universal Back Navigation & Breadcrumb Strip
 * Reusable across any section (CoreDose, AlgoDose, 100-Days, Docs, etc.)
 *
 * @param {{
 *   backUrl?: string,
 *   backLabel?: string,
 *   breadcrumbs?: Array<{ label: string, url?: string }>,
 *   className?: string
 * }} props
 */
export default function BackNav({
  backUrl,
  backLabel = "Back",
  breadcrumbs = [],
  className = "",
}) {
  const handleBackClick = (e) => {
    if (!backUrl) {
      e.preventDefault();
      if (typeof window !== "undefined" && window.history.length > 1) {
        window.history.back();
      }
    }
  };

  return (
    <div className={`${styles.navContainer} ${className}`}>
      {/* Back Action Button */}
      {backUrl ? (
        <Link to={backUrl} className={styles.backButton}>
          <svg
            className={styles.backArrow}
            viewBox="0 0 24 24"
            width="15"
            height="15"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className={styles.backButtonText}>{backLabel}</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleBackClick}
          className={styles.backButton}
        >
          <svg
            className={styles.backArrow}
            viewBox="0 0 24 24"
            width="15"
            height="15"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className={styles.backButtonText}>{backLabel}</span>
        </button>
      )}

      {/* Breadcrumb Trail */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="breadcrumbs" className={styles.breadcrumbs}>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={`${crumb.label}-${idx}`}>
                {idx > 0 && (
                  <span className={styles.crumbSep} aria-hidden="true">
                    /
                  </span>
                )}
                {crumb.url && !isLast ? (
                  <Link to={crumb.url} className={styles.crumbLink}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? styles.crumbActive : styles.crumbLink}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}
    </div>
  );
}
