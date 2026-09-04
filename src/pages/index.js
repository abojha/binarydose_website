import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import Head from "@docusaurus/Head";
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://binarydose.in/#website",
        "url": "https://binarydose.in",
        "name": "Binary Dose",
        "description": "Zero-fluff computer science fundamentals, high-yield interview preparation, and DSA mastery with clear visual intuitions.",
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
        "description": "Free, open-source computer science & software engineering learning hub.",
      },
    ],
  };

  return (
    <Layout
      title="Master DSA, System Design & CS Fundamentals"
      description="Zero-fluff computer science fundamentals, high-yield software engineering interview preparation, and DSA patterns with clear visual intuitions."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
