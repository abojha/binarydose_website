import React, { useState, useMemo, useCallback } from 'react';
import Link from '@docusaurus/Link';
import SearchBar from '../../Common/SearchBar';
import styles from './CourseCurriculum.module.css';

/**
 * Normalizes text to lowercase alphanumeric string for resilient matching.
 */
function normalizeWord(s) {
  return s ? s.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
}

/**
 * Robust matching helper for topic titles, descriptions, and numbers.
 * Supports exact substring, singular/plural stemming, and token matching.
 */
function matchesQuery(text, query) {
  if (!text || !query) return false;
  const tLower = text.toLowerCase();
  const qLower = query.toLowerCase().trim();

  // 1. Exact substring match
  if (tLower.includes(qLower)) return true;

  // 2. Singular/Plural stemming for trailing 's'
  const cleanQ = qLower.replace(/s$/, '');
  if (cleanQ.length >= 3 && tLower.includes(cleanQ)) return true;

  // 3. Multi-word or symbol-separated tokens (e.g. "Adders & Subtractors", "K-Maps", "B+ Trees")
  const tokens = qLower
    .split(/[\s&/(),-]+/)
    .map((w) => w.replace(/s$/, ''))
    .filter((w) => w.length >= 3);

  if (tokens.length > 0) {
    const tNorm = normalizeWord(text);
    return tokens.some((tok) => tLower.includes(tok) || tNorm.includes(tok));
  }

  return false;
}

/**
 * CourseCurriculum Component
 * Pure module-first curriculum dashboard with dynamic tag filtering and real-time search.
 * Flexible, timeless, and completely unbound by artificial phases or development tags.
 */
export default function CourseCurriculum({
  title,
  subtitle,
  modules = [],
  tags = [],
  hideStats = false,
  hideSearch = false,
  searchPlaceholder = null,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');

  if (!modules || modules.length === 0) return null;

  const totalTopics = modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Dynamic placeholder based on provided course tags
  const dynamicPlaceholder = useMemo(() => {
    if (searchPlaceholder) return searchPlaceholder;
    if (tags && tags.length > 0) {
      const examples = tags.slice(0, 3).join(', ');
      return `Search topics (e.g. ${examples})...`;
    }
    return 'Search topics across all modules...';
  }, [searchPlaceholder, tags]);

  // Handle clicking a tag pill: toggles active tag filter
  const handleTagClick = useCallback((tag) => {
    if (activeTag.toLowerCase() === tag.toLowerCase() || searchQuery.trim().toLowerCase() === tag.toLowerCase()) {
      setActiveTag('');
      setSearchQuery('');
    } else {
      setActiveTag(tag);
      setSearchQuery(tag);
    }
  }, [activeTag, searchQuery]);

  // Handle typing in the search input
  const handleSearchChange = useCallback((val) => {
    setSearchQuery(val);
    const matchedTag = (tags || []).find((t) => t.toLowerCase() === val.trim().toLowerCase());
    setActiveTag(matchedTag || '');
  }, [tags]);

  // Clear search and active tag
  const handleClear = useCallback(() => {
    setSearchQuery('');
    setActiveTag('');
  }, []);

  const filteredModules = useMemo(() => {
    if (!trimmedQuery) return modules;

    return modules
      .map((mod) => {
        const titleMatch = matchesQuery(mod.title, trimmedQuery);
        const descMatch = matchesQuery(mod.description, trimmedQuery);
        const numMatch = mod.num && mod.num.toLowerCase().includes(trimmedQuery);
        const matchingTopics = (mod.topics || []).filter(
          (topic) =>
            matchesQuery(topic.title, trimmedQuery) ||
            (topic.num && topic.num.toLowerCase().includes(trimmedQuery))
        );

        if (matchingTopics.length > 0) {
          return {
            ...mod,
            topics: matchingTopics,
          };
        } else if (titleMatch || descMatch || numMatch) {
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

      {/* Universal Search Bar & Dynamic Tag Filters */}
      {!hideSearch && (
        <div className={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClear}
            placeholder={dynamicPlaceholder}
            maxWidth="600px"
            ariaLabel="Search curriculum topics"
          />

          {/* Dynamic Tag Pills */}
          {tags && tags.length > 0 && (
            <div className={styles.tagPillsWrapper} aria-label="Course topic tags">
              <span className={styles.tagPillsLabel}>Popular Topics:</span>
              <div className={styles.tagPillsRow}>
                {tags.map((tag) => {
                  const isSelected =
                    activeTag.toLowerCase() === tag.toLowerCase() ||
                    searchQuery.trim().toLowerCase() === tag.toLowerCase();

                  return (
                    <button
                      key={tag}
                      type="button"
                      className={`${styles.tagPill} ${isSelected ? styles.tagPillActive : ''}`}
                      onClick={() => handleTagClick(tag)}
                      aria-pressed={isSelected}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {trimmedQuery && (
            <div className={styles.searchFeedback}>
              <span>
                Found <strong>{totalFilteredTopics}</strong> {totalFilteredTopics === 1 ? 'topic' : 'topics'} across{' '}
                <strong>{filteredModules.length}</strong> {filteredModules.length === 1 ? 'module' : 'modules'}
              </span>
              <button
                type="button"
                className={styles.resetSearchBtn}
                onClick={handleClear}
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
            {tags && tags.length > 0 ? (
              <>Try selecting one of the popular topics below, or clearing your search filter.</>
            ) : (
              <>Try searching for broader keywords or clearing your search filter.</>
            )}
          </p>

          {tags && tags.length > 0 && (
            <div className={styles.emptyStateTagsRow}>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={styles.tagPill}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            className={styles.clearSearchBtn}
            onClick={handleClear}
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
