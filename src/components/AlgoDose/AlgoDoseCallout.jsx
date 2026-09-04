import React from "react";
import Link from "@docusaurus/Link";
import styles from "./AlgoDoseCallout.module.css";

export default function AlgoDoseCallout({
  algoId = "binary_search",
  title = "Algorithm Visualization",
  description = "Step through this algorithm interactively with synchronized code execution and live pointer animations.",
}) {
  return (
    <div className={styles.calloutCard}>
      <div className={styles.contentArea}>
        <div className={styles.iconCircle}>⚡</div>
        <div className={styles.textContainer}>
          <div className={styles.tag}>AlgoDose Interactive Lab</div>
          <h4 className={styles.title}>Visualize {title}</h4>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Link
        to={`/algodose?algo=${algoId}`}
        className={styles.ctaButton}
        title={`Open ${title} in AlgoDose Visualizer`}
      >
        <span>▶ Open Visualizer</span>
        <span className={styles.arrow}>&rarr;</span>
      </Link>
    </div>
  );
}
