import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.brandBadge}>
            <span className={styles.badgeIcon}>🎯</span>
            <span className={styles.badgeText}>
              Zero-Fluff Software Engineering &amp; Coding Hub
            </span>
          </div>

          <Heading as="h1" className={styles.heroTitle}>
            Clear Intuitions for{" "}
            <span className={styles.heroGradientText}>
              Computer Science &amp; Coding
            </span>
          </Heading>

          <p className={styles.heroSubtitle}>
            Small, powerful doses of knowledge. Master Data Structures, Operating Systems,
            DBMS, and Core CS with visual explanations, clean code, and interview-ready notes.
          </p>

          <div className={styles.buttons}>
            <Link
              className={styles.primaryCta}
              to="/coding"
            >
              🚀 Explore CodeDose DSA
            </Link>
            <a
              className={styles.secondaryCta}
              href="https://www.youtube.com/@binarydose"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>📺</span> Watch on YouTube
            </a>
          </div>

          <div className={styles.statsRibbon}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>DSA Patterns</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Free Notes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Core CS</span>
              <span className={styles.statLabel}>OS, DBMS, CN</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Interview</span>
              <span className={styles.statLabel}>Oriented Insights</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Binary Dose | A Dose of Binary – Computer Science & DSA"
      description="Binary Dose is a platform for computer science students and engineers to master DSA, Operating Systems, DBMS, and core concepts with intuitive notes and video solutions."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
