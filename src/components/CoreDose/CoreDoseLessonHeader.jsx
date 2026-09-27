import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import styles from "./CoreDoseLessonHeader.module.css";

const COURSE_MAP = {
  dbms: { id: "dbms", name: "DBMS", url: "/coredose/dbms" },
  os: { id: "os", name: "Operating Systems", url: "/coredose/os" },
  cn: { id: "cn", name: "Computer Networks", url: "/coredose/cn" },
  oops: { id: "oops", name: "OOPs", url: "/coredose/oops" },
  coa: { id: "coa", name: "COA", url: "/coredose/coa" },
  compiler: { id: "compiler", name: "Compiler Design", url: "/coredose/compiler" },
};

function resolveCourse(pathname, courseUrl) {
  const target = courseUrl || pathname || "";
  if (target.includes("/coredose/os")) return COURSE_MAP.os;
  if (target.includes("/coredose/cn")) return COURSE_MAP.cn;
  if (target.includes("/coredose/oops")) return COURSE_MAP.oops;
  if (target.includes("/coredose/coa")) return COURSE_MAP.coa;
  if (target.includes("/coredose/compiler")) return COURSE_MAP.compiler;
  return COURSE_MAP.dbms;
}

export default function CoreDoseLessonHeader({
  module,
  chapter,
  topic,
  part,
  readTime = "5 min read",
  relevance = "Semester Exams • GATE CSE • Technical Interviews",
  backUrl,
  backLabel,
  courseUrl,
}) {
  const initialCourse = resolveCourse("", courseUrl);

  const [displayReadTime, setDisplayReadTime] = useState(readTime || "5 min read");
  const [navConfig, setNavConfig] = useState({
    backUrl: backUrl || initialCourse.url,
    backLabel: backLabel || `Back to ${initialCourse.name} Roadmap`,
    isCourseIndex: false,
    moduleNumber: null,
    courseName: initialCourse.name,
    courseUrl: initialCourse.url,
  });

  useEffect(() => {
    try {
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      const currentCourse = resolveCourse(pathname, courseUrl);
      
      // Check if on course index (e.g. /coredose/dbms or /coredose/os)
      const isIndex = pathname.endsWith(currentCourse.url) || pathname.endsWith(currentCourse.url + "/");
      
      // Detect module from path (e.g. /chapter-06/ -> Module 6)
      const moduleMatch = pathname.match(/chapter-(\d+)/i);
      const modNum = moduleMatch ? `Module ${parseInt(moduleMatch[1], 10)}` : null;

      if (isIndex) {
        setNavConfig({
          backUrl: backUrl || "/coredose",
          backLabel: backLabel || "Back to CoreDose Hub",
          isCourseIndex: true,
          moduleNumber: null,
          courseName: currentCourse.name,
          courseUrl: currentCourse.url,
        });
      } else {
        setNavConfig({
          backUrl: backUrl || currentCourse.url,
          backLabel: backLabel || `Back to ${currentCourse.name} Roadmap`,
          isCourseIndex: false,
          moduleNumber: modNum,
          courseName: currentCourse.name,
          courseUrl: currentCourse.url,
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
  }, [backUrl, backLabel, courseUrl]);

  // Normalize module label to "Module XX"
  const rawLabel = module || chapter || navConfig.moduleNumber || "Module 01";
  const moduleLabel = rawLabel.replace(/^Chapter\s+/i, "Module ");
  
  // Normalize topic label to "Topic X.Y"
  let topicLabel = topic || part || "Topic 1.1";
  if (/^Lesson\s+/i.test(topicLabel)) {
    topicLabel = topicLabel.replace(/^Lesson\s+/i, "Topic ");
  } else if (/^\d+(\.\d+)?$/.test(topicLabel)) {
    topicLabel = `Topic ${topicLabel}`;
  }

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
            <span className={styles.crumbActive}>{navConfig.courseName}</span>
          ) : (
            <>
              <Link to={navConfig.courseUrl} className={styles.crumbLink}>{navConfig.courseName}</Link>
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
