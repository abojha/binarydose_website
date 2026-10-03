import React from 'react';
import styles from './SubsystemGrid.module.css';

/**
 * SubsystemGrid: Responsive multi-card matrix for operating system subsystems,
 * architectural modules, and database components.
 */
export default function SubsystemGrid({ title, subtitle, items = [] }) {
  if (!items || items.length === 0) return null;

  const themeMap = {
    blue: styles.blueTheme,
    cyan: styles.cyanTheme,
    green: styles.greenTheme,
    amber: styles.amberTheme,
    purple: styles.purpleTheme,
    rose: styles.roseTheme,
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
        {items.map((item, index) => {
          const themeClass = themeMap[item.color] || styles.blueTheme;

          return (
            <div key={item.title || index} className={`${styles.card} ${themeClass}`}>
              <div className={styles.cardHeader}>
                {item.icon && <div className={styles.iconWrapper}>{item.icon}</div>}
                <div className={styles.cardTitleBlock}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  {item.tag && <span className={styles.cardTag}>{item.tag}</span>}
                </div>
              </div>

              {item.points && item.points.length > 0 && (
                <ul className={styles.bodyList}>
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              )}

              {item.syscalls && item.syscalls.length > 0 && (
                <div className={styles.footer}>
                  <span className={styles.footerLabel}>Key Abstractions / Calls</span>
                  <div className={styles.callRow}>
                    {item.syscalls.map((call, cIdx) => (
                      <code key={cIdx} className={styles.codeChip}>
                        {call}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
