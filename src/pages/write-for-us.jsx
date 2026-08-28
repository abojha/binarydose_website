import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./write-for-us.module.css";

export default function WriteForUs() {
  return (
    <Layout
      title="Write for Binary Dose"
      description="Share your engineering insights, interview notes, and computer science deep dives with thousands of students and developers."
    >
      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>✍️ Community Writers Program</div>
          <h1 className={styles.title}>Write for Binary Dose</h1>
          <p className={styles.subtitle}>
            Have an interesting engineering insight, deep dive, or interview breakdown?
            Share your knowledge with thousands of developers and get featured on Binary Dose.
          </p>

          <div className={styles.heroButtons}>
            <Link
              className={styles.primaryBtn}
              href="https://github.com/abojha/binarydose_website/blob/main/CONTRIBUTING.md"
            >
              🚀 Submit via GitHub PR
            </Link>
            <Link
              className={styles.secondaryBtn}
              href="mailto:contact@binarydose.in?subject=[Blog%20Submission]%20Your%20Article%20Title%20-%20Your%20Name"
            >
              ✉️ Submit via Email
            </Link>
          </div>
        </section>

        {/* Why Write Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Write for Us?</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🌟</div>
              <h3>Author Profile & Backlinks</h3>
              <p>
                Get a dedicated author card with your photo, bio, and direct links to your LinkedIn, GitHub, and portfolio.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>👥</div>
              <h3>Reach Thousands of Developers</h3>
              <p>
                Your article will be read by thousands of CS students, GATE aspirants, and engineers preparing for top tech interviews.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💼</div>
              <h3>Boost Your Resume & Portfolio</h3>
              <p>
                Published technical writing demonstrates deep technical communication skills to hiring managers and recruiters.
              </p>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Topics We Accept</h2>
          <div className={styles.topicsGrid}>
            <span className={styles.topicPill}>🖥️ Operating Systems</span>
            <span className={styles.topicPill}>📐 System Design & Scalability</span>
            <span className={styles.topicPill}>⚡ Concurrency & Multithreading</span>
            <span className={styles.topicPill}>🌐 Computer Networks & Protocols</span>
            <span className={styles.topicPill}>🧮 Data Structures & Algorithms</span>
            <span className={styles.topicPill}>🐧 Linux Internals & Kernel</span>
            <span className={styles.topicPill}>🎯 High-Yield Interview Questions</span>
            <span className={styles.topicPill}>🛠️ Database & Storage Engines</span>
          </div>
        </section>

        {/* 3 Step Process */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Submit in 3 Steps</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div>
                <h4>Fork our GitHub Repository</h4>
                <p>
                  Fork <Link href="https://github.com/abojha/binarydose_website">abojha/binarydose_website</Link> and add your profile to <code>blog/authors.yml</code>.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div>
                <h4>Write Your Markdown Post</h4>
                <p>
                  Create a file in <code>blog/</code> with your explanations, code snippets, and Mermaid diagrams.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div>
                <h4>Open a Pull Request</h4>
                <p>
                  Submit your PR. We will review it, give feedback, and publish it with your name and links!
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ctaBox}>
            <h3>Ready to publish your article?</h3>
            <p>Read our full step-by-step contribution guide on GitHub.</p>
            <Link
              className={styles.primaryBtn}
              href="https://github.com/abojha/binarydose_website/blob/main/CONTRIBUTING.md"
            >
              📖 View Contributing Guide
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
