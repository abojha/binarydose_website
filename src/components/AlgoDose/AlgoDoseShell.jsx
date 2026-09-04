import React, { useState } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import BinarySearchVisualizer from "./algorithms/BinarySearchVisualizer";
import TwoPointersVisualizer from "./algorithms/TwoPointersVisualizer";
import SortingVisualizer from "./algorithms/SortingVisualizer";
import styles from "./AlgoDoseShell.module.css";

const CATEGORIES = [
  {
    id: "searching",
    name: "Binary Search",
    icon: "🔍",
    badge: "O(log N)",
    description: "Search space halving and pointer convergence",
    component: BinarySearchVisualizer,
    codeDoseLink: "/coding/binary-search",
  },
  {
    id: "two_pointers",
    name: "Two Pointers & Sliding Window",
    icon: "↔️",
    badge: "O(N)",
    description: "Two Sum pairs and bounded subarray sliding windows",
    component: TwoPointersVisualizer,
    codeDoseLink: "/coding/two-pointers-sliding-window-problems",
  },
  {
    id: "sorting",
    name: "Sorting Playground",
    icon: "📊",
    badge: "O(N²)",
    description: "Bubble Sort and Selection Sort step-by-step swaps",
    component: SortingVisualizer,
    codeDoseLink: "/coding/sorting",
  },
];

export default function AlgoDoseShell() {
  const [activeCategoryId, setActiveCategoryId] = useState("searching");

  const activeCategory =
    CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];
  const ActiveComponent = activeCategory.component;

  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <header className={styles.heroHeader}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>⚡</span>
          <span className={styles.badgeText}>Interactive Algorithm Lab</span>
        </div>

        <Heading as="h1" className={styles.title}>
          AlgoDose <span className={styles.titleGradient}>Visualizer</span>
        </Heading>

        <p className={styles.subtitle}>
          Gain crystal-clear visual intuition for core Computer Science algorithms. Step
          through executions, watch pointers move in real-time, and synchronize
          line-by-line code logic.
        </p>
      </header>

      {/* Main Algorithm Switcher Navigation */}
      <nav className={styles.navBar} aria-label="Algorithm Categories">
        <div className={styles.tabList}>
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                className={`${styles.tabButton} ${
                  isActive ? styles.tabButtonActive : ""
                }`}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                <span className={styles.tabIcon}>{cat.icon}</span>
                <span className={styles.tabName}>{cat.name}</span>
                <span className={styles.tabBadge}>{cat.badge}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Visualizer Canvas Container */}
      <main className={styles.mainCanvas}>
        <div className={styles.canvasHeader}>
          <div className={styles.canvasTitleGroup}>
            <span className={styles.activeIcon}>{activeCategory.icon}</span>
            <div>
              <h2 className={styles.activeTitle}>{activeCategory.name}</h2>
              <p className={styles.activeDesc}>{activeCategory.description}</p>
            </div>
          </div>

          {activeCategory.codeDoseLink && (
            <Link
              to={activeCategory.codeDoseLink}
              className={styles.docLink}
              title="Read complete theory and problems on CodeDose"
            >
              📖 CodeDose Theory &rarr;
            </Link>
          )}
        </div>

        {/* Render Active Algorithm */}
        <ActiveComponent />
      </main>

      {/* Bottom Info Bar / CodeDose Connection */}
      <footer className={styles.footerNote}>
        <div className={styles.noteContent}>
          <span className={styles.noteIcon}>💡</span>
          <div>
            <strong>Interactive Pro-Tip:</strong> Use the <strong>⏮ Prev</strong> and{" "}
            <strong>⏭ Next</strong> buttons to step through line-by-line at your own
            pace, or enter your own custom array to test edge cases!
          </div>
        </div>
      </footer>
    </div>
  );
}
