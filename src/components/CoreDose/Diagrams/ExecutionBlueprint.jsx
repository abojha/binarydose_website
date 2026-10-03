import React from 'react';
import styles from './ExecutionBlueprint.module.css';

/**
 * ExecutionBlueprint: Visual step-by-step roundtrip execution flow across system layers.
 * Shows actors, dispatch direction, syscall trap, and hardware return.
 */
export default function ExecutionBlueprint({ title, subtitle, actors = [], steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      {actors && actors.length > 0 && (
        <div className={styles.actorsBar}>
          {actors.map((actor, idx) => (
            <div key={idx} className={styles.actorChip}>
              {actor.icon && <span>{actor.icon}</span>}
              <span>{actor.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.stepsList}>
        {steps.map((s, index) => {
          const num = s.num || index + 1;
          const isReturn = s.isReturn || false;

          return (
            <div
              key={index}
              className={`${styles.stepCard} ${isReturn ? styles.returnCard : ''}`}
            >
              <div className={styles.stepNum}>{num}</div>
              <div className={styles.stepBody}>
                <div className={styles.stepHeaderRow}>
                  <div className={styles.actorRoute}>
                    <span>{s.from}</span>
                    <span className={styles.routeArrow}>→</span>
                    <span>{s.to}</span>
                  </div>
                  {s.phase && <span className={styles.phaseBadge}>{s.phase}</span>}
                </div>

                <p className={styles.stepAction}>{s.action}</p>

                {s.code && <code className={styles.stepCode}>{s.code}</code>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
