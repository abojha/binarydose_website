import React from "react";
import Link from "@docusaurus/Link";
import styles from "./ComingSoonCard.module.css";

export default function ComingSoonCard({ engine }) {
  if (!engine) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.glowOrb} />

      <div className={styles.iconCircle}>
        <span>{engine.icon || "🛠️"}</span>
      </div>

      <div className={styles.badge}>
        <span>⚡ In Active Development</span>
      </div>

      <h2 className={styles.title}>{engine.name} Visualizer</h2>

      <p className={styles.desc}>
        {engine.description ||
          "We are actively crafting this interactive visualizer engine with memory-accurate pointer animations and real-time code synchronization."}
      </p>

      {/* Planned Patterns Roadmap */}
      {engine.plannedPatterns && engine.plannedPatterns.length > 0 && (
        <div className={styles.plannedSection}>
          <div className={styles.plannedHeader}>
            <span>📌 Planned Patterns for {engine.name}:</span>
          </div>
          <ul className={styles.patternList}>
            {engine.plannedPatterns.map((pat, idx) => (
              <li key={idx} className={styles.patternItem}>
                <span>✨</span>
                <span>{pat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CodeDose Action Button */}
      {engine.codeDoseLink && (
        <Link to={engine.codeDoseLink} className={styles.ctaBtn}>
          <span>📖 Study {engine.name} Notes on CodeDose</span>
          <span className={styles.arrow}>&rarr;</span>
        </Link>
      )}
    </div>
  );
}
