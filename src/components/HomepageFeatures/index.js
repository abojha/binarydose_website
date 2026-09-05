import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

const CoreValues = [
  {
    icon: "🎥",
    title: "Learn on YouTube, Revise Here",
    description: "Concepts are introduced visually on our YouTube channel and supported here with searchable notes, diagrams, and code.",
  },
  {
    icon: "🎯",
    title: "Interview & Exam Focused",
    description: "Every topic is crafted to cut through textbook jargon and help you crack technical interviews and semester exams.",
  },
  {
    icon: "💻",
    title: "Clean, Self-Explanatory Code",
    description: "Meaningful variable names, well-commented logic, and optimal implementations in C++ and Python.",
  },
  {
    icon: "🚀",
    title: "Built by an Engineer",
    description: "Created by Abhay Ojha (Software Engineer at Intel, M.Tech CSE from NIT Warangal) with a passion for high-clarity teaching.",
  },
];

export default function HomepageFeatures() {
  const { siteConfig } = useDocusaurusContext();
  const stats = siteConfig.customFields?.stats || {};

  const learningTracks = [
    {
      icon: "🕹️",
      badge: `${stats.visualizerEnginesCount || 4} Interactive Engines`,
      title: "AlgoDose Visualizer Lab",
      description: "Interactive step-by-step algorithm visualizer with zero CLS, pointer indicators, and synchronized code execution.",
      link: "/algodose",
      linkText: "Launch Visualizer",
    },
    {
      icon: "⚡",
      badge: `${stats.totalProblems || 390}+ Problems • ${stats.totalCategories || 16} Patterns`,
      title: "CodeDose DSA Sheet",
      description: `Curated collection of must-solve coding patterns with clean C++ and Python implementations and complexity analysis.`,
      link: "/coding",
      linkText: "Start Solving",
    },
    {
      icon: "🔥",
      badge: `${stats.hundredDaysCount || 48}+ Interview Doses`,
      title: "100 Days Interview Series",
      description: "Bite-sized daily interview questions covering OS, System Design, Concurrency, and Memory with deep-dive notes.",
      link: "/100-days",
      linkText: "Explore 100 Days",
    },
    {
      icon: "📺",
      badge: `${stats.videoPlaylistsCount || 4} Video Playlists`,
      title: "Video Courses & Playlists",
      description: "Complete animated video courses on Operating Systems, Algorithms, Data Structures, and Object-Oriented Programming.",
      link: "/courses",
      linkText: "Watch Courses",
    },
  ];

  return (
    <>
      {/* 1. Learning Tracks Section */}
      <section className={styles.sectionContainer}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Curated Knowledge</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Master Computer Science & Coding
            </Heading>
            <p className={styles.sectionSubtitle}>
              Structured learning paths designed to build solid intuition from fundamentals to advanced interview problem-solving.
            </p>
          </div>

          <div className={styles.tracksGrid}>
            {learningTracks.map((track, idx) => (
              <Link key={idx} to={track.link} className={styles.trackCard}>
                <div className={styles.trackCardHeader}>
                  <span className={styles.trackIcon}>{track.icon}</span>
                  {track.badge && (
                    <span className={styles.trackBadge}>{track.badge}</span>
                  )}
                </div>
                <h3 className={styles.trackTitle}>{track.title}</h3>
                <p className={styles.trackDesc}>{track.description}</p>
                <div className={styles.trackFooter}>
                  <span>{track.linkText}</span>
                  <span className={styles.trackFooterArrow}>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. YouTube Channel Spotlight Section */}
      <section className="container">
        <div className={styles.youtubeShowcase}>
          <div className={styles.ytContent}>
            <div className={styles.ytBadge}>
              <span>🔴</span> YouTube Channel
            </div>
            <h2 className={styles.ytTitle}>
              Visual Computer Science Lessons on Binary Dose
            </h2>
            <p className={styles.ytDescription}>
              Subscribe to the Binary Dose YouTube channel for in-depth animated lessons on Operating Systems, DSA, Memory Management, and Core CS topics.
            </p>
            <div className={styles.ytActionButtons}>
              <a
                href="https://www.youtube.com/@binarydose?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ytSubscribeBtn}
              >
                <span>▶</span> Subscribe on YouTube
              </a>
              <Link to="/courses" className={styles.ytExploreBtn}>
                Explore Video Courses
              </Link>
            </div>
          </div>

          <div className={styles.ytPreviewCard}>
            <img
              src="/img/banner.jpg"
              alt="Binary Dose YouTube Channel"
              className={styles.ytThumbnail}
              onError={(e) => {
                // Fallback if banner image is missing
                e.target.src = "/img/logo.png";
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Open-Source Community & Contribution Showcase Banner */}
      <section className="container">
        <div className={styles.communityShowcase}>
          <div className={styles.communityContent}>
            <div className={styles.communityBadge}>
              <span>🚀</span> Open-Source &amp; Community
            </div>
            <h2 className={styles.communityTitle}>
              Built by Engineers, for Engineers
            </h2>
            <p className={styles.communityDescription}>
              Binary Dose is built for the developer community, by the developer community. Have a clean DSA solution, an interview breakdown, or a visualizer enhancement? Contribute on GitHub and get your own verified author profile.
            </p>
            <div className={styles.communityActionButtons}>
              <a
                href="https://github.com/abojha/binarydose_website"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.communityGithubBtn}
              >
                <span>⭐</span> Star &amp; Contribute on GitHub
              </a>
              <Link to="/contribute" className={styles.communityExploreBtn}>
                Learn How to Contribute &rarr;
              </Link>
            </div>
          </div>

          <div className={styles.communityPerksCard}>
            <div className={styles.perkItem}>
              <span className={styles.perkIcon}>🌟</span>
              <div>
                <strong>Verified Author Profile</strong>
                <p>Get your custom author card linking to your LinkedIn and GitHub.</p>
              </div>
            </div>
            <div className={styles.perkItem}>
              <span className={styles.perkIcon}>👥</span>
              <div>
                <strong>Reach Thousands of Developers</strong>
                <p>Help students and engineers cracking product-based company interviews.</p>
              </div>
            </div>
            <div className={styles.perkItem}>
              <span className={styles.perkIcon}>💼</span>
              <div>
                <strong>Open-Source Resume Credibility</strong>
                <p>Demonstrate strong technical writing and verified code contributions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Philosophy Section */}
      <section className={styles.sectionContainer} style={{ background: "var(--ifm-background-surface-color)" }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>The Binary Dose Difference</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Why Learn With Binary Dose?
            </Heading>
            <p className={styles.sectionSubtitle}>
              We believe in small, powerful doses of knowledge that stick with you forever.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {CoreValues.map((val, idx) => (
              <div key={idx} className={styles.featureItem}>
                <div className={styles.featureIconBox}>{val.icon}</div>
                <div>
                  <h4 className={styles.featureTitle}>{val.title}</h4>
                  <p className={styles.featureDesc}>{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
