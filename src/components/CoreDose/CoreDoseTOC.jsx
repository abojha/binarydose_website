import React from "react";
import TOCInline from "@theme/TOCInline";

/**
 * CoreDoseTOC - Modern inline table of contents component.
 * Replaces the bloated right-hand side TOC sidebar with a compact,
 * collapsible top-level index box based on Binary Dose's custom inline TOC design.
 */
export default function CoreDoseTOC({
  toc,
  items,
  title = "Table of Contents",
  minHeadingLevel = 2,
  maxHeadingLevel = 3,
  defaultOpen = true,
}) {
  const rawList = toc || items;
  const filteredToc = React.useMemo(() => {
    if (!rawList || !Array.isArray(rawList)) return [];
    return rawList
      .map((item) => ({
        ...item,
        value: item.value || item.text || item.title || item.label || "",
        id: item.id || (item.value || item.text || item.label || item.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        level: item.level || 2,
      }))
      .filter((item) => {
        const val = item.value?.toLowerCase() || "";
        return (
          !val.includes("everyday analogy") &&
          !val.includes("bridging to") &&
          !val.includes("bridge to") &&
          !val.includes("core intuition")
        );
      });
  }, [rawList]);

  if (!filteredToc || filteredToc.length === 0) {
    return null;
  }

  return (
    <div className="inline-toc-container">
      <details open={defaultOpen}>
        <summary>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span>📑</span>
            <strong>{title}</strong>
            </span>

        </summary>
        <TOCInline
          toc={filteredToc}
          minHeadingLevel={minHeadingLevel}
          maxHeadingLevel={maxHeadingLevel}
        />
      </details>
    </div>
  );
}
