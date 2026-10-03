import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import BackNav from "../Common/BackNav";
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
    backLabel: backLabel || `Back to ${initialCourse.name} Notes`,
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
      
      // Detect module from path (e.g. /chapter-06/ -> Module 06)
      const moduleMatch = pathname.match(/chapter-(\d+)/i);
      const modNum = moduleMatch ? `Module ${String(moduleMatch[1]).padStart(2, "0")}` : null;

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
          backLabel: backLabel || `Back to ${currentCourse.name} Notes`,
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

  const breadcrumbs = [
    { label: "CoreDose", url: "/coredose" },
    ...(navConfig.isCourseIndex
      ? [{ label: navConfig.courseName }]
      : [
          { label: navConfig.courseName, url: navConfig.courseUrl },
          ...(navConfig.moduleNumber ? [{ label: navConfig.moduleNumber }] : []),
        ]),
  ];

  return (
    <div className={styles.headerContainer}>
      {/* Top Back Button & Breadcrumbs Bar */}
      <BackNav
        backUrl={navConfig.backUrl}
        backLabel={navConfig.backLabel}
        breadcrumbs={breadcrumbs}
        className={styles.lessonBackNav}
      />

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
