import React from "react";
import Link from "@docusaurus/Link";
import interviewDays from "@site/src/data/interviewDays.json";
import styles from "./DocSeriesNav.module.css";

export default function DocSeriesNav({ permalink }) {
  if (!permalink) return null;

  // 1. CoreDose has its own custom CoreDoseNav in markdown. Return null for zero redundancy.
  if (permalink.startsWith("/coredose")) {
    return null;
  }

  // 2. 100 Days of Interview
  if (permalink.startsWith("/100-days")) {
    if (permalink === "/100-days" || permalink === "/100-days/") {
      return null;
    }

    const dayMatch = permalink.match(/day-(\d+)/i);
    if (!dayMatch) return null;

    const currentDay = parseInt(dayMatch[1], 10);
    const prevDay = currentDay > 1 ? interviewDays[String(currentDay - 1)] : null;
    const nextDay = currentDay < 64 ? interviewDays[String(currentDay + 1)] : null;

    return (
      <div className={styles.navWrapper}>
        <div className={styles.seriesHeader}>
          <span className={styles.seriesBadge}>🎯 100 Days of Interview</span>
          <span className={styles.seriesProgress}>Day {currentDay} of 64</span>
        </div>

        <div className={styles.buttonRow}>
          {prevDay ? (
            <Link
              to={`/100-days/${prevDay.slug}`}
              className={`${styles.navBtn} ${styles.prevBtn}`}
              title={prevDay.title}
            >
              <div className={styles.btnLabel}>← Previous Day</div>
              <div className={styles.btnTitle}>
                Day {currentDay - 1}: {prevDay.title}
              </div>
            </Link>
          ) : (
            <div className={styles.emptySlot} />
          )}

          {nextDay ? (
            <Link
              to={`/100-days/${nextDay.slug}`}
              className={`${styles.navBtn} ${styles.nextBtn}`}
              title={nextDay.title}
            >
              <div className={styles.btnLabel}>Next Day →</div>
              <div className={styles.btnTitle}>
                Day {currentDay + 1}: {nextDay.title}
              </div>
            </Link>
          ) : (
            <div className={styles.emptySlot} />
          )}
        </div>

        <div className={styles.hubReturnRow}>
          <Link to="/100-days" className={styles.hubReturnLink}>
            🗺️ View Complete 100 Days Interview Curriculum &amp; Questions
          </Link>
        </div>
      </div>
    );
  }

  // 3. CodeDose (DSA)
  if (permalink.startsWith("/coding")) {
    if (permalink === "/coding" || permalink === "/coding/") {
      return null;
    }

    return (
      <div className={styles.navWrapper}>
        <div className={styles.buttonRowSingle}>
          <Link to="/coding" className={styles.codingHubBtn}>
            <span>📚</span>
            <span>Browse All CodeDose (DSA) Topics</span>
          </Link>
          <Link to="/algodose" className={styles.algoDoseBtn}>
            <span>⚡</span>
            <span>Explore AlgoDose Interactive Visualizers</span>
          </Link>
        </div>
      </div>
    );
  }

  // 4. PYQs
  if (permalink.startsWith("/pyqs")) {
    if (permalink === "/pyqs" || permalink === "/pyqs/") {
      return null;
    }

    return (
      <div className={styles.navWrapper}>
        <div className={styles.hubReturnRow}>
          <Link to="/pyqs" className={styles.hubReturnLink}>
            🗺️ View Complete GATE CSE PYQs Index
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
