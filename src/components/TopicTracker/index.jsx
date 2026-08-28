import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

export default function TopicTracker({ storageKey = "binarydose_dsa_tracker", totalTopics = 17 }) {
  const [completedCount, setCompletedCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedCount(parsed.length);
        }
      }
    } catch (e) {
      console.error("Failed to read progress from localStorage", e);
    }
  }, [storageKey]);

  if (!mounted) {
    return null;
  }

  const percent = Math.min(100, Math.round((completedCount / totalTopics) * 100));

  return (
    <div className={styles.trackerCard}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          <span>🎯</span> Your CodeDose Progress
        </h4>
        <span className={styles.statsText}>
          {completedCount} / {totalTopics} Topics Completed ({percent}%)
        </span>
      </div>
      <div className={styles.progressBarBg}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className={styles.motivationalText}>
        {percent === 100
          ? "🎉 Amazing! You've completed all topics in this track!"
          : percent > 50
          ? "🔥 Great momentum! Keep solving and revising."
          : "🚀 Small daily doses lead to massive mastery. Keep going!"}
      </div>
    </div>
  );
}
