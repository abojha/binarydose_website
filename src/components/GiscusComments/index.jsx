import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export default function GiscusComments({
  repo = "abojha/binarydose_website",
  repoId = "", // Replace with your repoId from https://giscus.app
  category = "General",
  categoryId = "", // Replace with your categoryId from https://giscus.app
  mapping = "pathname",
  term = "",
  strict = "0",
  reactionsEnabled = "1",
  emitMetadata = "0",
  inputPosition = "top",
  lang = "en",
}) {
  const { colorMode } = useColorMode();
  const commentsRef = useRef(null);

  // Check if real Giscus IDs have been provided
  const isConfigured = repoId && categoryId && !repoId.includes("XXXXXXXX") && !categoryId.includes("XXXXXXXX");

  useEffect(() => {
    if (!isConfigured) return;

    const theme = colorMode === "dark" ? "dark_dimmed" : "light";

    // Clear previous giscus iframe if any
    if (commentsRef.current) {
      commentsRef.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    if (term) script.setAttribute("data-term", term);
    script.setAttribute("data-strict", strict);
    script.setAttribute("data-reactions-enabled", reactionsEnabled);
    script.setAttribute("data-emit-metadata", emitMetadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", lang);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }
  }, [colorMode, repo, repoId, category, categoryId, mapping, term, isConfigured]);

  if (!isConfigured) {
    return (
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          borderRadius: "12px",
          background: "var(--ifm-background-surface-color)",
          border: "1px dashed var(--ifm-color-emphasis-300)",
          textAlign: "center",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>💬 Discussion & Community Comments</h4>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ifm-font-color-secondary)" }}>
          To activate live GitHub Discussions comments on this site, follow the quick 2-step setup on{" "}
          <a href="https://giscus.app" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
            giscus.app
          </a>{" "}
          and paste your <code>repoId</code> and <code>categoryId</code> into{" "}
          <code>src/components/GiscusComments/index.jsx</code>.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--ifm-color-emphasis-200)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "1.3rem" }}>💬</span>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
          Discussion & Doubts
        </h3>
      </div>
      <div ref={commentsRef} id="giscus-comments-container" />
    </div>
  );
}
