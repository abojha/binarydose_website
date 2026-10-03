import React from "react";
import Link from "@docusaurus/Link";
import styles from "./CoreDoseNav.module.css";

const COURSE_MAP = {
  dbms: { name: "DBMS", url: "/coredose/dbms" },
  os: { name: "Operating Systems", url: "/coredose/os" },
  cn: { name: "Computer Networks", url: "/coredose/cn" },
  oops: { name: "OOPs", url: "/coredose/oops" },
  coa: { name: "COA", url: "/coredose/coa" },
  compiler: { name: "Compiler Design", url: "/coredose/compiler" },
};

function getCourse(courseUrl) {
  const target = courseUrl || "";
  if (target.includes("/coredose/os")) return COURSE_MAP.os;
  if (target.includes("/coredose/cn")) return COURSE_MAP.cn;
  if (target.includes("/coredose/oops")) return COURSE_MAP.oops;
  if (target.includes("/coredose/coa")) return COURSE_MAP.coa;
  if (target.includes("/coredose/compiler")) return COURSE_MAP.compiler;
  return COURSE_MAP.dbms;
}

export default function CoreDoseNav({ prev, previous, next, courseUrl = "/coredose/dbms" }) {
  const course = getCourse(courseUrl);
  const prevTopic = prev || previous;

  return (
    <div className={styles.navContainer}>
      <div className={styles.roadmapReturnRow}>
        <Link to={courseUrl} className={styles.roadmapReturnBtn}>
          <span className={styles.roadmapIcon}>🗺️</span>
          <span>View Complete {course.name} Roadmap & Syllabus</span>
        </Link>
      </div>

      <div className={styles.navGrid}>
        {prevTopic ? (
          <Link to={prevTopic.url} className={styles.navCardPrev}>
            <span className={styles.directionLabel}>&larr; Previous Topic</span>
            <span className={styles.topicTitle}>{prevTopic.title}</span>
          </Link>
        ) : (
          <Link to={courseUrl} className={styles.navCardPrev}>
            <span className={styles.directionLabel}>&larr; Course Syllabus</span>
            <span className={styles.topicTitle}>{course.name} Master Index</span>
          </Link>
        )}

        {next ? (
          <Link to={next.url} className={styles.navCardNext}>
            <span className={styles.directionLabel}>Next Topic &rarr;</span>
            <span className={styles.topicTitle}>{next.title}</span>
          </Link>
        ) : (
          <Link to={courseUrl} className={styles.navCardNext}>
            <span className={styles.directionLabel}>Course Complete &rarr;</span>
            <span className={styles.topicTitle}>Back to Syllabus</span>
          </Link>
        )}
      </div>
    </div>
  );
}
