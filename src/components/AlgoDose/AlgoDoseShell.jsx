import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import { ALGO_CATALOG, findAlgorithmById } from "./algoCatalog";
import BinarySearchVisualizer from "./algorithms/BinarySearchVisualizer";
import TwoPointersVisualizer from "./algorithms/TwoPointersVisualizer";
import SortingVisualizer from "./algorithms/SortingVisualizer";
import styles from "./AlgoDoseShell.module.css";

const COMPONENT_MAP = {
  searching: BinarySearchVisualizer,
  two_pointers: TwoPointersVisualizer,
  sorting: SortingVisualizer,
};

export default function AlgoDoseShell() {
  const [activeCategoryId, setActiveCategoryId] = useState("searching");
  const [activeAlgorithmId, setActiveAlgorithmId] = useState("binary_search");

  // Read URL query parameter ?algo=... on mount or popstate
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryAlgo = params.get("algo");
      if (queryAlgo) {
        const { category, algorithm } = findAlgorithmById(queryAlgo);
        if (category && algorithm) {
          setActiveCategoryId(category.categoryId);
          setActiveAlgorithmId(algorithm.id);
        }
      }
    }
  }, []);

  const currentCategory =
    ALGO_CATALOG.find((c) => c.categoryId === activeCategoryId) || ALGO_CATALOG[0];

  const currentAlgorithm =
    currentCategory.algorithms.find((a) => a.id === activeAlgorithmId) ||
    currentCategory.algorithms[0];

  const ActiveComponent = COMPONENT_MAP[activeCategoryId] || BinarySearchVisualizer;

  const handleCategoryChange = (newCatId) => {
    setActiveCategoryId(newCatId);
    const cat = ALGO_CATALOG.find((c) => c.categoryId === newCatId);
    if (cat && cat.algorithms.length > 0) {
      setActiveAlgorithmId(cat.algorithms[0].id);
      // Update URL query param cleanly without reload
      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState(
          {},
          "",
          `${window.location.pathname}?algo=${cat.algorithms[0].id}`
        );
      }
    }
  };

  const handleAlgorithmChange = (newAlgoId) => {
    setActiveAlgorithmId(newAlgoId);
    if (typeof window !== "undefined" && window.history?.pushState) {
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?algo=${newAlgoId}`
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Hero Header Section */}
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

      {/* Option A: Top Connected Dropdown Selector Bar */}
      <div className={styles.selectorBar}>
        <div className={styles.dropdownsContainer}>
          {/* Category Dropdown */}
          <div className={styles.selectGroup}>
            <label htmlFor="algo-topic-select" className={styles.selectLabel}>
              Topic:
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="algo-topic-select"
                className={styles.styledSelect}
                value={activeCategoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {ALGO_CATALOG.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryIcon} {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Algorithm / Problem Dropdown */}
          <div className={styles.selectGroup}>
            <label htmlFor="algo-problem-select" className={styles.selectLabel}>
              Problem:
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="algo-problem-select"
                className={styles.styledSelect}
                value={activeAlgorithmId}
                onChange={(e) => handleAlgorithmChange(e.target.value)}
              >
                {currentCategory.algorithms.map((algo) => (
                  <option key={algo.id} value={algo.id}>
                    {algo.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CodeDose Cross-Link Button */}
        {currentAlgorithm.codeDoseLink && (
          <Link
            to={currentAlgorithm.codeDoseLink}
            className={styles.codeDoseLinkBtn}
            title="Open complete problem notes & solutions on CodeDose"
          >
            <span>📖 Full Notes on CodeDose</span>
            <span className={styles.arrowIcon}>&rarr;</span>
          </Link>
        )}
      </div>

      {/* Algorithm Header Banner */}
      <div className={styles.algoHeaderCard}>
        <div className={styles.algoHeaderLeft}>
          <span className={styles.algoIcon}>{currentCategory.categoryIcon}</span>
          <div>
            <div className={styles.algoTitleRow}>
              <h2 className={styles.algoTitle}>{currentAlgorithm.name}</h2>
              <span className={styles.complexityPill}>
                {currentAlgorithm.timeComplexity}
              </span>
            </div>
            <p className={styles.algoDesc}>{currentAlgorithm.description}</p>
          </div>
        </div>
      </div>

      {/* Main Visualizer Content Area (Side-by-Side Two Column Layout) */}
      <main className={styles.canvasSection}>
        <ActiveComponent selectedAlgoId={activeAlgorithmId} />
      </main>

      {/* Bottom Educational Note */}
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
