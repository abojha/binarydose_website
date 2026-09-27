import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CurriculumRoadmap.module.css';

/**
 * CurriculumRoadmap Component
 * Modern, responsive multi-phase curriculum roadmap for course landing pages.
 * Replaces static Mermaid roadmaps with interactive, accessible phase cards and module links.
 */
export default function CurriculumRoadmap({
  title = "Curriculum Roadmap",
  subtitle = "Progressive learning path from foundations to production mastery",
  phases = [],
}) {
  if (!phases || phases.length === 0) return null;

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.phasesGrid}>
        {phases.map((phase, idx) => {
          const colorClass = styles[`color${phase.color ? phase.color.charAt(0).toUpperCase() + phase.color.slice(1) : 'Blue'}`] || styles.colorBlue;
          const isLast = idx === phases.length - 1;

          return (
            <div key={phase.phase || idx} className={`${styles.phaseCard} ${colorClass}`}>
              <div className={styles.cardTop}>
                <div className={styles.phaseMetaRow}>
                  <span className={styles.phaseBadge}>{phase.phase || `Phase ${idx + 1}`}</span>
                  <span className={styles.stepIndicator}>Step {idx + 1}/{phases.length}</span>
                </div>
                <div className={styles.titleGroup}>
                  {phase.icon && <span className={styles.phaseIcon}>{phase.icon}</span>}
                  <h4 className={styles.phaseTitle}>{phase.title}</h4>
                </div>
                {phase.description && <p className={styles.phaseDesc}>{phase.description}</p>}
              </div>

              <div className={styles.modulesList}>
                {phase.modules?.map((mod, mIdx) => {
                  const content = (
                    <>
                      <span className={styles.modNum}>M{mod.num || String(mIdx + 1).padStart(2, '0')}</span>
                      <span className={styles.modTitle}>{mod.title}</span>
                    </>
                  );

                  if (mod.url) {
                    return (
                      <Link key={mod.num || mIdx} to={mod.url} className={`${styles.moduleItem} ${styles.moduleLink}`}>
                        {content}
                        <span className={styles.linkArrow}>↗</span>
                      </Link>
                    );
                  }

                  return (
                    <div key={mod.num || mIdx} className={styles.moduleItem}>
                      {content}
                    </div>
                  );
                })}
              </div>

              {!isLast && phase.connectorLabel && (
                <div className={styles.cardFooter}>
                  <span className={styles.footerLabel}>Next: {phase.connectorLabel}</span>
                  <span className={styles.footerArrow}>→</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
