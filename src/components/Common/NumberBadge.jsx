import React from "react";
import styles from "./NumberBadge.module.css";

/**
 * Universal Number Badge Component
 * Used across CodeDose, 100-Days, InterviewHub, and roadmaps for consistent "#01" badges.
 *
 * @param {{
 *   value: number | string,
 *   prefix?: string,
 *   pad?: number,
 *   className?: string
 * }} props
 */
export default function NumberBadge({
  value,
  prefix = "#",
  pad = 2,
  className = "",
}) {
  let formatted = value;

  if (typeof value === "number") {
    formatted = `${prefix}${String(value).padStart(pad, "0")}`;
  } else if (typeof value === "string") {
    // If it's pure digits like "1", pad it and add prefix
    if (/^\d+$/.test(value)) {
      formatted = `${prefix}${value.padStart(pad, "0")}`;
    } else if (!value.startsWith(prefix) && /^\d/.test(value)) {
      formatted = `${prefix}${value}`;
    }
  }

  return <span className={`${styles.numberBadge} ${className}`}>{formatted}</span>;
}
