import React, { useState, useMemo } from "react";
import Link from "@docusaurus/Link";
import useSiteStats from "@site/src/hooks/useSiteStats";
import HeroHeader from "@site/src/components/Common/HeroHeader";
import DoseCard from "@site/src/components/Common/DoseCard";
import SearchBar from "@site/src/components/Common/SearchBar";
import styles from "./CoreDoseHub.module.css";

/**
 * Course Registry with curriculum metadata and note-aligned topic chips.
 * Descriptions provide actual conceptual learning outcomes (no duplicate topic listing).
 * Metrics (topics, modules) are computed 100% dynamically from the filesystem.
 */
const ALL_COURSES = [
  {
    id: "os",
    icon: "🖥️",
    title: "Operating Systems (OS)",
    accent: "purple",
    description:
      "Master process lifecycles, CPU scheduling, semaphore synchronization, deadlocks, virtual memory paging, and storage internals with mathematical derivations and diagrams.",
    chips: [
      "Process Lifecycle & PCB",
      "CPU Scheduling (Gantt)",
      "Semaphores & Concurrency",
      "Deadlocks & Banker's",
      "Paging & TLB EMAT",
      "Virtual Memory & LRU",
      "Disk Actuators (SCAN/LOOK)",
      "UNIX Inodes & System Calls",
    ],
    notesUrl: "/coredose/os",
    youtubeUrl:
      "https://www.youtube.com/watch?v=seTUoWyKg_0&list=PLEv-c2bR0YZZAIV9Ff7oelNiXyJjalMg0",
  },
  {
    id: "dbms",
    icon: "🗄️",
    title: "Database Management Systems (DBMS)",
    accent: "blue",
    description:
      "Master relational algebra, SQL optimization, schema normalization (1NF to BCNF), ACID transactions, concurrency protocols, and B+ tree storage engines.",
    chips: [
      "3-Schema Architecture",
      "ER & Table Reduction",
      "Relational Algebra & SQL",
      "1NF to BCNF Normalization",
      "ACID & Serializability",
      "Concurrency Control & 2PL",
      "Crash Recovery & WAL",
      "B+ Trees & Indexing",
    ],
    notesUrl: "/coredose/dbms",
    youtubeUrl: null,
  },
  {
    id: "cn",
    icon: "🌐",
    title: "Computer Networks (CN)",
    accent: "cyan",
    description:
      "Master OSI 7-layer architecture, TCP/IP flow control, sliding window protocols, congestion control algorithms, and socket networking.",
    chips: [
      "OSI 7-Layer & TCP/IP",
      "Sliding Window (GBN/SR)",
      "IPv4/IPv6 & CIDR",
      "Routing (Dijkstra/BGP)",
      "TCP 3-Way Handshake",
      "Congestion Control & DNS",
    ],
    notesUrl: "/coredose/cn",
    youtubeUrl: null,
  },
  {
    id: "oops",
    icon: "🧱",
    title: "Object-Oriented Programming (OOPs)",
    accent: "amber",
    description:
      "Master encapsulation, inheritance mechanics, virtual tables & polymorphism, and clean object-oriented architecture in C++ & Java.",
    chips: [
      "Encapsulation & Abstraction",
      "Inheritance & Diamond Problem",
      "Runtime Polymorphism & VTable",
      "Virtual Functions",
      "SOLID Principles",
    ],
    notesUrl: "/coredose/oops",
    youtubeUrl:
      "https://www.youtube.com/watch?v=z1CAvWDKV8c&list=PLEv-c2bR0YZbF_r1CtqMnzCq7xKsTWUb4",
  },
  {
    id: "coa",
    icon: "💻",
    title: "Computer Organization & Architecture (COA)",
    accent: "slate",
    description:
      "Master instruction set architectures (ISA), CPU pipelining hazards, cache memory mapping, and virtual memory address translation.",
    chips: [
      "Instruction Set (ISA)",
      "Pipelining & Branch Hazards",
      "Cache Mapping",
      "Virtual Memory & TLB",
      "CPU Datapath & ALU",
    ],
    notesUrl: "/coredose/coa",
    youtubeUrl: null,
  },
  {
    id: "compiler",
    icon: "⚙️",
    title: "Compiler Design & TOC",
    accent: "rose",
    description:
      "Master lexical analysis, DFA/NFA conversions, context-free parsing (LL/LR), syntax-directed translation, and compiler optimization.",
    chips: [
      "DFA / NFA & Regular Languages",
      "Context-Free Grammars",
      "LL(1) & LR Parsing",
      "Syntax-Directed Translation",
      "Code Optimization",
    ],
    notesUrl: "/coredose/compiler",
    youtubeUrl: null,
  },
];

