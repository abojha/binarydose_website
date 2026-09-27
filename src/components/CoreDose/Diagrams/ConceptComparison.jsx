import React from 'react';
import styles from './ConceptComparison.module.css';

/**
 * ConceptComparison: High-impact side-by-side or stacked card layout for
 * comparative architecture patterns, goals, and dual design choices.
 */
export default function ConceptComparison({ title, subtitle, concepts = [] }) {
  if (!concepts || concepts.length === 0) return null;

  const themeMap = {
    blue: styles.blueTheme,
    amber: styles.amberTheme,
    emerald: styles.emeraldTheme,
    purple: styles.purpleTheme,
  };

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.grid}>
        {concepts.map((concept, index) => {
          const themeClass = themeMap[concept.color] || styles.blueTheme;

          return (
            <div key={concept.title || index} className={`${styles.column} ${themeClass}`}>
              <div className={styles.colHeader}>
                <div>
                  {concept.badge && <span className={styles.badge}>{concept.badge}</span>}
                  <h4 className={styles.colTitle}>{concept.title}</h4>
                </div>
                {concept.icon && <span className={styles.icon}>{concept.icon}</span>}
              </div>

              {concept.domain && (
                <div className={styles.domainBlock}>
                  <span className={styles.domainLabel}>Dominant Architecture / Domain</span>
                  <span className={styles.domainValue}>{concept.domain}</span>
                </div>
              )}

              {concept.points && concept.points.length > 0 && (
                <ul className={styles.pointsList}>
                  {concept.points.map((pt, pIdx) => (
                    <li key={pIdx} className={styles.pointItem}>
                      <span className={styles.bulletDot}>•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {concept.quote && (
                <div className={styles.philosophyQuote}>
                  "{concept.quote}"
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
