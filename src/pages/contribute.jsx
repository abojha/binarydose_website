import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./contribute.module.css";

const PLATFORM_TRACKS = [
  {
    icon: "🎓",
    title: "CoreDose",
    desc: "University & GATE-level lessons (OS, DBMS, CN, OOPs) with structured blueprints, visual diagrams, and mathematical derivations.",
    guide: "/contributing/COREDOSE.md",
    guideLabel: "CoreDose Guide",
  },
  {
    icon: "⚡",
    title: "CodeDose",
    desc: "Curated DSA sheet with clean, optimal C++ and Python solutions organized by pattern with complexity analysis.",
    guide: "/contributing/CODEDOSE.md",
    guideLabel: "CodeDose Guide",
  },
  {
    icon: "🛠️",
    title: "DevDose",
    desc: "100 Days of Tech Interview, System Design blueprints, Modern C++ deep-dives, and AI/LLM Engineering tracks.",
    guide: "/contributing/DEVDOSE.md",
    guideLabel: "DevDose Guide",
  },
  {
    icon: "🕹️",
    title: "AlgoDose",
    desc: "Interactive algorithm visualizers with step-by-step execution, synchronized code highlighting, and zero-lag playback.",
    guide: "/contributing/ALGODOSE.md",
    guideLabel: "AlgoDose Guide",
  },
];

export default function Contribute() {
  return (
    <Layout
      title="Contribute to Binary Dose"
      description="Help build high-quality, free computer science resources for students and engineers worldwide."
    >
      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>🚀 Open-Source & Community Driven</div>
          <h1 className={styles.title}>Contribute to Binary Dose</h1>
          <p className={styles.subtitle}>
            Binary Dose is built for the community, by the community. Whether
            you want to share an interview experience, write a technical
            deep-dive, or help build our learning platform — there's a place for
            you.
          </p>

          <div className={styles.heroButtons}>
            <Link
              className={styles.primaryBtn}
              href="https://github.com/abojha/binarydose_website/blob/main/CONTRIBUTING.md"
            >
              ⭐ Contribute on GitHub
            </Link>
            <Link
              className={styles.secondaryBtn}
              href="https://www.instagram.com/binarydose"
            >
              📸 DM on Instagram (@binarydose)
            </Link>
            <Link
              className={styles.secondaryBtn}
              href="mailto:dosebinary@gmail.com?subject=[Contribution]%20Topic%20-%20Your%20Name"
            >
              ✉️ Share via Email
            </Link>
          </div>
        </section>

        {/* ─── Blog: Primary Open Track ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>✍️ Write a Blog Post</h2>
          <div className={styles.blogHighlight}>
            <p className={styles.blogDesc}>
              The fastest way to contribute! Write an engineering article,
              interview breakdown, or technical deep-dive{" "}
              <strong>in your own style</strong>. No rigid templates — just share
              your knowledge. You'll get a{" "}
              <strong>verified author profile</strong> linking directly to your
              LinkedIn, GitHub, and portfolio.
            </p>
            <div className={styles.blogActions}>
              <Link
                className={styles.primaryBtn}
                href="https://github.com/abojha/binarydose_website/blob/main/contributing/BLOG.md"
              >
                📖 Blog Contributor Guide
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Platform Tracks: Discuss First ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Contribute to the Learning Platform
          </h2>
          <div className={styles.discussNotice}>
            <span className={styles.discussIcon}>💬</span>
            <p>
              CoreDose, CodeDose, DevDose, and AlgoDose have specific
              architectural standards, reusable components, and strict design
              patterns. Before starting work on any of these tracks,{" "}
              <strong>
                please reach out to us first
              </strong>{" "}
              so we can align on scope, components, and conventions. This helps
              us maintain consistency and saves you rework.
            </p>
          </div>
          <div className={styles.doseGrid}>
            {PLATFORM_TRACKS.map((track) => (
              <div key={track.title} className={styles.doseCard}>
                <div className={styles.doseIcon}>{track.icon}</div>
                <h3 className={styles.doseTitle}>{track.title}</h3>
                <p className={styles.doseDesc}>{track.desc}</p>
                <Link
                  className={styles.doseLink}
                  href={`https://github.com/abojha/binarydose_website/blob/main${track.guide}`}
                >
                  📖 {track.guideLabel} →
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.reachOut}>
            <Link
              className={styles.secondaryBtn}
              href="https://www.instagram.com/binarydose"
            >
              📸 DM us on Instagram
            </Link>
            <Link
              className={styles.secondaryBtn}
              href="mailto:dosebinary@gmail.com?subject=[Platform Contribution]%20Track%20-%20Your%20Name"
            >
              ✉️ Email Us
            </Link>
            <Link
              className={styles.secondaryBtn}
              href="https://github.com/abojha/binarydose_website/issues"
            >
              💡 Open a GitHub Issue
            </Link>
          </div>
        </section>

        {/* Why Contribute */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Contribute?</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🌟</div>
              <h3>Author Profile & Attribution</h3>
              <p>
                Every contribution features your custom author card with direct
                links to your LinkedIn, GitHub, and portfolio.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>👥</div>
              <h3>Reach Thousands of Developers</h3>
              <p>
                Your work helps thousands of CS students, GATE aspirants, and
                developers cracking top technical interviews.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💼</div>
              <h3>Open-Source Credibility</h3>
              <p>
                Published technical writing and verified GitHub contributions
                showcase strong engineering communication on your resume.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Steps */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Contribute in 3 Steps</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div>
                <h4>Fork & Clone the Repository</h4>
                <p>
                  Fork{" "}
                  <Link href="https://github.com/abojha/binarydose_website">
                    abojha/binarydose_website
                  </Link>{" "}
                  and clone it locally. Create a dedicated feature branch —
                  never work directly on <code>main</code>.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div>
                <h4>Follow the Track Guide & Build</h4>
                <p>
                  Read the contributing guide for your chosen track, follow the
                  rules, and verify your work locally with{" "}
                  <code>npm run start</code>.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div>
                <h4>Open a Pull Request</h4>
                <p>
                  Push your feature branch and open a PR against{" "}
                  <code>main</code>. We will review it, provide feedback, and
                  merge it live on the site!
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ctaBox}>
            <h3>Ready to share your knowledge?</h3>
            <p>
              Check out the full contributor guide on GitHub for the complete PR
              protocol and review checklist.
            </p>
            <Link
              className={styles.primaryBtn}
              href="https://github.com/abojha/binarydose_website/blob/main/CONTRIBUTING.md"
            >
              📖 View Full Contributor Guide
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
