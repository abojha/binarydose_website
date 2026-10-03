import React, { useState, useRef } from "react";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import { useLocation, useHistory } from "@docusaurus/router";
import HeroHeader from "../Common/HeroHeader";
import NumberBadge from "../Common/NumberBadge";
import "./AutoIndex.css";

const TRACK_META = {
  arrays: {
    name: "Arrays",
    icon: "📊",
    desc: "Subarray transformations, prefix sums, two-pointer strategies, and 2D matrix traversal.",
  },
  "binary-search": {
    name: "Binary Search",
    icon: "🔍",
    desc: "Logarithmic searching, monotonic answer spaces, rotated arrays, and lower/upper bounds.",
  },
  "binary-search-trees": {
    name: "Binary Search Trees",
    icon: "🌳",
    desc: "Ordered binary search structures, validation, tree balancing, and successor recovery.",
  },
  "binary-trees": {
    name: "Binary Trees",
    icon: "🌲",
    desc: "Hierarchical traversals, bottom-up subtree aggregations, tree diameter, and lowest common ancestor.",
  },
  "bit-manupilation": {
    name: "Bit Manipulation",
    icon: "⚙️",
    desc: "Bitwise boolean operations, masks, power-of-two tests, XOR cancellations, and compact state sets.",
  },
  "dynamic-programming": {
    name: "Dynamic Programming",
    icon: "🧩",
    desc: "Optimal substructure, overlapping states, memoization, grid paths, and space-optimized tabulation.",
  },
  graphs: {
    name: "Graphs",
    icon: "🕸️",
    desc: "Adjacency structures, BFS/DFS, shortest paths (Dijkstra), topological ordering, and Disjoint Set Union.",
  },
  "greedy-algorithms": {
    name: "Greedy Algorithms",
    icon: "💰",
    desc: "Locally optimal decision making, interval scheduling, exchange arguments, and optimization.",
  },
  heaps: {
    name: "Heaps & Priority Queues",
    icon: "⛰️",
    desc: "Min/max heap properties, streaming medians, top-K aggregations, and two-heap mechanics.",
  },
  "linked-list": {
    name: "Linked List",
    icon: "🔗",
    desc: "Singly/doubly linked chains, cycle detection, in-place reversals, and multi-list merges.",
  },
  recursion: {
    name: "Recursion & Backtracking",
    icon: "🔄",
    desc: "Decision trees, combinatorial permutations, pruning heuristics, and constraint satisfaction.",
  },
  sorting: {
    name: "Sorting",
    icon: "📶",
    desc: "Divide-and-conquer partition schemes, comparator sorting, and in-place stability.",
  },
  "stack-queue": {
    name: "Stack and Queue",
    icon: "🥞",
    desc: "Monotonic stack patterns, next greater element, hardware queues, and LRU Cache design.",
  },
  strings: {
    name: "Strings",
    icon: "🔤",
    desc: "Frequency hashing, palindrome algorithms, sliding substring windows, and string parsing.",
  },
  tries: {
    name: "Tries",
    icon: "🔀",
    desc: "Prefix-tree retrieval, autocomplete structures, character branching, and bitwise XOR queries.",
  },
  "two-pointers-sliding-window-problems": {
    name: "Two Pointers & Sliding Window",
    icon: "🪟",
    desc: "Optimal contiguous subarray windows, shrink-and-expand mechanics, and fast/slow pointer pairs.",
  },
};

