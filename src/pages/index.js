import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import SortingVisualizer from "@site/src/components/AlgoDose/algorithms/SortingVisualizer";
import Heading from "@theme/Heading";
import Head from "@docusaurus/Head";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const stats = siteConfig.customFields?.stats || {};

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
            DBMS, and Core CS with live interactive visualizers, clean code, and interview-ready notes.
          </p>

          <div className={styles.buttons}>
            <Link
              className={styles.primaryCta}
              to="/algodose"
            >
              ⚡ Launch AlgoDose Visualizer
            </Link>
            <Link
              className={styles.secondaryCta}
              to="/coding"
            >
              📚 Explore CodeDose (DSA)
            </Link>
          </div>

          <div className={styles.subCtaRow}>
            <span>📺 4 Free Video Playlists on YouTube</span>
            <span className={styles.subCtaDivider}>•</span>
            <a
              href="https://www.youtube.com/@binarydose"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.subCtaLink}
            >
              Watch Free Channel &rarr;
            </a>
          </div>

          <div className={styles.statsRibbon}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.totalProblems || 390}+</span>
              <span className={styles.statLabel}>Solved Problems</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.totalCategories || 16}</span>
              <span className={styles.statLabel}>DSA Patterns</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.hundredDaysCount || 48}+</span>
              <span className={styles.statLabel}>Interview Deep-Dives</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.visualizerEnginesCount || 4}</span>
              <span className={styles.statLabel}>Live Visualizers</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HomepageVisualizerTeaser() {
  return (
    <section className={styles.visualizerTeaserSection}>
      <div className="container">
        <div className={styles.teaserHeader}>
          <div className={styles.teaserBadge}>
            <span>⚡</span> Interactive Algorithm Lab
          </div>
          <Heading as="h2" className={styles.teaserTitle}>
            Experience Algorithms in Action
          </Heading>
          <p className={styles.teaserSubtitle}>
            Stop memorizing textbook code. Watch comparisons, swaps, and pointer boundaries step-by-step with zero lag.
          </p>
        </div>

        {/* Embedded zero-redundancy preview of SortingVisualizer */}
        <div className={styles.teaserCardContainer}>
          <SortingVisualizer previewMode={true} />
        </div>

        {/* Action button below teaser */}
        <div className={styles.teaserFooter}>
          <Link to="/algodose" className={styles.teaserExploreBtn}>
            <span>⚡ Open Full AlgoDose Visualizer Lab</span>
            <span className={styles.teaserArrow}>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://binarydose.in/#website",
        "url": "https://binarydose.in",
        "name": "Binary Dose",
        "description": "Zero-fluff computer science fundamentals, high-yield interview preparation, and DSA mastery with clear visual intuitions and interactive visualizers.",
        "publisher": {
          "@type": "Organization",
          "@id": "https://binarydose.in/#organization",
          "name": "Binary Dose",
          "url": "https://binarydose.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://binarydose.in/img/logo.png",
          },
          "sameAs": [
            "https://www.youtube.com/@binarydose",
            "https://www.instagram.com/binarydose",
          ],
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://binarydose.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://binarydose.in/#organization",
        "name": "Binary Dose",
        "url": "https://binarydose.in",
        "logo": "https://binarydose.in/img/logo.png",
        "description": "Free, open-source computer science & software engineering learning hub with interactive algorithm visualizers.",
      },
    ],
  };

  return (
    <Layout
      title="Master DSA, System Design & CS Fundamentals"
      description="Zero-fluff computer science fundamentals, high-yield software engineering interview preparation, and DSA patterns with interactive visualizers."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <HomepageHeader />
      <main>
        <HomepageVisualizerTeaser />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
