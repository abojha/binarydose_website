import React, { useState, useMemo } from "react";
import HeroHeader from "../Common/HeroHeader";
import SearchBar from "../Common/SearchBar";
import DoseCard from "../Common/DoseCard";
import styles from "./DevDoseHub.module.css";

const ACTIVE_TRACKS = [
  {
    id: "100-days",
    title: "100 Days of Tech Interview",
    icon: "🎯",
    accent: "purple",
    badge: "64 High-Yield Questions",
    desc: "Curated high-yield conceptual questions on Operating Systems, Databases, Networking, and Architecture with visual diagrams and concise answers.",
    chips: [
      "TCP 3-Way Handshake",
      "B+ Tree Indexing",
      "Virtual Memory & Paging",
      "Process Context Switching",
      "Zombie & Orphan Processes",
      "ACID & 2PL Concurrency",
    ],
    url: "/100-days",
    cta: "Explore 100 Days Series",
  },
];

const UPCOMING_TRACKS = [
  {
    id: "system-design",
    title: "System Design & Architecture (HLD / LLD)",
    icon: "🏗️",
    desc: "Scalability, load balancing, caching (Redis), message queues (Kafka), microservices, and design patterns.",
  },
  {
    id: "python-engineering",
    title: "Python for Software Engineers",
    icon: "🐍",
    desc: "Idiomatic Python, async/await concurrency, generators, GIL internals, memory management, and FastAPI.",
  },
  {
    id: "modern-cpp",
    title: "Modern C++ (C++17/20) & Systems",
    icon: "⚡",
    desc: "Smart pointers, RAII idioms, move semantics, memory models, multithreading, and low-latency systems.",
  },
  {
    id: "applied-ai",
    title: "Applied AI & LLM Engineering",
    icon: "🤖",
    desc: "RAG architectures, vector embeddings, chunking strategies, LangChain/LlamaIndex, and autonomous agent loops.",
  },
];

export default function DevDoseHub() {
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.trim().toLowerCase();

  const filteredActiveTracks = useMemo(() => {
    if (!q) return ACTIVE_TRACKS;
    return ACTIVE_TRACKS.filter((track) => {
      const matchTitle = track.title.toLowerCase().includes(q);
      const matchDesc = track.desc.toLowerCase().includes(q);
      const matchChip = track.chips.some((c) => c.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchChip;
    });
  }, [q]);

  const filteredUpcomingTracks = useMemo(() => {
    if (!q) return UPCOMING_TRACKS;
    return UPCOMING_TRACKS.filter((track) => {
      const matchTitle = track.title.toLowerCase().includes(q);
      const matchDesc = track.desc.toLowerCase().includes(q);
      return matchTitle || matchDesc;
    });
  }, [q]);

  const hasAnyMatches = filteredActiveTracks.length > 0 || filteredUpcomingTracks.length > 0;

  return (
    <div className={styles.wrapper}>
      {/* Universal Hero Header */}
      <HeroHeader
        badge={{ icon: "🛠️", text: "Practical Tech & Applied Engineering" }}
        title="Master Applied Tech with"
        gradient="DevDose"
        subtitle="Production-ready language guides, system design blueprints, and high-yield interview frameworks for modern software engineers."
        stats={[
          { number: 64, label: "Interview Questions" },
          { number: ACTIVE_TRACKS.length, label: "Live Track" },
          { number: UPCOMING_TRACKS.length, label: "Tracks in Pipeline" },
        ]}
      />

      {/* Universal Search Bar */}
      <div className={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tracks, systems, or keywords (e.g. 100 Days, System Design, Python, AI)..."
          maxWidth="640px"
          ariaLabel="Search DevDose tracks"
        />
      </div>

      {hasAnyMatches ? (
        <>
          {/* Active Flagship Track Grid */}
          {filteredActiveTracks.length > 0 && (
            <div className={styles.trackGrid}>
              {filteredActiveTracks.map((track) => (
                <DoseCard
                  key={track.id}
                  icon={track.icon}
                  title={track.title}
                  description={track.desc}
                  badge={track.badge}
                  badgeType="success"
                  chips={track.chips}
                  to={track.url}
                  actionText={track.cta}
                  accent={track.accent}
                />
              ))}
            </div>
          )}

          {/* Dynamic Curriculum Roadmap Strip (Same as CoreDoseHub) */}
          {filteredUpcomingTracks.length > 0 && (
            <section className={styles.roadmapSection}>
              <div className={styles.roadmapCard}>
                <div className={styles.roadmapHeader}>
                  <span className={styles.roadmapPill}>Engineering Roadmap</span>
                  <span className={styles.roadmapStatus}>⚡ In Active Production</span>
                </div>
                <p className={styles.roadmapDesc}>
                  The following applied engineering tracks are actively being developed and will unlock as full courses upon release:
                </p>
                <div className={styles.roadmapPillsList}>
                  {filteredUpcomingTracks.map((track) => (
                    <span key={track.id} className={styles.roadmapSubject}>
                      {track.icon} {track.title}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🔍</span>
          <h3 className={styles.emptyTitle}>No matching DevDose tracks found</h3>
          <p className={styles.emptyDesc}>
            No tracks or topics found matching "{searchQuery}". Try searching for another keyword.
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
    </div>
  );
}
