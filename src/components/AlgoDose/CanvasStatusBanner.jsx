import React from "react";
import styles from "./CanvasStatusBanner.module.css";

/**
 * Reusable Canvas Status Slot & Banner for all AlgoDose Visualizers
 * - Maintains strict 42px fixed height slot to eliminate CLS across playback states.
 * - Guarantees zero text overflow or horizontal clipping on mobile viewports.
 * - Supports dual desktop / mobile text formatting for rich stats on desktop and compact readability on phones.
 */
export default function CanvasStatusBanner({
  type = "info", // "success" | "info" | "danger" | "warning"
  icon = null,
  text = null,
  mobileText = null,
  children = null,
}) {
  const bannerTypeClass = styles[type] || styles.info;

  return (
    <div className={styles.slot}>
      <div className={`${styles.banner} ${bannerTypeClass}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children ? (
          <div className={styles.content}>{children}</div>
        ) : (
          <>
            <span className={styles.desktopText}>{text}</span>
            <span className={styles.mobileText}>{mobileText || text}</span>
          </>
        )}
      </div>
    </div>
  );
}
