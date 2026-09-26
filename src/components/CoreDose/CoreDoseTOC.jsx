import React from "react";
import TOCInline from "@theme/TOCInline";

/**
 * CoreDoseTOC - Modern inline table of contents component.
 * Replaces the bloated right-hand side TOC sidebar with a compact,
 * collapsible top-level index box based on Binary Dose's custom inline TOC design.
 */
export default function CoreDoseTOC({
  toc,
  title = "Table of Contents",
  minHeadingLevel = 2,
  maxHeadingLevel = 3,
  defaultOpen = true,
}) {
  const filteredToc = React.useMemo(() => {
    if (!toc || !Array.isArray(toc)) return [];
    return toc.filter((item) => {
      const val = item.value?.toLowerCase() || "";
      return (
        !val.includes("everyday analogy") &&
        !val.includes("bridging to") &&
        !val.includes("bridge to")
      );
    });
  }, [toc]);

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
