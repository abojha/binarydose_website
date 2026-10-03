import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';
import SearchBar from '../../Common/SearchBar';
import styles from './CourseCurriculum.module.css';

/**
 * CourseCurriculum Component
 * Pure module-first curriculum dashboard with real-time topic searching.
 * Flexible, timeless, and completely unbound by artificial phases or development tags.
 */
export default function CourseCurriculum({
  title,
  subtitle,
  modules = [],
  hideStats = false,
  hideSearch = false,
  searchPlaceholder = 'Search topics (e.g. paging, scheduling, semaphore)...',
}) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!modules || modules.length === 0) return null;

  const totalTopics = modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredModules = useMemo(() => {
    if (!trimmedQuery) return modules;

    return modules
      .map((mod) => {
        const titleMatch = mod.title?.toLowerCase().includes(trimmedQuery);
        const descMatch = mod.description?.toLowerCase().includes(trimmedQuery);
        const matchingTopics = (mod.topics || []).filter(
          (topic) =>
            topic.title?.toLowerCase().includes(trimmedQuery) ||
            topic.num?.toLowerCase().includes(trimmedQuery)
        );

        if (matchingTopics.length > 0) {
          return {
            ...mod,
            topics: matchingTopics,
          };
        } else if (titleMatch || descMatch) {
          return mod;
        }
        return null;
      })
      .filter(Boolean);
  }, [modules, trimmedQuery]);

  const totalFilteredTopics = useMemo(() => {
    return filteredModules.reduce((acc, m) => acc + (m.topics?.length || 0), 0);
  }, [filteredModules]);

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h2 className={styles.mainTitle}>{title}</h2>}
          {subtitle && <p className={styles.mainSubtitle}>{subtitle}</p>}
        </div>
      )}

      {/* Curriculum Metadata Strip */}
      {!hideStats && (
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{modules.length}</span>
            <span className={styles.statLabel}>Modules</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{totalTopics}</span>
            <span className={styles.statLabel}>Topics</span>
          </div>
        </div>
      )}

      {/* Universal Search Bar */}
      {!hideSearch && (
        <div className={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder={searchPlaceholder}
            maxWidth="560px"
            ariaLabel="Search curriculum topics"
          />
          {trimmedQuery && (
            <div className={styles.searchFeedback}>
              <span>
                Found <strong>{totalFilteredTopics}</strong> {totalFilteredTopics === 1 ? 'topic' : 'topics'} across{' '}
                <strong>{filteredModules.length}</strong> {filteredModules.length === 1 ? 'module' : 'modules'}
              </span>
              <button
                type="button"
                className={styles.resetSearchBtn}
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {filteredModules.length === 0 ? (
        <div className={styles.noResultsBox}>
          <div className={styles.noResultsIcon}>🔍</div>
          <h3 className={styles.noResultsTitle}>No topics matched &ldquo;{searchQuery}&rdquo;</h3>
          <p className={styles.noResultsText}>
            Try searching for broader keywords like <em>paging</em>, <em>scheduling</em>, <em>threads</em>, or <em>deadlock</em>.
          </p>
          <button
            type="button"
            className={styles.clearSearchBtn}
            onClick={() => setSearchQuery('')}
          >
            Show All Modules
          </button>
        </div>
      ) : (
        /* Modules Grid */
        <div className={styles.modulesGrid}>
          {filteredModules.map((module, mIdx) => {
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
      )}
    </div>
  );
}
