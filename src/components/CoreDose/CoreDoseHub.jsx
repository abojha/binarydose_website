import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./CoreDoseHub.module.css";

const COURSES = [
  {
    id: "dbms",
    icon: "🗄️",
    title: "Database Management Systems (DBMS)",
    badge: "Notes Live",
    badgeType: "active",
    description: "From Data & 3-Schema Architecture to Normalization (1NF to BCNF), Relational Algebra, SQL, Transactions (ACID, 2PL), and B+ Trees.",
    stats: "10 Modules • 43 Comprehensive Lessons",
    notesUrl: "/coredose/dbms",
    notesLabel: "📖 Read Course Notes →",
    youtubeUrl: null,
  },
  {
    id: "os",
    icon: "🖥️",
    title: "Operating Systems (OS)",
    badge: "Notes in Progress",
    badgeType: "upcoming",
    description: "Processes, Threads, CPU Scheduling, Semaphores, Mutexes, Deadlocks, Virtual Memory Paging, and Linux Kernel internals.",
    stats: "8 Modules • Notes in Production",
    notesUrl: null,
    notesLabel: "📖 Notes in Production",
    youtubeUrl: "https://www.youtube.com/watch?v=seTUoWyKg_0&list=PLEv-c2bR0YZZAIV9Ff7oelNiXyJjalMg0",
    youtubeLabel: "▶ Watch Video Playlist",
  },
  {
    id: "cn",
    icon: "🌐",
    title: "Computer Networks (CN)",
    badge: "Upcoming Masterclass",
    badgeType: "upcoming",
    description: "OSI 7 Layers, TCP/IP Suite, 3-Way Handshake, Sliding Window Protocol, Congestion Control, DNS, and HTTP/HTTPS.",
    stats: "Comprehensive Notes in Production",
    notesUrl: null,
    notesLabel: "📖 Notes in Production",
    youtubeUrl: null,
  },
  {
    id: "oops",
    icon: "🧱",
    title: "Object-Oriented Programming (OOPs)",
    badge: "Notes in Progress",
    badgeType: "upcoming",
    description: "Encapsulation, Abstraction, Inheritance, Polymorphism, Virtual Functions, and Clean Design Principles in C++ & Java.",
    stats: "6 Modules • Notes in Production",
    notesUrl: null,
    notesLabel: "📖 Notes in Production",
    youtubeUrl: "https://www.youtube.com/watch?v=z1CAvWDKV8c&list=PLEv-c2bR0YZbF_r1CtqMnzCq7xKsTWUb4",
    youtubeLabel: "▶ Watch Video Playlist",
  },
  {
    id: "coa",
    icon: "💻",
    title: "Computer Organization & Architecture (COA)",
    badge: "Upcoming Masterclass",
    badgeType: "upcoming",
    description: "Instruction Set Architecture (ISA), Pipeline Hazards, Cache Memory mapping, Virtual Memory translation, and CPU datapaths.",
    stats: "From Authentic GATE Notes",
    notesUrl: null,
    notesLabel: "📖 Notes in Production",
    youtubeUrl: null,
  },
  {
    id: "compiler",
    icon: "⚙️",
    title: "Compiler Design & TOC",
    badge: "Upcoming Masterclass",
    badgeType: "upcoming",
    description: "Lexical Analysis, DFA/NFA conversions, Context-Free Grammars, LL(1)/LR Parsers, Syntax Directed Translation, and Code Generation.",
    stats: "From Authentic GATE Notes",
    notesUrl: null,
    notesLabel: "📖 Notes in Production",
    youtubeUrl: null,
  },
];

export default function CoreDoseHub() {
  return (
    <div className={styles.hubContainer}>
      <header className={styles.heroSection}>
        <div className={styles.heroBadge}>
          <span>🎓</span> Core Computer Science Hub
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          Master Core CS with <span className={styles.gradientText}>CoreDose</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          Zero-fluff textbook notes, interactive architecture diagrams, and high-yield exam insights. 
          Built directly from authentic GATE &amp; engineering notes for semester exams, GATE CSE, and technical placement interviews.
        </p>
      </header>

      <div className={styles.courseGrid}>
        {COURSES.map((course) => (
          <div key={course.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>{course.icon}</div>
              <span className={`${styles.badge} ${styles[course.badgeType]}`}>
                {course.badge}
              </span>
            </div>

            <h2 className={styles.cardTitle}>{course.title}</h2>
            <p className={styles.cardDescription}>{course.description}</p>

            <div className={styles.cardStats}>
              <span>{course.stats}</span>
            </div>

            <div className={styles.cardActions}>
              {course.notesUrl ? (
                <Link to={course.notesUrl} className={styles.primaryBtn}>
                  {course.notesLabel}
                </Link>
              ) : (
                <span className={styles.disabledBtn}>📖 Notes in Production</span>
              )}

              {course.youtubeUrl && (
                <a
                  href={course.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryBtn}
                >
                  {course.youtubeLabel}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
