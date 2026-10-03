import React from "react";
import styles from "./SearchBar.module.css";

/**
 * Universal Search Bar Component
 * Reusable across CodeDose, 100-Days, DevDose, CoreDose, etc.
 *
 * @param {{
 *   value: string,
 *   onChange: (val: string) => void,
 *   placeholder?: string,
 *   onClear?: () => void,
 *   maxWidth?: string | number,
 *   className?: string,
 *   ariaLabel?: string
 * }} props
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  maxWidth = "640px",
  className = "",
  ariaLabel = "Search input",
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange("");
    }
  };

  return (
    <div
      className={`${styles.searchBox} ${className}`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <svg
        className={styles.searchSvgIcon}
        viewBox="0 0 24 24"
        width="17"
        height="17"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
      />
      {value && (
        <button
          type="button"
          className={styles.searchClearBtn}
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
