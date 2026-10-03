import React, { useState, useMemo } from "react";
import Link from "@docusaurus/Link";
import HeroHeader from "../Common/HeroHeader";
import SearchBar from "../Common/SearchBar";
import DoseCard from "../Common/DoseCard";
import useSiteStats from "@site/src/hooks/useSiteStats";
import styles from "./CodeDoseHub.module.css";

const DSA_TRACKS = [
  {
    id: "arrays",
    title: "Arrays",
    path: "/coding/arrays",
    icon: "📊",
    problems: 40,
    desc: "Subarray transformations, prefix sums, two-pointer strategies, and 2D matrix traversal.",
    patterns: ["Kadane's", "Prefix Sums", "Dutch Flag", "2D Matrices"],
  },
  {
    id: "strings",
    title: "Strings",
    path: "/coding/strings",
    icon: "🔤",
    problems: 20,
    desc: "Frequency hashing, palindrome algorithms, sliding substring windows, and string parsing.",
    patterns: ["Anagrams", "Palindromes", "Substrings", "Hashing"],
  },
  {
    id: "two-pointers",
    title: "Two Pointers & Sliding Window",
    path: "/coding/two-pointers-sliding-window-problems",
    icon: "🪟",
    problems: 12,
    desc: "Optimal contiguous subarray windows, shrink-and-expand mechanics, and fast/slow pointer pairs.",
    patterns: ["Fixed Window", "Dynamic Window", "Two Pointers", "Shrink-Expand"],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    path: "/coding/binary-search",
    icon: "🔍",
    problems: 8,
    desc: "Logarithmic searching, monotonic answer spaces, rotated arrays, and lower/upper bounds.",
    patterns: ["Search on Answer", "Rotated Arrays", "Bounds", "Monotonicity"],
  },
  {
    id: "linked-list",
    title: "Linked List",
    path: "/coding/linked-list",
    icon: "🔗",
    problems: 30,
    desc: "Singly/doubly linked chains, cycle detection, in-place reversals, and multi-list merges.",
    patterns: ["Fast & Slow", "In-Place Reverse", "Cycle Detection", "Merge K Lists"],
  },
  {
    id: "stack-queue",
    title: "Stack and Queue",
    path: "/coding/stack-queue",
    icon: "🥞",
    problems: 31,
    desc: "Monotonic stack patterns, next greater element, hardware queues, and LRU Cache design.",
    patterns: ["Monotonic Stack", "Next Greater", "Min Stack", "LRU Cache"],
  },
  {
    id: "recursion",
    title: "Recursion & Backtracking",
    path: "/coding/recursion",
    icon: "🔄",
    problems: 25,
    desc: "Decision trees, combinatorial permutations, pruning heuristics, and constraint satisfaction.",
    patterns: ["Subsets", "Permutations", "N-Queens", "Pruning"],
  },
  {
    id: "sorting",
    title: "Sorting",
    path: "/coding/sorting",
    icon: "📶",
    problems: 2,
    desc: "Divide-and-conquer partition schemes, comparator sorting, and in-place stability.",
    patterns: ["Merge Sort", "Quick Sort", "Comparators", "Inversions"],
  },
  {
    id: "binary-trees",
    title: "Binary Trees",
    path: "/coding/binary-trees",
    icon: "🌲",
    problems: 35,
    desc: "Hierarchical traversals, bottom-up subtree aggregations, tree diameter, and lowest common ancestor.",
    patterns: ["Traversals", "LCA", "Diameter", "Max Path Sum"],
  },
  {
    id: "binary-search-trees",
    title: "Binary Search Trees",
    path: "/coding/binary-search-trees",
    icon: "🌳",
    problems: 18,
    desc: "Ordered binary search structures, validation, tree balancing, and successor recovery.",
    patterns: ["Inorder Property", "Validate BST", "BST LCA", "Kth Smallest"],
  },
  {
    id: "heaps",
    title: "Heaps & Priority Queues",
    path: "/coding/heaps",
    icon: "⛰️",
    problems: 17,
    desc: "Min/max heap properties, streaming medians, top-K aggregations, and two-heap mechanics.",
    patterns: ["Top-K Elements", "Merge K Sorted", "Median Stream", "Two Heaps"],
  },
  {
    id: "greedy-algorithms",
    title: "Greedy Algorithms",
    path: "/coding/greedy-algorithms",
    icon: "💰",
    problems: 14,
    desc: "Locally optimal decision making, interval scheduling, exchange arguments, and optimization.",
    patterns: ["Interval Scheduling", "Jump Game", "Gas Station", "Knapsack"],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    path: "/coding/dynamic-programming",
    icon: "🧩",
    problems: 54,
    desc: "Optimal substructure, overlapping states, memoization, grid paths, and space-optimized tabulation.",
    patterns: ["0/1 Knapsack", "LCS & LIS", "Grid Paths", "State Machines"],
  },
  {
    id: "graphs",
    title: "Graphs",
    path: "/coding/graphs",
    icon: "🕸️",
    problems: 48,
    desc: "Adjacency structures, BFS/DFS, shortest paths (Dijkstra), topological ordering, and Disjoint Set Union.",
    patterns: ["BFS & DFS", "Dijkstra", "Kahn's Topo", "Disjoint Set (DSU)"],
  },
  {
    id: "bit-manupilation",
    title: "Bit Manipulation",
    path: "/coding/bit-manupilation",
    icon: "⚙️",
    problems: 19,
    desc: "Bitwise boolean operations, masks, power-of-two tests, XOR cancellations, and compact state sets.",
    patterns: ["Bitmasks", "XOR Tricks", "Power of Two", "Bit Subsets"],
  },
  {
    id: "tries",
    title: "Tries",
    path: "/coding/tries",
    icon: "🔀",
    problems: 2,
    desc: "Prefix-tree retrieval, autocomplete structures, character branching, and bitwise XOR queries.",
    patterns: ["Prefix Search", "Autocomplete", "Max XOR Pair", "Wildcard"],
  },
];

