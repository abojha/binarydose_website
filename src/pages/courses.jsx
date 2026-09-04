import React from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./courses.module.css";

const Playlists = [
  {
    icon: "🖥️",
    title: "Operating Systems",
    youtubeUrl: "https://www.youtube.com/watch?v=seTUoWyKg_0&list=PLEv-c2bR0YZZAIV9Ff7oelNiXyJjalMg0",
  },
  {
    icon: "⚡",
    title: "Algorithms",
    youtubeUrl: "https://www.youtube.com/watch?v=Ao4NBu2-HzE&list=PLEv-c2bR0YZboCadZ4xUAXW9tGfr_RwZx",
  },
  {
    icon: "📦",
    title: "Data Structures",
    youtubeUrl: "https://www.youtube.com/watch?v=V8oFCkPtSH0&list=PLEv-c2bR0YZYhPCmATWjlBZyb94ODob0b",
  },
  {
    icon: "🧱",
    title: "Object Oriented Programming (OOPs)",
    youtubeUrl: "https://www.youtube.com/watch?v=z1CAvWDKV8c&list=PLEv-c2bR0YZbF_r1CtqMnzCq7xKsTWUb4",
  },
];

export default function Courses() {
  return (
    <Layout
      title="Video Courses"
      description="Curated high-yield video course playlists on Operating Systems, Algorithms, Data Structures, and Object Oriented Programming (OOPs) by Binary Dose."
    >
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span>🔴</span> YouTube Playlists
          </div>
          <Heading as="h1" className={styles.title}>
            Video Courses
          </Heading>
          <p className={styles.subtitle}>
            Curated video lecture playlists from the Binary Dose YouTube channel.
          </p>
        </header>

        <div className={styles.coursesGrid}>
          {Playlists.map((course, idx) => (
            <a
              key={idx}
              href={course.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.courseCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.courseIcon}>{course.icon}</span>
              </div>

              <h2 className={styles.courseTitle}>{course.title}</h2>

              <div className={styles.cardFooter}>
                <span className={styles.playText}>▶ Watch on YouTube</span>
                <span className={styles.arrowIcon}>&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  );
}
