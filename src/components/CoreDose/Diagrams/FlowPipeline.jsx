import React from 'react';
import styles from './FlowPipeline.module.css';

/**
 * FlowPipeline: Modern horizontal or vertically-stacking node pipeline.
 * Perfect for linear analogies (Driver -> Controls -> Engine) and multi-tier perspective flows.
 */
export default function FlowPipeline({ title, subtitle, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const themeMap = {
    purple: styles.purpleTheme,
    blue: styles.blueTheme,
    amber: styles.amberTheme,
    emerald: styles.emeraldTheme,
    cyan: styles.cyanTheme,
  };

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.pipeline}>
        {steps.map((step, index) => {
          const themeClass = themeMap[step.color] || styles.blueTheme;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.title || index}>
              <div className={`${styles.nodeCard} ${themeClass}`}>
                {step.icon && <div className={styles.nodeIcon}>{step.icon}</div>}
                {step.role && <span className={styles.nodeRole}>{step.role}</span>}
                <h4 className={styles.nodeTitle}>{step.title}</h4>
                {step.description && <p className={styles.nodeDesc}>{step.description}</p>}
              </div>

              {!isLast && (
                <div className={styles.connector}>
                  <div className={styles.arrowPill}>→</div>
                  {step.actionText && (
                    <span className={styles.connectorText}>{step.actionText}</span>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
