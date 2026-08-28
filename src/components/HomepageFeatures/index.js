import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const LearningTracks = [
  {
    icon: "⚡",
    title: "CodeDose DSA Sheet",
    description: "Curated collection of must-do coding patterns with visual explanations, clean code, and time/space complexity analysis.",
    link: "/coding",
    linkText: "Start Solving",
  },
  {
    icon: "🔥",
    title: "100 Days CS Series",
    description: "Bite-sized daily interview questions covering OS, System Design, Concurrency, and Memory with deep-dive notes.",
    link: "/100-days",
    linkText: "Explore 100 Days",
  },
  {
    icon: "📺",
    title: "Video Courses & Playlists",
    description: "Complete YouTube video courses on Data Structures (CSE-303), Operating Systems, Algorithms, and CS Fundamentals.",
    link: "/courses",
    linkText: "Watch Courses",
  },
  {
    icon: "📑",
    title: "Previous Year Questions (PYQs)",
    description: "High-yield university & placement exam questions with comprehensive solutions and must-solve markers.",
    link: "/pyqs",
    linkText: "View PYQs",
  },
];

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
    description: "Created by Abhay Ojha (M.Tech CSE at NIT Warangal, Intel Graduate Intern) with passion for high-clarity teaching.",
  },
];

export default function HomepageFeatures() {
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
            {LearningTracks.map((track, idx) => (
              <Link key={idx} to={track.link} className={styles.trackCard}>
                <span className={styles.trackIcon}>{track.icon}</span>
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

      {/* 3. Core Philosophy Section */}
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
