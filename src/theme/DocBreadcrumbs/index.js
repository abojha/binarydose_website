import React from "react";
import Link from "@docusaurus/Link";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import styles from "./DocBreadcrumbs.module.css";

const CODING_TOPICS = {
  arrays: "Arrays",
  "binary-search": "Binary Search",
  "binary-search-trees": "Binary Search Trees",
  "binary-trees": "Binary Trees",
  "bit-manupilation": "Bit Manipulation",
  "dynamic-programming": "Dynamic Programming",
  graphs: "Graphs",
  "greedy-algorithms": "Greedy Algorithms",
  heaps: "Heaps",
  "linked-list": "Linked List",
  recursion: "Recursion",
  sorting: "Sorting",
  "stack-queue": "Stack & Queue",
  strings: "Strings",
  tries: "Tries",
  "two-pointers-sliding-window-problems": "Two Pointers & Sliding Window",
};

export default function DocBreadcrumbs() {
  const { metadata } = useDoc();
  const permalink = metadata?.permalink || "";

  // 1. CoreDose has its own specialized CoreDoseLessonHeader with custom badges and back nav.
  // We return null here to maintain zero redundancy and clean layout.
  if (permalink.startsWith("/coredose")) {
    return null;
  }

  // 2. 100 Days Interview
  if (permalink.startsWith("/100-days")) {
    if (permalink === "/100-days" || permalink === "/100-days/") {
      return null; // Index page
    }

    const dayMatch = permalink.match(/day-(\d+)/i);
    const dayLabel = dayMatch ? `Day ${parseInt(dayMatch[1], 10)}` : "Interview Question";

    return (
      <div className={styles.navContainer}>
        <Link to="/100-days" className={styles.backButton}>
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className={styles.backButtonText}>Back to 100 Days Series</span>
        </Link>

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.crumbLink}>Home</Link>
          <span className={styles.crumbSep}>/</span>
          <Link to="/100-days" className={styles.crumbLink}>100 Days Interview</Link>
          <span className={styles.crumbSep}>/</span>
          <span className={styles.crumbActive}>{dayLabel}</span>
        </nav>
      </div>
    );
  }

  // 3. CodeDose (DSA)
  if (permalink.startsWith("/coding")) {
    if (permalink === "/coding" || permalink === "/coding/") {
      return null; // Topic Index page
    }

    // Example permalink: /coding/arrays/reverse-an-array
    const parts = permalink.replace(/^\/coding\/?/, "").split("/").filter(Boolean);
    const topicSlug = parts[0] || "";
    const topicName = CODING_TOPICS[topicSlug] || topicSlug.replace(/-/g, " ");

    return (
      <div className={styles.navContainer}>
        <Link to="/coding" className={styles.backButton}>
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className={styles.backButtonText}>Back to CodeDose (DSA)</span>
        </Link>

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.crumbLink}>Home</Link>
          <span className={styles.crumbSep}>/</span>
          <Link to="/coding" className={styles.crumbLink}>CodeDose (DSA)</Link>
          {topicName && (
            <>
              <span className={styles.crumbSep}>/</span>
              <span className={styles.crumbActive}>{topicName}</span>
            </>
          )}
        </nav>
      </div>
    );
  }

  // 4. PYQs
  if (permalink.startsWith("/pyqs")) {
    if (permalink === "/pyqs" || permalink === "/pyqs/") {
      return null;
    }

    return (
      <div className={styles.navContainer}>
        <Link to="/pyqs" className={styles.backButton}>
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className={styles.backButtonText}>Back to GATE PYQs</span>
        </Link>

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.crumbLink}>Home</Link>
          <span className={styles.crumbSep}>/</span>
          <Link to="/pyqs" className={styles.crumbLink}>GATE PYQs</Link>
          <span className={styles.crumbSep}>/</span>
          <span className={styles.crumbActive}>Question</span>
        </nav>
      </div>
    );
  }

  return null;
}
