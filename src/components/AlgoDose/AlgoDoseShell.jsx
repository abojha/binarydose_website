import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import { ENGINES_CATALOG, findEngineById } from "./algoCatalog";
import TwoPointersVisualizer from "./algorithms/TwoPointersVisualizer";
import SlidingWindowVisualizer from "./algorithms/SlidingWindowVisualizer";
import BinarySearchVisualizer from "./algorithms/BinarySearchVisualizer";
import SortingVisualizer from "./algorithms/SortingVisualizer";
import ComingSoonCard from "./ComingSoonCard";
import CustomDropdown from "./CustomDropdown";
import styles from "./AlgoDoseShell.module.css";

const COMPONENT_MAP = {
  two_pointers: TwoPointersVisualizer,
  sliding_window: SlidingWindowVisualizer,
  binary_search: BinarySearchVisualizer,
  sorting: SortingVisualizer,
};

export default function AlgoDoseShell() {
  const [activeEngineId, setActiveEngineId] = useState("two_pointers");

  // Read URL query parameter (?engine=... or ?algo=...) on mount or popstate
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get("engine") || params.get("algo");
      if (queryParam) {
        const found = findEngineById(queryParam);
        if (found) {
          setActiveEngineId(found.id);
        }
      }
    }
  }, []);

  const currentEngine =
    ENGINES_CATALOG.find((e) => e.id === activeEngineId) || ENGINES_CATALOG[0];

  const ActiveComponent =
    COMPONENT_MAP[activeEngineId] || TwoPointersVisualizer;

  const handleEngineChange = (newEngineId) => {
    setActiveEngineId(newEngineId);
    if (typeof window !== "undefined" && window.history?.pushState) {
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?engine=${newEngineId}`
      );
    }
  };

  const readyEngines = ENGINES_CATALOG.filter((e) => e.status === "ready");
  const upcomingEngines = ENGINES_CATALOG.filter((e) => e.status === "coming_soon");

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

      {/* Unified Engine Selector & Header Card */}
      <div className={styles.engineCard}>
        {/* Top Header Row: Engine Dropdown on Left, CodeDose Button on Right */}
        <div className={styles.engineHeaderRow}>
          <div className={styles.selectGroup}>
            <label htmlFor="algo-engine-select" className={styles.selectLabel}>
              Engine:
            </label>
            <div className={styles.selectWrapper}>
              <CustomDropdown
                id="algo-engine-select"
                value={activeEngineId}
                onChange={handleEngineChange}
                options={[
                  {
                    group: "Ready Visualizers",
                    items: readyEngines.map((engine) => ({
                      value: engine.id,
                      label: engine.name,
                      icon: engine.icon,
                    })),
                  },
                  {
                    group: "Upcoming Engines",
                    items: upcomingEngines.map((engine) => ({
                      value: engine.id,
                      label: `${engine.name} (Coming Soon)`,
                      icon: engine.icon,
                      badge: "Coming Soon",
                    })),
                  },
                ]}
                ariaLabel="Select algorithm engine"
              />
            </div>
          </div>

          {/* CodeDose Cross-Link Button */}
          {currentEngine.codeDoseLink && (
            <Link
              to={currentEngine.codeDoseLink}
              className={styles.codeDoseLinkBtn}
              title={`Open complete ${currentEngine.name} notes & problems on CodeDose`}
            >
              <span>📖 Practice in CodeDose</span>
              <span className={styles.arrowIcon}>&rarr;</span>
            </Link>
          )}
        </div>

        {/* Bottom Engine Information Row: Icon + Title + Description */}
        <div className={styles.engineInfoRow}>
          <span className={styles.algoIcon}>{currentEngine.icon}</span>
          <div className={styles.engineInfoContent}>
            <div className={styles.algoTitleRow}>
              <h2 className={styles.algoTitle}>{currentEngine.name}</h2>
            </div>
            <p className={styles.algoDesc}>{currentEngine.description}</p>
          </div>
        </div>
      </div>

      {/* Main Visualizer Content Area */}
      <main className={styles.canvasSection}>
        {currentEngine.status === "coming_soon" ? (
          <ComingSoonCard engine={currentEngine} />
        ) : (
          <ActiveComponent />
        )}
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
