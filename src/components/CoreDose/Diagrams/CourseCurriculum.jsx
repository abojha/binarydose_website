import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CourseCurriculum.module.css';

/**
 * CourseCurriculum Component
 * Pure module-first curriculum dashboard.
 * Flexible, timeless, and completely unbound by artificial phases or development tags.
 */
export default function CourseCurriculum({
  title,
  subtitle,
  modules = [],
}) {
  if (!modules || modules.length === 0) return null;

  const totalTopics = modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0);

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h2 className={styles.mainTitle}>{title}</h2>}
          {subtitle && <p className={styles.mainSubtitle}>{subtitle}</p>}
        </div>
      )}

      {/* Timeless Curriculum Metadata Strip */}
      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{modules.length}</span>
          <span className={styles.statLabel}>Modules</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalTopics}</span>
          <span className={styles.statLabel}>Comprehensive Topics</span>
        </div>
      </div>

      {/* Modules 2-Column Grid */}
      <div className={styles.modulesGrid}>
        {modules.map((module, mIdx) => {
          const colorClass = styles[`color${module.color ? module.color.charAt(0).toUpperCase() + module.color.slice(1) : 'Blue'}`] || styles.colorBlue;

          return (
            <div key={module.num || mIdx} className={`${styles.moduleCard} ${colorClass}`}>
              {/* Module Header */}
              <div className={styles.moduleHeader}>
                <div className={styles.moduleBadgeRow}>
                  <span className={styles.moduleBadge}>
                    Module {module.num || String(mIdx + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.topicCountBadge}>
                    {module.topics?.length || 0} Topics
                  </span>
                </div>
                <div className={styles.moduleTitleRow}>
                  {module.icon && <span className={styles.moduleIcon}>{module.icon}</span>}
                  <h3 className={styles.moduleTitle}>{module.title}</h3>
                </div>
                {module.description && (
                  <p className={styles.moduleDesc}>{module.description}</p>
                )}
              </div>

              {/* Topics List */}
              <div className={styles.topicsList}>
                {module.topics?.map((topic, tIdx) => {
                  const isLink = Boolean(topic.url);

                  if (isLink) {
                    return (
                      <Link
                        key={topic.num || tIdx}
                        to={topic.url}
                        className={`${styles.topicRow} ${styles.topicRowLink}`}
                      >
                        <span className={styles.topicNum}>{topic.num}</span>
                        <span className={styles.topicTitle}>{topic.title}</span>
                        <span className={styles.topicArrow}>→</span>
                      </Link>
                    );
                  }

                  return (
                    <div key={topic.num || tIdx} className={styles.topicRow}>
                      <span className={styles.topicNum}>{topic.num}</span>
                      <span className={styles.topicTitle}>{topic.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
