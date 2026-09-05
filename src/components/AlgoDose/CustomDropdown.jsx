import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdown.module.css";

export default function CustomDropdown({
  id,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  className = "",
  ariaLabel = "Select option",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Find currently selected item across flat or grouped options
  let selectedItem = null;
  const isGrouped = options.length > 0 && options[0].items;

  if (isGrouped) {
    for (const group of options) {
      const match = group.items.find((item) => item.value === value);
      if (match) {
        selectedItem = match;
        break;
      }
    }
  } else {
    selectedItem = options.find((item) => item.value === value);
  }

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.dropdownContainer} ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        id={id}
        type="button"
        className={`${styles.dropdownTrigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <div className={styles.triggerContent}>
          {selectedItem?.icon && (
            <span className={styles.itemIcon}>{selectedItem.icon}</span>
          )}
          <span className={styles.itemLabel}>
            {selectedItem ? selectedItem.label : placeholder}
          </span>
        </div>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {isGrouped ? (
            options.map((grp, gIdx) => (
              <div key={gIdx} className={styles.groupSection}>
                <div className={styles.groupHeader}>{grp.group}</div>
                {grp.items.map((item) => {
                  const isSelected = item.value === value;
                  return (
                    <div
                      key={item.value}
                      role="option"
                      data-value={item.value}
                      aria-selected={isSelected}
                      className={`${styles.menuItem} ${
                        isSelected ? styles.menuItemSelected : ""
                      }`}
                      onClick={() => handleSelect(item.value)}
                    >
                      <div className={styles.itemLeft}>
                        {item.icon && (
                          <span className={styles.itemIcon}>{item.icon}</span>
                        )}
                        <span className={styles.itemLabel}>{item.label}</span>
                      </div>
                      <div className={styles.itemRight}>
                        {item.badge && (
                          <span className={styles.itemBadge}>{item.badge}</span>
                        )}
                        {isSelected && (
                          <span className={styles.checkmark}>✓</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            options.map((item) => {
              const isSelected = item.value === value;
              return (
                <div
                  key={item.value}
                  role="option"
                  data-value={item.value}
                  aria-selected={isSelected}
                  className={`${styles.menuItem} ${
                    isSelected ? styles.menuItemSelected : ""
                  }`}
                  onClick={() => handleSelect(item.value)}
                >
                  <div className={styles.itemLeft}>
                    {item.icon && (
                      <span className={styles.itemIcon}>{item.icon}</span>
                    )}
                    <span className={styles.itemLabel}>{item.label}</span>
                  </div>
                  <div className={styles.itemRight}>
                    {item.badge && (
                      <span className={styles.itemBadge}>{item.badge}</span>
                    )}
                    {isSelected && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
