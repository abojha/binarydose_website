import React from "react";
import Link from "@docusaurus/Link";
import styles from "./DoseCard.module.css";

/**
 * Universal DoseCard Component
 * Shared across CoreDose, CodeDose, DevDose, and AlgoDose for 100% design consistency.
 *
 * @param {{
 *   icon: React.ReactNode | string,
 *   title: string,
 *   description: string,
 *   badge?: React.ReactNode | string,
 *   badgeType?: "primary" | "success" | "warning" | "muted",
 *   chips?: string[],
 *   to?: string,
 *   href?: string,
 *   actionText?: string,
 *   secondaryAction?: { label: string, href: string, icon?: string },
 *   accent?: "blue" | "purple" | "emerald" | "amber" | "rose" | "cyan",
 *   disabled?: boolean,
 *   className?: string
 * }} props
 */
export default function DoseCard({
  icon,
  title,
  description,
  badge,
  badgeType = "primary",
  chips = [],
  to,
  href,
  actionText,
  secondaryAction,
  accent,
  disabled = false,
  className = "",
}) {
  const isClickable = !disabled && (to || href);
  const CardContainer = isClickable ? (to ? Link : "a") : "div";
  const containerProps = isClickable
    ? to
      ? { to }
      : { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  const accentClass = accent ? styles[`accent_${accent}`] : "";
  const badgeClass = styles[`badge_${badgeType}`] || styles.badge_primary;

  return (
    <CardContainer
      className={`${styles.card} ${isClickable ? styles.cardClickable : styles.cardDisabled} ${accentClass} ${className}`}
      {...containerProps}
    >
      {/* Card Header: Icon & Badge */}
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>{icon}</div>
        {badge && (
          <span className={`${styles.badge} ${badgeClass}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>

      {/* High-Yield Keyword / Pattern Chips */}
      {chips && chips.length > 0 && (
        <div className={styles.chipsRow}>
          {chips.map((chip, idx) => (
            <span key={idx} className={styles.chip}>
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer: Primary CTA & Secondary Action */}
      {(actionText || secondaryAction) && (
        <div className={styles.cardFooter}>
          {actionText && (
            <span
              className={`${styles.actionText} ${
                isClickable ? styles.actionActive : styles.actionMuted
              }`}
            >
              {actionText}
            </span>
          )}

          {secondaryAction && (
            <a
              href={secondaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
              onClick={(e) => e.stopPropagation()}
            >
              {secondaryAction.icon && (
                <span className={styles.secondaryIcon}>{secondaryAction.icon}</span>
              )}
              <span>{secondaryAction.label}</span>
            </a>
          )}
        </div>
      )}
    </CardContainer>
  );
}
