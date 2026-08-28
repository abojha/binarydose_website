import React from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./courses.module.css";

const Playlists = [
  {
    icon: "📦",
    category: "Data Structures",
    title: "Data Structure (CSE-303) — Full Course",
    description: "Complete theoretical and conceptual foundation for Data Structures tailored for B.Tech CSE university syllabus, exams, and technical interviews.",
    topics: ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Hashing"],
    youtubeUrl: "https://www.youtube.com/watch?v=Ao4NBu2-HzE&list=PLEv-c2bR0YZboCadZ4xUAXW9tGfr_RwZx",
  },
  {
    icon: "🖥️",
    category: "Operating Systems",
    title: "Operating System — For College Exams",
    description: "In-depth video lectures covering core OS concepts, process synchronization, CPU scheduling algorithms, virtual memory, and deadlocks with intuitive dry-runs.",
    topics: ["Process & Threads", "CPU Scheduling", "Synchronization", "Deadlocks", "Paging & Memory"],
    youtubeUrl: "https://www.youtube.com/watch?v=seTUoWyKg_0&list=PLEv-c2bR0YZZAIV9Ff7oelNiXyJjalMg0",
  },
  {
    icon: "⚡",
    category: "Algorithms",
    title: "Algorithm — For College Exams & Analysis",
    description: "Master algorithm design paradigms, asymptotic time & space complexity analysis (Big-O, Omega, Theta), divide & conquer, and dynamic programming.",
    topics: ["Asymptotic Analysis", "Divide & Conquer", "Greedy Method", "Dynamic Programming", "Sorting"],
    youtubeUrl: "https://www.youtube.com/watch?v=V8oFCkPtSH0&list=PLEv-c2bR0YZYhPCmATWjlBZyb94ODob0b",
  },
  {
    icon: "💡",
    category: "Computer Fundamentals",
    title: "Computer Knowledge by Animation & Basics",
    description: "Visual, animated explanations of low-level computer science concepts, memory organization, and how hardware and software communicate under the hood.",
    topics: ["Computer Architecture", "Animation Deep-Dives", "Memory Concepts", "CS Literacy"],
    youtubeUrl: "https://www.youtube.com/watch?v=z1CAvWDKV8c&list=PLEv-c2bR0YZbF_r1CtqMnzCq7xKsTWUb4",
  },
];

export default function Courses() {
  return (
    <Layout
      title="Video Courses & Playlists | Binary Dose"
      description="Explore full video courses on Data Structures, Operating Systems, Algorithms, and Computer Science fundamentals by Binary Dose on YouTube."
    >
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span>🔴</span> YouTube Video Playlists
          </div>
          <Heading as="h1" className={styles.title}>
            Complete Computer Science Video Courses
          </Heading>
          <p className={styles.subtitle}>
            Comprehensive, exam-oriented and intuition-first video series created by Abhay Ojha on the Binary Dose YouTube channel. Click any playlist to watch on YouTube.
          </p>
        </header>

        <div className={styles.coursesGrid}>
          {Playlists.map((course, idx) => (
            <div key={idx} className={styles.courseCard}>
              <div className={styles.cardTop}>
                <span className={styles.courseIcon}>{course.icon}</span>
                <span className={styles.categoryTag}>{course.category}</span>
              </div>

              <h2 className={styles.courseTitle}>{course.title}</h2>
              <p className={styles.courseDesc}>{course.description}</p>

              <div className={styles.topicsList}>
                {course.topics.map((t, i) => (
                  <span key={i} className={styles.topicChip}>
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={course.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.watchBtn}
              >
                <span>▶</span> Watch Playlist on YouTube
              </a>
            </div>
          ))}
        </div>

        <section className={styles.channelCallout}>
          <h3>Want more lessons and daily short insights?</h3>
          <p>
            Subscribe to the Binary Dose YouTube channel for our daily "100 Days of Interview Questions" series and new lecture releases!
          </p>
          <a
            href="https://www.youtube.com/@binarydose?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channelBtn}
          >
            <span>▶</span> Subscribe to @binarydose on YouTube
          </a>
        </section>
      </main>
    </Layout>
  );
}
