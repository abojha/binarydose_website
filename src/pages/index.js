import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import SortingVisualizer from "@site/src/components/AlgoDose/algorithms/SortingVisualizer";
import Heading from "@theme/Heading";
import Head from "@docusaurus/Head";
import useSiteStats from "@site/src/hooks/useSiteStats";
import HeroHeader from "@site/src/components/Common/HeroHeader";
import styles from "./index.module.css";

function HomepageHeader() {
  const stats = useSiteStats();

  return (
    <div className={styles.heroBanner}>
      <div className="container">
        <HeroHeader
          badge={{ icon: "🎯", text: "Zero-Fluff Software Engineering & Coding Hub" }}
          title="Clear Intuitions for"
          gradient="Computer Science & Coding"
          subtitle="Small, powerful doses of knowledge. Master Data Structures, Operating Systems, DBMS, and Core CS with live interactive visualizers, clean code, and interview-ready notes."
          stats={[
            { number: `${stats.totalProblems}+`, label: "DSA Problems" },
            { number: `${stats.coredose?.totalTopics || 99}+`, label: "Core CS Notes" },
            { number: `${stats.hundredDaysCount}+`, label: "Interview Doses" },
            { number: stats.visualizerEnginesCount, label: "Live Visualizers" },
          ]}
        >
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
            <Link
              to="/coredose"
              className={styles.subCtaLink}
            >
              🎓 Explore CoreDose (CS Notes) &rarr;
            </Link>
            <span className={styles.subCtaDivider}>•</span>
            <Link
              to="/devdose"
              className={styles.subCtaLink}
            >
              🛠️ Explore DevDose (Applied & Interviews) &rarr;
            </Link>
          </div>
        </HeroHeader>
      </div>
    </div>
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
  const siteUrl = siteConfig.url || "https://binarydose.in";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Binary Dose",
        "description": "Zero-fluff computer science fundamentals, high-yield interview preparation, and DSA mastery with clear visual intuitions and interactive visualizers.",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        "name": "Binary Dose",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/img/logo.png`,
        },
        "description": "Free, open-source computer science & software engineering learning hub with interactive algorithm visualizers.",
        "founder": {
          "@type": "Person",
          "name": "Abhay Ojha",
          "jobTitle": "Software Engineer",
          "sameAs": [
            "https://linkedin.com/in/abhayojha0012",
            "https://www.instagram.com/ab_slogs/",
            "https://github.com/abojha",
          ],
        },
        "sameAs": [
          "https://www.youtube.com/@binarydose",
          "https://www.instagram.com/binarydose",
          "https://github.com/abojha/binarydose_website",
        ],
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
