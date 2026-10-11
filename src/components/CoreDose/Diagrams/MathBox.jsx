import React from 'react';
import styles from './MathBox.module.css';

/**
 * MathBox
 * Code-block style highlighted container for mathematical equations,
 * theorems, formulas, and proofs in Markdown (.md / .mdx).
 *
 * Usage in Markdown:
 * <MathBox title="Theorem 1.3: The Consensus Theorem (SOP Form)">
 *
 * $$
 * AB + \bar{A}C + BC = AB + \bar{A}C
 * $$
 *
 * </MathBox>
 */
export default function MathBox({
  title,
  type = "theorem", // "theorem" | "proof" | "law" | "formula" | "definition"
  children,
}) {
  return (
    <div className={`${styles.box} ${styles[type] || styles.theorem}`}>
      {title && (
        <div className={styles.header}>
          <span className={styles.icon}>
            {type === "proof" ? "🔍" : type === "law" ? "⚡" : type === "definition" ? "📖" : "📐"}
          </span>
          <span className={styles.title}>{title}</span>
          <span className={styles.typeBadge}>{type}</span>
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
