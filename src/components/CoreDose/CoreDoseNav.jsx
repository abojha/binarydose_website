import React from "react";
import Link from "@docusaurus/Link";
import styles from "./CoreDoseNav.module.css";

export default function CoreDoseNav({ prev, next, courseUrl = "/coredose/dbms" }) {
  return (
    <div className={styles.navContainer}>
      <div className={styles.roadmapReturnRow}>
        <Link to={courseUrl} className={styles.roadmapReturnBtn}>
          <span className={styles.roadmapIcon}>🗺️</span>
          <span>View Complete DBMS Roadmap & Syllabus</span>
        </Link>
      </div>

      <div className={styles.navGrid}>
        {prev ? (
          <Link to={prev.url} className={styles.navCardPrev}>
            <span className={styles.directionLabel}>&larr; Previous Topic</span>
            <span className={styles.topicTitle}>{prev.title}</span>
          </Link>
        ) : (
          <Link to={courseUrl} className={styles.navCardPrev}>
            <span className={styles.directionLabel}>&larr; Course Syllabus</span>
            <span className={styles.topicTitle}>DBMS Master Index</span>
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