export default function AutoIndex({ docsPluginId, basePath, indexDocId }) {
  const allDocsData = useAllDocsData();
  const location = useLocation();
  const history = useHistory();

  // store section refs
  const sectionRefs = useRef({});

  // ---------- LOADING ----------
  if (!allDocsData?.[docsPluginId]?.versions?.length) {
    return <p>Loading...</p>;
  }

  const docs = allDocsData[docsPluginId].versions[0].docs;

  // ---------- SCOPE ----------
  const scopedDocs = docs.filter(
    (doc) => doc.path.startsWith(basePath) && doc.id !== indexDocId
  );

  // ---------- GROUPING ----------
  const groups = {};
  scopedDocs.forEach((doc) => {
    const relativePath = doc.path.replace(basePath, "");
    const parts = relativePath.split("/");
    const groupName = parts.length > 1 ? parts[0] : "";

    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(doc);
  });

  const groupKeys = Object.keys(groups);
  const isFlatStructure = groupKeys.length === 1 && groupKeys[0] === "";

  // ---------- SORT ----------
  const DIFFICULTY_ORDER = ["easy", "med", "hard"];

  const sortedGroups = Object.entries(groups).sort(([a], [b]) => {
    const aIdx = DIFFICULTY_ORDER.indexOf(a.toLowerCase());
    const bIdx = DIFFICULTY_ORDER.indexOf(b.toLowerCase());

    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });

  // Track Metadata
  const trackSlug = basePath.replace(/^\/coding\/?/, "").replace(/\/$/, "");
  const trackInfo = TRACK_META[trackSlug] || {
    name: formatLabel(trackSlug),
    icon: "⚡",
    desc: "Curated pattern-based interview problems, time & space complexities, and clean solutions in C++, Java, and Python.",
  };

  // ---------- INITIAL OPEN GROUP ----------
  const params = new URLSearchParams(location.search);
  const initialOpenGroup = params.get("open") || (sortedGroups[0] ? sortedGroups[0][0] : null);

  const [openGroup, setOpenGroup] = useState(initialOpenGroup);

  // ---------- TOGGLE HANDLER ----------
  const toggleGroup = (group) => {
    const nextGroup = openGroup === group ? null : group;
    setOpenGroup(nextGroup);

    const nextParams = new URLSearchParams(location.search);
    if (nextGroup) {
      nextParams.set("open", nextGroup);
    } else {
      nextParams.delete("open");
    }

    history.replace({
      pathname: location.pathname,
      search: nextParams.toString(),
    });

    if (nextGroup) {
      requestAnimationFrame(() => {
        const section = sectionRefs.current[nextGroup];
        if (!section) return;

        const NAVBAR_OFFSET = 72;
        const y =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          NAVBAR_OFFSET;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      });
    }
  };

  // ==============================
  // 🔹 FLAT STRUCTURE
  // ==============================
  if (isFlatStructure) {
    return (
      <div className="auto-index-container">
        <HeroHeader
          badge={{ icon: trackInfo.icon, text: "CodeDose Track" }}
          title={trackInfo.name}
          gradient="Problems"
          subtitle={trackInfo.desc}
          stats={[
            { number: scopedDocs.length, label: "Problems" },
            { number: "100%", label: "Free Solutions" },
          ]}
        />
        <div className="auto-index-wrapper">
          <div className="auto-index-list">
            {groups[""]
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((doc, idx) => (
                <div key={doc.id} className="auto-index-item">
                  <Link to={doc.path} className="auto-index-link">
                    <NumberBadge value={idx + 1} />
                    <span className="problem-title">{formatLabel(getFileName(doc.id))}</span>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // 🔹 NESTED STRUCTURE
  // ==============================
  return (
    <div className="auto-index-container">
      {/* Reusing Universal HeroHeader */}
      <HeroHeader
        badge={{ icon: trackInfo.icon, text: "CodeDose Track" }}
        title={trackInfo.name}
        gradient="Problems"
        subtitle={trackInfo.desc}
        stats={[
          { number: scopedDocs.length, label: "Problems" },
          { number: sortedGroups.length, label: "Difficulty Tiers" },
          { number: "100%", label: "Free Solutions" },
        ]}
      />

      <div className="auto-index-wrapper">
        {sortedGroups.map(([group, docs]) => {
          const isOpen = openGroup === group;
          const normalizedGroup = group.toLowerCase();
          const diffColor =
            normalizedGroup === "easy"
              ? "diff-easy"
              : normalizedGroup === "med" || normalizedGroup === "medium"
              ? "diff-med"
              : "diff-hard";

          const label =
            normalizedGroup === "easy"
              ? "Easy Problems"
              : normalizedGroup === "med" || normalizedGroup === "medium"
              ? "Medium Problems"
              : "Hard Problems";

          return (
            <section
              key={group}
              className="auto-index-section"
              ref={(el) => (sectionRefs.current[group] = el)}
            >
              <button
                type="button"
                className={`auto-index-toggle ${diffColor} ${isOpen ? "is-open" : ""}`}
                onClick={() => toggleGroup(group)}
                aria-expanded={isOpen}
              >
                <div className="auto-index-toggle-left">
                  <span className="difficulty-indicator" aria-hidden="true">●</span>
                  <span className="auto-index-heading-text">{label}</span>
                </div>
                <div className="auto-index-toggle-right">
                  <span className="auto-index-meta">
                    {docs.length} Problems
                  </span>
                  <span
                    className={`auto-index-chevron ${
                      isOpen ? "auto-index-chevron-open" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="auto-index-list">
                  {docs
                    .sort((a, b) => a.id.localeCompare(b.id))
                    .map((doc, idx) => (
                      <div key={doc.id} className="auto-index-item">
                        <Link to={doc.path} className="auto-index-link">
                          <NumberBadge value={idx + 1} />
                          <span className="problem-title">{formatLabel(getFileName(doc.id))}</span>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function getFileName(id) {
  return id.split("/").pop();
}

function formatLabel(str = "") {
  return str
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
