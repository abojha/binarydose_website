import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import styles from "./CoreDoseLessonHeader.module.css";

export default function CoreDoseLessonHeader({
  module,
  chapter,
  topic,
  part,
  readTime = "5 min read",
  relevance = "Semester Exams • GATE CSE • Technical Interviews",
  backUrl,
  backLabel,
}) {
  const [displayReadTime, setDisplayReadTime] = useState(readTime || "5 min read");
  const [navConfig, setNavConfig] = useState({
    backUrl: backUrl || "/coredose/dbms",
    backLabel: backLabel || "Back to DBMS Roadmap",
    isCourseIndex: false,
    moduleNumber: null,
  });

  useEffect(() => {
    try {
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      
      // Check if on course index (e.g. /coredose/dbms)
      const isIndex = pathname.endsWith("/coredose/dbms") || pathname.endsWith("/coredose/dbms/");
      
      // Detect module from path (e.g. /chapter-06/ -> Module 6)
      const moduleMatch = pathname.match(/chapter-(\d+)/i);
      const modNum = moduleMatch ? `Module ${parseInt(moduleMatch[1], 10)}` : null;

      if (isIndex) {
        setNavConfig({
          backUrl: backUrl || "/coredose",
          backLabel: backLabel || "Back to CoreDose Hub",
          isCourseIndex: true,
          moduleNumber: null,
        });
      } else {
        setNavConfig({
          backUrl: backUrl || "/coredose/dbms",
          backLabel: backLabel || "Back to DBMS Roadmap",
          isCourseIndex: false,
          moduleNumber: modNum,
        });
      }

      // Read time calculation
      const article = document.querySelector(".theme-doc-markdown, .markdown, article");
      if (article) {
        const text = article.innerText || "";
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const visualBlocks = article.querySelectorAll(".mermaid, table, pre").length;
        const minutes = Math.max(1, Math.round(words / 200 + visualBlocks * 0.4));
        setDisplayReadTime(`${minutes} min read`);
      }
    } catch (e) {
      // Fallback gracefully
    }
  }, [backUrl, backLabel]);

  // Normalize module label to "Module XX"
  const rawLabel = module || chapter || navConfig.moduleNumber || "Module 01";
  const moduleLabel = rawLabel.replace(/^Chapter\s+/i, "Module ");
  const topicLabel = topic || part || "Topic 1.1";

  return (
    <div className={styles.headerContainer}>
      {/* Top Back Button & Breadcrumbs Bar */}
      <div className={styles.navBar}>
        <Link to={navConfig.backUrl} className={styles.backButton}>
          <svg
            className={styles.backArrow}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className={styles.backButtonText}>{navConfig.backLabel}</span>
        </Link>

        <div className={styles.breadcrumbs}>
          <Link to="/coredose" className={styles.crumbLink}>CoreDose</Link>
          <span className={styles.crumbSep}>/</span>
          {navConfig.isCourseIndex ? (
            <span className={styles.crumbActive}>DBMS</span>
          ) : (
            <>
              <Link to="/coredose/dbms" className={styles.crumbLink}>DBMS</Link>
              {navConfig.moduleNumber && (
                <>
                  <span className={styles.crumbSep}>/</span>
                  <span className={styles.crumbActive}>{navConfig.moduleNumber}</span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Meta Badges */}
      <div className={styles.metaRow}>
        <span className={styles.moduleBadge}>
          <span className={styles.moduleIcon}>📚</span>
          {moduleLabel}
        </span>
        <span className={styles.topicBadge}>{topicLabel}</span>
        <span className={styles.readTimeBadge}>
          <span className={styles.clockIcon}>⏱️</span>
          {displayReadTime}
        </span>
      </div>

      {relevance && (
        <div className={styles.relevanceBox}>
          <span className={styles.relevanceIcon}>🎯</span>
          <strong className={styles.relevanceLabel}>High-Yield For:</strong>
          <span className={styles.relevanceText}>{relevance}</span>
        </div>
      )}
    </div>
  );
}
