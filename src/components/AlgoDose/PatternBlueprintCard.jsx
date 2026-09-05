import React from "react";
import CustomDropdown from "./CustomDropdown";
import styles from "./PatternBlueprintCard.module.css";

export default function PatternBlueprintCard({
  patternId,
  onPatternChange,
  options = [],
  blueprint,
  id = "pattern-blueprint-select",
}) {
  if (!blueprint) return null;

  return (
    <div className={styles.card}>
      {/* Top Header Row with Dropdown */}
      <div className={styles.headerRow}>
        <div className={styles.selectGroup}>
          <label htmlFor={id} className={styles.selectLabel}>
            Pattern:
          </label>
          <div className={styles.selectWrapper}>
            <CustomDropdown
              id={id}
              value={patternId}
              onChange={onPatternChange}
              options={options}
              ariaLabel="Select algorithm pattern"
            />
          </div>
        </div>
      </div>

      {/* Generalized Pattern Information Details */}
      <div className={styles.detailsGrid}>
        {blueprint.problem && (
          <div className={styles.detailItem}>
            <span className={`${styles.detailBadge} ${styles.badgeProblem}`}>🎯 Problem Solved</span>
            <span className={styles.detailText}>{blueprint.problem}</span>
          </div>
        )}

        {blueprint.whenToUse && (
          <div className={styles.detailItem}>
            <span className={`${styles.detailBadge} ${styles.badgeWhen}`}>💡 When to Use</span>
            <span className={styles.detailText}>{blueprint.whenToUse}</span>
          </div>
        )}

        {blueprint.mechanics && (
          <div className={styles.detailItem}>
            <span className={`${styles.detailBadge} ${styles.badgeMechanics}`}>⚙️ Core Mechanics</span>
            <span className={styles.detailText}>{blueprint.mechanics}</span>
          </div>
        )}
      </div>
    </div>
  );
}
