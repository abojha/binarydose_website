import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./contribute.module.css";

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
            Binary Dose is built for the community, by the community. Share your technical guides,
            interview breakdowns, or DSA solutions and get featured with your own verified author profile.
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

        {/* 3 Ways to Contribute */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ways You Can Contribute</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>✍️</div>
              <h3>1. Technical Articles & Guides</h3>
              <p>
                Write in-depth engineering posts on OS, System Design, Concurrency, or Networks.
                Get featured with your dedicated author card linking to your LinkedIn, GitHub, and portfolio.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🎯</div>
              <h3>2. Interview Breakdown Blogs</h3>
              <p>
                Encountered tricky questions or system design problems in an interview?
                Share your full round breakdown and solution as a published blog article!
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💻</div>
              <h3>3. CodeDose DSA Solutions</h3>
              <p>
                Add clean, optimal code solutions in C++, Java, Python, or Go to our <strong>CodeDose Sheet</strong>, or help improve explanations.
              </p>
            </div>
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
                Every article features your custom author card with direct links to your LinkedIn, GitHub, and portfolio.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>👥</div>
              <h3>Reach Thousands of Developers</h3>
              <p>
                Your work helps thousands of CS students, GATE aspirants, and developers cracking top technical interviews.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💼</div>
              <h3>Open-Source Credibility</h3>
              <p>
                Published technical writing and verified GitHub contributions showcase strong engineering communication on your resume.
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
                <h4>Fork our GitHub Repository</h4>
                <p>
                  Fork <Link href="https://github.com/abojha/binarydose_website">abojha/binarydose_website</Link> and add your profile in <code>blog/authors.yml</code>.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div>
                <h4>Add Your Blog Post or Solution</h4>
                <p>
                  Create a markdown file in <code>blog/</code> with your explanations, code snippets, and Mermaid diagrams.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div>
                <h4>Open a Pull Request</h4>
                <p>
                  Submit your PR. We will review it, provide feedback, and merge it live on the site!
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ctaBox}>
            <h3>Ready to share your knowledge?</h3>
            <p>Check out our quick contributor guide on GitHub, or follow our signature <strong>100 Days CS Series</strong> on YouTube!</p>
            <Link
              className={styles.primaryBtn}
              href="https://github.com/abojha/binarydose_website/blob/main/CONTRIBUTING.md"
            >
              📖 View Contributor Guide
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