export default function CodeDoseHub() {
  const { totalProblems, totalCategories } = useSiteStats();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTracks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DSA_TRACKS;

    return DSA_TRACKS.filter((track) => {
      const titleMatch = track.title.toLowerCase().includes(q);
      const descMatch = track.desc.toLowerCase().includes(q);
      const patternMatch = track.patterns.some((p) =>
        p.toLowerCase().includes(q)
      );

      return titleMatch || descMatch || patternMatch;
    });
  }, [searchQuery]);

  return (
    <div className={styles.wrapper}>
      {/* Universal Hero Header */}
      <HeroHeader
        badge={{ icon: "⚡", text: "Curated Problem Library" }}
        title="CodeDose"
        gradient="(DSA Sheet)"
        subtitle="Topic-wise DSA roadmap, pattern-based interview problems, and clean code solutions in C++, Java, and Python for top product companies."
        stats={[
          { number: totalProblems || 391, label: "Problems" },
          { number: totalCategories || 16, label: "DSA Tracks" },
          { number: "100%", label: "Free Solutions" },
        ]}
      />

      {/* Control Bar: Clean Pattern Search */}
      <div className={styles.controlsBar}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search all 16 tracks or patterns (e.g. Kadane, DP, Knapsack, Binary Search, Graph)..."
          ariaLabel="Search DSA tracks"
        />
      </div>

      {/* Track Grid */}
      {filteredTracks.length > 0 ? (
        <div className={styles.trackGrid}>
          {filteredTracks.map((track) => (
            <DoseCard
              key={track.id}
              icon={track.icon}
              title={track.title}
              description={track.desc}
              badge={`${track.problems} Problems`}
              badgeType="primary"
              chips={track.patterns}
              to={track.path}
              actionText="Explore DSA Track"
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🔍</span>
          <h3 className={styles.emptyTitle}>No matching DSA tracks</h3>
          <p className={styles.emptyDesc}>
            No tracks found matching "{searchQuery}". Try searching for another topic or pattern.
          </p>
          <button
            type="button"
            className={styles.emptyResetBtn}
            onClick={() => setSearchQuery("")}
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
}
