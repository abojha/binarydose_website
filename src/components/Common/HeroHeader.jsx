import React from "react";
import Heading from "@theme/Heading";
import StatsRibbon from "./StatsRibbon";
import styles from "./HeroHeader.module.css";

/**
 * Universal Hero Header Component
 * Reusable across Homepage, CoreDose, AlgoDose, 100-Days, etc.
 *
 * @param {{
 *   badge?: { icon?: string, text: string },
 *   title: string | React.ReactNode,
 *   gradient?: string,
 *   subtitle?: string | React.ReactNode,
 *   stats?: Array<{ number: string | number, label: string }>,
 *   children?: React.ReactNode,
 *   className?: string
 * }} props
 */
export default function HeroHeader({
  badge,
  title,
  gradient,
  subtitle,
  stats,
  children,
  className = "",
}) {
  return (
    <header className={`${styles.heroHeader} ${className}`}>
      {badge && (
        <div className={styles.badge}>
          {badge.icon && <span className={styles.badgeIcon}>{badge.icon}</span>}
          <span className={styles.badgeText}>{badge.text}</span>
        </div>
      )}

      <Heading as="h1" className={styles.title}>
        {title}
        {gradient && (
          <>
            {" "}
            <span className={styles.titleGradient}>{gradient}</span>
          </>
        )}
      </Heading>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {children}

      {stats && stats.length > 0 && <StatsRibbon items={stats} />}
    </header>
  );
}