export default function CoreDoseHub() {
  const { coredose } = useSiteStats();
  const subjectsData = coredose?.subjects || {};

  // Dynamically filter active courses based on filesystem presence (topics > 0)
  const activeCourses = ALL_COURSES.filter((course) => {
    const sub = subjectsData[course.id];
    return sub && sub.topics > 0;
  });

  const totalTopics = coredose?.totalTopics || 99;
  const totalModules = coredose?.totalModules || 20;
  const activeCoursesCount = coredose?.activeCoursesCount || activeCourses.length;

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeCourses;

    return activeCourses.filter((course) => {
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchDesc = course.description.toLowerCase().includes(q);
      const matchChip = course.chips.some((chip) => chip.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchChip;
    });
  }, [activeCourses, searchQuery]);

  const roadmapCourses = useMemo(() => {
    return ALL_COURSES.filter(
      (course) => !activeCourses.some((active) => active.id === course.id)
    );
  }, [activeCourses]);

  return (
    <div className={styles.wrapper}>
      {/* Universal Hero Header */}
      <HeroHeader
        badge={{ icon: "🎓", text: "Core Computer Science Hub" }}
        title="Master Core CS with"
        gradient="CoreDose"
        subtitle="Zero-fluff textbook notes, interactive architecture diagrams, and high-yield interview frameworks for university semester exams, GATE CSE, and technical placement rounds."
        stats={[
          { number: activeCoursesCount, label: "Courses" },
          { number: totalModules, label: "Modules" },
          { number: totalTopics, label: "Topics" },
        ]}
      />

      {/* Universal Search Bar */}
      <div className={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search subjects, modules, or concepts (e.g. Operating Systems, Virtual Memory, SQL, B+ Trees)..."
          maxWidth="640px"
          ariaLabel="Search Core CS subjects"
        />
      </div>

      {/* Active Masterclasses Grid - 2-Column Responsive Layout */}
      <section className={styles.activeSection}>
        {filteredCourses.length > 0 ? (
          <div className={styles.courseGrid}>
            {filteredCourses.map((course) => {
              const stats = subjectsData[course.id] || { modules: 1, topics: 4 };
              return (
                <DoseCard
                  key={course.id}
                  icon={course.icon}
                  title={course.title}
                  description={course.description}
                  badge={`📊 ${stats.modules} Modules • ${stats.topics} Topics`}
                  chips={course.chips}
                  to={course.notesUrl}
                  actionText="Read Course Notes"
                  secondaryAction={
                    course.youtubeUrl
                      ? { label: "Watch Playlist", href: course.youtubeUrl, icon: "▶" }
                      : null
                  }
                  accent={course.accent}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <h3 className={styles.emptyTitle}>No matching Core CS subjects found</h3>
            <p className={styles.emptyDesc}>
              No subjects or concepts found matching "{searchQuery}". Try searching for another keyword.
            </p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => setSearchQuery("")}
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      {/* Dynamic Curriculum Roadmap Strip */}
      {roadmapCourses.length > 0 && (
        <section className={styles.roadmapSection}>
          <div className={styles.roadmapCard}>
            <div className={styles.roadmapHeader}>
              <span className={styles.roadmapPill}>Curriculum Roadmap</span>
              <span className={styles.roadmapStatus}>⚡ In Active Production</span>
            </div>
            <p className={styles.roadmapDesc}>
              The following core subjects are actively being authored and will automatically unlock as live masterclasses upon release:
            </p>
            <div className={styles.roadmapPillsList}>
              {roadmapCourses.map((course) => (
                <span key={course.id} className={styles.roadmapSubject}>
                  {course.icon} {course.title}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
