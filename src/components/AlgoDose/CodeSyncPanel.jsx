import React from "react";
import styles from "./CodeSyncPanel.module.css";

export default function CodeSyncPanel({
  codeLines = [],
  activeLine = null,
  explanation = "",
  statusText = "",
  statusType = "info", // info | success | warning | danger
  timeComplexity = "",
  spaceComplexity = "",
}) {
  return (
    <div className={styles.panelContainer}>
      {/* Live Intuition Banner */}
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
        <p className={styles.explanationText}>{explanation}</p>
      </div>

      {/* Code Synchronization Block */}
      <div className={styles.codeCard}>
        <div className={styles.codeHeader}>
          <span className={styles.codeTitle}>Algorithm Logic</span>
          <div className={styles.complexities}>
            {timeComplexity && (
              <span className={styles.complexityTag}>
                ⏱ Time: <strong>{timeComplexity}</strong>
              </span>
            )}
            {spaceComplexity && (
              <span className={styles.complexityTag}>
                💾 Space: <strong>{spaceComplexity}</strong>
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
    </div>
  );
}
