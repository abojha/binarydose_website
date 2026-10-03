import React from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import BackNav from "@site/src/components/Common/BackNav";

const CODING_TOPICS = {
  arrays: "Arrays",
  "binary-search": "Binary Search",
  "binary-search-trees": "Binary Search Trees",
  "binary-trees": "Binary Trees",
  "bit-manupilation": "Bit Manipulation",
  "dynamic-programming": "Dynamic Programming",
  graphs: "Graphs",
  "greedy-algorithms": "Greedy Algorithms",
  heaps: "Heaps",
  "linked-list": "Linked List",
  recursion: "Recursion",
  sorting: "Sorting",
  "stack-queue": "Stack & Queue",
  strings: "Strings",
  tries: "Tries",
  "two-pointers-sliding-window-problems": "Two Pointers & Sliding Window",
};

export default function DocBreadcrumbs() {
  const { metadata } = useDoc();
  const permalink = metadata?.permalink || "";
  const title = metadata?.title || "";

  // 1. CoreDose has its own specialized header
  if (permalink.startsWith("/coredose")) {
    return null;
  }

  // 2. 100 Days Interview
  if (permalink.startsWith("/100-days")) {
    if (permalink === "/100-days" || permalink === "/100-days/") {
      return null;
    }

    const dayMatch = permalink.match(/day-(\d+)/i);
    const dayLabel = dayMatch
      ? `Day ${String(dayMatch[1]).padStart(2, "0")}`
      : "Interview Question";

    return (
      <BackNav
        backUrl="/100-days"
        backLabel="Back to 100 Days Series"
        breadcrumbs={[
          { label: "DevDose", url: "/devdose" },
          { label: "100 Days Interview", url: "/100-days" },
          { label: dayLabel },
        ]}
      />
    );
  }

  // 3. CodeDose (DSA)
  if (permalink.startsWith("/coding")) {
    if (permalink === "/coding" || permalink === "/coding/") {
      return null; // Main CodeDose Hub
    }

    const parts = permalink.replace(/^\/coding\/?/, "").split("/").filter(Boolean);
    const topicSlug = parts[0] || "";
    const topicName = CODING_TOPICS[topicSlug] || topicSlug.replace(/-/g, " ");

    const isTrackIndex = parts.length === 1;

    if (isTrackIndex) {
      // On track index (e.g. /coding/arrays)
      return (
        <BackNav
          backUrl="/coding"
          backLabel="Back to CodeDose Sheet"
          breadcrumbs={[
            { label: "Home", url: "/" },
            { label: "CodeDose", url: "/coding" },
            { label: topicName },
          ]}
        />
      );
    }

    // On specific problem page (e.g. /coding/arrays/easy/...)
    return (
      <BackNav
        backUrl={`/coding/${topicSlug}`}
        backLabel={`Back to ${topicName}`}
        breadcrumbs={[
          { label: "CodeDose", url: "/coding" },
          { label: topicName, url: `/coding/${topicSlug}` },
          { label: title || "Problem" },
        ]}
      />
    );
  }

  // 4. GATE PYQs
  if (permalink.startsWith("/pyqs")) {
    if (permalink === "/pyqs" || permalink === "/pyqs/") {
      return null;
    }

    return (
      <BackNav
        backUrl="/pyqs"
        backLabel="Back to GATE PYQs"
        breadcrumbs={[
          { label: "Home", url: "/" },
          { label: "GATE PYQs", url: "/pyqs" },
          { label: title || "Question" },
        ]}
      />
    );
  }

  return null;
}
