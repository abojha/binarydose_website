import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./write-for-us.module.css";

export default function WriteForUs() {
  return (
    <Layout
      title="Contribute to Binary Dose"
      description="Write technical blogs, submit interview questions, or add DSA solutions to help thousands of CS students and engineers."
    >
      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>🚀 Open Source Community</div>
          <h1 className={styles.title}>Contribute to Binary Dose</h1>
          <p className={styles.subtitle}>
            Binary Dose is built for the community, by the community. Share your engineering insights,
            real interview questions, or DSA solutions and get featured with your own verified author profile.
          </p>

          <div className={styles.heroButtons}>
            <Link
              className={styles.primaryBtn}
              href="https://github.com/abojha/binarydose_website/blob/main/CONTRIBUTING.md"
            >
              ⭐ Contribute via GitHub
            </Link>
            <Link
              className={styles.secondaryBtn}
              href="mailto:contact@binarydose.in?subject=[Contribution]%20Your%20Topic%20-%20Your%20Name"
            >
              ✉️ Submit via Email
            </Link>
          </div>
        </section>

        {/* 3 Ways to Contribute */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ways You Can Contribute</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>✍️</div>
              <h3>1. Write Tech Blogs</h3>
              <p>
                Write in-depth engineering guides on OS, System Design, Concurrency, or Networks.
                Get your own author card with your photo, bio, and LinkedIn/GitHub links.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🔥</div>
              <h3>2. Submit Interview Questions</h3>
              <p>
                Encountered a great question in an interview (Google, Amazon, Intel, Microsoft, startups)?
                Add it to our <strong>100 Days CS Interview Hub</strong>!
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💻</div>
              <h3>3. Add DSA Solutions & Notes</h3>
              <p>
                Add clean, optimal code solutions in C++, Java, Python, or Go to our <strong>CodeDose DSA Sheet</strong>, or improve explanations and diagrams.
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
              <h3>Author Profile & Backlinks</h3>
              <p>
                Every blog post features your custom author card with direct links to your LinkedIn, GitHub, and portfolio.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>👥</div>
              <h3>Reach Thousands of Developers</h3>
              <p>
                Your work helps thousands of CS students, GATE aspirants, and developers cracking technical interviews.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>💼</div>
              <h3>Boost Your Resume & Portfolio</h3>
              <p>
                Verified open-source contributions and published technical writing look impressive to hiring managers and recruiters.
              </p>
            </div>
          </div>
        </section>

        {/* Topics Accepted */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Topics We Accept</h2>
          <div className={styles.topicsGrid}>
            <span className={styles.topicPill}>🖥️ Operating Systems & Kernel</span>
            <span className={styles.topicPill}>📐 System Design & Scalability</span>
            <span className={styles.topicPill}>⚡ Concurrency & Multithreading</span>
            <span className={styles.topicPill}>🌐 Computer Networks & TCP/IP</span>
            <span className={styles.topicPill}>🧮 Data Structures & Algorithms</span>
            <span className={styles.topicPill}>🎯 Real Tech Interview Questions</span>
            <span className={styles.topicPill}>🐧 Linux Internals & Sockets</span>
            <span className={styles.topicPill}>🛠️ Databases & Storage Engines</span>
          </div>
        </section>

        {/* 3 Steps */}
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
                <h4>Write Your Markdown Post or Question</h4>
                <p>
                  Create a file in <code>blog/</code> or <code>100-days/</code> with your explanations, code, and Mermaid diagrams.
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
