import React from 'react';
import styles from './ProcessFlow.module.css';

/**
 * ProcessFlow: Sequential execution timeline and workflow visualization.
 * Ideal for Boot Sequence, Syscall Dispatch, Context Switch, and Protocol Handshakes.
 */
export default function ProcessFlow({ title, subtitle, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.timeline}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const num = step.number || index + 1;

          return (
            <div key={step.title || index} className={styles.stepItem}>
              <div className={styles.nodeColumn}>
                <div className={styles.stepNumber}>{num}</div>
                {!isLast && <div className={styles.connectorLine} />}
              </div>

              <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  {step.tag && <span className={styles.tag}>{step.tag}</span>}
                </div>

                {step.description && (
                  <p className={styles.stepDesc}>{step.description}</p>
                )}

                {step.code && (
                  <div className={styles.codeSnippet}>
                    <code>{step.code}</code>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
