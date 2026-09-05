import React from "react";
import styles from "./CodeSyncPanel.module.css";

export default function CodeSyncPanel({
  codeLines = [],
  activeLine = null,
  explanation = "",
  variables = [],
  statusText = "",
  statusType = "info", // info | success | warning | danger
  timeComplexity = "",
  spaceComplexity = "",
  language = "Python",
}) {
  return (
    <div className={styles.panelContainer}>
      {/* 1. Code Synchronization Block (Stable on TOP, never fluctuates) */}
      <div className={styles.codeCard}>
        <div className={styles.codeHeader}>
          <div className={styles.codeTitleGroup}>
            <span className={styles.codeTitle}>Algorithm Logic</span>
            <span className={styles.langBadge}>🐍 {language}</span>
          </div>
          <div className={styles.complexities}>
            {timeComplexity && (
              <span className={styles.complexityTagTc} title="Time Complexity">
                ⏱ TC: <strong>{timeComplexity}</strong>
              </span>
            )}
            {spaceComplexity && (
              <span className={styles.complexityTagSc} title="Space Complexity">
                💾 SC: <strong>{spaceComplexity}</strong>
              </span>
            )}
          </div>
        </div>

        <div className={styles.codeBody}>
          <pre className={styles.codePre}>
            {codeLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = activeLine === lineNum;
              return (
                <div
                  key={lineNum}
                  className={`${styles.codeLine} ${
                    isActive ? styles.codeLineActive : ""
                  }`}
                >
                  <span className={styles.lineNumber}>{lineNum}</span>
                  <span className={styles.lineContent}>{line}</span>
                  {isActive && <span className={styles.activeIndicator}>◀</span>}
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* 2. Compact Live Intuition Card (Placed below Code, zero layout shift) */}
      <div className={`${styles.intuitionCard} ${styles[`status_${statusType}`]}`}>
        <div className={styles.intuitionHeader}>
          <div className={styles.intuitionTitle}>
            <span className={styles.bulbIcon}>💡</span>
            <span>Step Intuition</span>
          </div>
          {statusText && (
            <span className={`${styles.statusBadge} ${styles[`badge_${statusType}`]}`}>
              {statusText}
            </span>
          )}
        </div>

        {/* Compact Inline Variable Ribbon */}
        {variables && variables.length > 0 && (
          <div className={styles.variablesRibbon}>
            {variables.map((v, i) => (
              <span
                key={i}
                className={`${styles.varChip} ${
                  v.highlight ? styles.varChipHighlight : ""
                }`}
              >
                <span className={styles.varLabel}>{v.label}:</span>
                <strong className={styles.varValue}>{v.value}</strong>
              </span>
            ))}
          </div>
        )}

        {/* Intuition Callout Box */}
        <div className={styles.explanationBox}>
          <span className={styles.quoteBar} aria-hidden="true" />
          <p className={styles.explanationText}>{explanation}</p>
        </div>
      </div>
    </div>
  );
}
